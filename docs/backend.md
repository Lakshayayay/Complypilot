

---

# BACKEND_STRUCTURE.md: Database Schema & API Matrix

## 1. Relational Database Schema (Prisma Definition)

This schema models our core domains: CAs, multi-tenant clients, calendar deadlines, comments, documents, security tokens, and credit records.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-id"
}

enum UserRole {
  CA_PARTNER
  CA_ARTICLE
  MSME_OWNER
}

enum DocumentStatus {
  MISSING
  PENDING_VERIFICATION
  VERIFIED
  REJECTED
}

enum SPCBState {
  PUNJAB
  DELHI
  MAHARASHTRA
  OTHER
}

enum SPCBColorCategory {
  RED
  ORANGE
  GREEN
  WHITE
  BLUE
}

model User {
  id           String     @id @default(uuid())
  email        String     @unique
  phoneNumber  String?    @unique
  passwordHash String
  fullName     String
  role         UserRole
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  // Relations
  clients      Client[]   @relation("CAClientAssignment")
  managedBy    User?      @relation("ArticleHierarchy", fields: [managerId], references: [id])
  managerId    String?
  articles     User[]     @relation("ArticleHierarchy")
  comments     Comment[]
}

model Client {
  id              String            @id @default(uuid())
  companyName     String
  gstin           String            @unique
  state           SPCBState
  spcbCategory    SPCBColorCategory
  pan             String
  createdAt       DateTime          @default(now())
  updatedAt       DateTime          @updatedAt

  // Relations
  assignedCAs     User[]            @relation("CAClientAssignment")
  deadlines       CalendarDeadline[]
  documents       Document[]
  secureTokens    SecureToken[]
  creditPassport  CreditPassport?
}

model CalendarDeadline {
  id             String         @id @default(uuid())
  clientId       String
  client         Client         @relation(fields: [clientId], references: [id], onDelete: Cascade)
  title          String         // e.g., "GSTR-3B Filing", "PPCB CTO Renewal"
  description    String?
  targetDate     DateTime
  status         DocumentStatus @default(MISSING)
  complianceType String         // e.g., "GST", "TDS", "SPCB", "FACTORY_ACT"
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @updatedAt

  // Relations
  documents      Document[]
  comments       Comment[]

  @@index([clientId, targetDate])
}

model Document {
  id          String           @id @default(uuid())
  clientId    String
  client      Client           @relation(fields: [clientId], references: [id], onDelete: Cascade)
  deadlineId  String?
  deadline    CalendarDeadline? @relation(fields: [deadlineId], references: [id], onDelete: SetNull)
  fileName    String
  storagePath String           // Supabase Private Bucket path
  status      DocumentStatus   @default(PENDING_VERIFICATION)
  uploadedAt  DateTime         @default(now())
  verifiedAt  DateTime?

  @@index([clientId, deadlineId])
}

model SecureToken {
  id         String   @id @default(uuid())
  clientId   String
  client     Client   @relation(fields: [clientId], references: [id], onDelete: Cascade)
  tokenHash  String   @unique
  docType    String   // Target document type to upload
  expiryDate DateTime
  isUsed     Boolean  @default(false)
  createdAt  DateTime @default(now())
}

model Comment {
  id         String           @id @default(uuid())
  deadlineId String
  deadline   CalendarDeadline @relation(fields: [deadlineId], references: [id], onDelete: Cascade)
  userId     String
  user       User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  message    String
  createdAt  DateTime         @default(now())
}

model CreditPassport {
  id               String   @id @default(uuid())
  clientId         String   @unique
  client           Client   @relation(fields: [clientId], references: [id], onDelete: Cascade)
  filingHealth     Float    // On-time percentage calculation
  auditedRevenue   Float
  spcbStatusSecure Boolean  @default(true)
  updatedAt        DateTime @updatedAt
}
```

---

## 2. API Endpoints Matrix (NestJS Application Routing)

Below are the mapped routing controllers of our NestJS service. All private endpoints require JWT bearer tokens passed in authorization headers.

### A. Core Authentication Controller (`/api/v1/auth`)
* `POST /login` - Standard CA email/password or MSME phone/password authentication. Issues the user's signed JWT bearer token.
* `POST /guest/validate-token` - Parses and decrypts the encrypted WhatsApp URL payload. Verifies that the signed token has not expired.

### B. Client Portfolio Controller (`/api/v1/clients`)
* `GET /` - *CA Authorized Only.* Retrieves list of all client entities assigned to the active CA token.
* `POST /` - Registers a new corporate MSME client entity, dynamically assigning default safety matrices based on their `SPCBState` and `SPCBColorCategory`.
* `POST /:id/sync-tally` - Receives XML ledger dumps uploaded from Tally. Triggers parsing execution and populates client database tables.

### C. Shared Calendar Controller (`/api/v1/calendar`)
* `GET /` - Fetches calendar events. If `clientId` parameter is passed, returns that client's specific track. If empty, displays the CA's multi-tenant aggregated deadline heatmap.
* `GET /deadlines/:id` - Fetches detail for a single calendar event, pulling its associated document array, internal activity trails, and collaborative comment arrays.
* `PATCH /deadlines/:id/status` - Modifies active deadline status state (`PENDING_DOC`, `AWAITING_VERIFICATION`, `FILED_AND_SECURED`).
* `POST /deadlines/:id/comments` - Appends a comment to the deadline's chat thread. Triggers Supabase Realtime notification dispatch.

### D. Document Management Controller (`/api/v1/documents`)
* `POST /request-drop-url` - Generates a secure, cryptographically signed, single-use POST URL to Supabase storage. 
* `POST /upload` - Standard authenticated document receipt file uploader. Generates a metadata database entity on completion.
* `POST /verify/:id` - Moves document status state to `VERIFIED` and logs verification details in the compliance tracker.

### E. Operational Safety Controller (`/api/v1/compliance`)
* `GET /safety-status/:clientId` - Checks compliance health indexes for specific state boards (PPCB, DPCC, MPCB). Returns color-coded warning alert schedules.

### F. Credit Readiness Passport Controller (`/api/v1/credit`)
* `GET /passport/:clientId` - Packages sales data, tax histories, and compliance logs into a single JSON schema.
* `POST /ocen/consent` - Triggers Sahamati Account Aggregator consent flows.
* `POST /treds/export` - Compiles verified sales invoices and GSTR-1 filings, submitting them directly to TReDS APIs.

---

## 3. Supabase Row Level Security (RLS) Policies

To protect sensitive financial and regulatory records across our multi-tenant structure, we enforce PostgreSQL Row Level Security (RLS) directly at the database layer.

```sql
-- Enable Row Level Security on core client-facing tables
ALTER TABLE "Client" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "CalendarDeadline" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Document" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Comment" ENABLE ROW LEVEL SECURITY;

-- 1. Client Table Security Access Policy
-- Enables CAs or Owners to view clients only if their ID matches assignments
CREATE POLICY "Users can view assigned clients" 
ON "Client"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "_CAClientAssignment" 
    WHERE "A" = auth.uid() AND "B" = "Client".id
  )
);

-- 2. CalendarDeadline Table Access Policy
-- Extends RLS downward to ensure access is only granted for assigned client entities
CREATE POLICY "Users can access deadlines for assigned clients"
ON "CalendarDeadline"
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM "_CAClientAssignment"
    WHERE "A" = auth.uid() AND "B" = "CalendarDeadline"."clientId"
  )
);

-- 3. Document Table Isolation Policies
-- Restricts viewing private client document registers to assigned users
CREATE POLICY "Users can select documents for assigned clients"
ON "Document"
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM "_CAClientAssignment"
    WHERE "A" = auth.uid() AND "B" = "Document"."clientId"
  )
);

-- 4. Safe Write-Only Policy (WhatsApp Guests)
-- Allows guest uploads via secure tokens to pass document storage write checks without read permissions
CREATE POLICY "Guests can write to Supabase Storage via signed tokens"
ON "Document"
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM "SecureToken"
    WHERE "clientId" = "Document"."clientId" 
    AND "isUsed" = false 
    AND "expiryDate" > now()
  )
);
```

---

