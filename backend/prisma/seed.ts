import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const BCRYPT_ROUNDS = 12;

async function main() {
  console.log('Seeding database...');

  // 1. Clean existing database records
  console.log('Cleaning existing data...');
  await prisma.comment.deleteMany();
  await prisma.document.deleteMany();
  await prisma.secureToken.deleteMany();
  await prisma.creditPassport.deleteMany();
  await prisma.calendarDeadline.deleteMany();
  
  // Clean join table and relations by deleting clients and users
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  // 2. Hash password for test accounts
  const passwordHash = await bcrypt.hash('Admin@33596708', BCRYPT_ROUNDS);

  // 3. Create MSME client
  console.log('Creating Client "Rajesh Textiles"...');
  const client = await prisma.client.create({
    data: {
      companyName: 'Rajesh Textiles',
      gstin: '27AAAAA1111A1Z1',
      state: 'MAHARASHTRA',
      spcbCategory: 'ORANGE',
      pan: 'AAAAA1111A',
    },
  });

  // 4. Create CA Partner
  console.log('Creating CA Partner user...');
  const ca = await prisma.user.create({
    data: {
      email: 'ca@test.com',
      passwordHash,
      fullName: 'Sharma & Associates (CA)',
      role: 'CA_PARTNER',
      clients: {
        connect: { id: client.id },
      },
    },
  });

  // 5. Create MSME Owner User
  console.log('Creating MSME Owner user...');
  const owner = await prisma.user.create({
    data: {
      email: 'owner@test.com',
      passwordHash,
      fullName: 'Rajesh Kumar',
      role: 'MSME_OWNER',
      clients: {
        connect: { id: client.id },
      },
    },
  });

  // 6. Create Calendar Deadlines
  console.log('Creating Calendar Deadlines...');
  
  // Deadline A: GSTR-3B (Pending CA review)
  const deadlineA = await prisma.calendarDeadline.create({
    data: {
      clientId: client.id,
      title: 'GSTR-3B Filing (May 2026)',
      description: 'Monthly summary return of outward and inward supplies',
      targetDate: new Date('2026-06-20T23:59:59Z'),
      status: 'PENDING_VERIFICATION',
      complianceType: 'GST',
    },
  });

  // Deadline B: SPCB CTO Renewal (Missing documents)
  const deadlineB = await prisma.calendarDeadline.create({
    data: {
      clientId: client.id,
      title: 'MPCB CTO License Renewal',
      description: 'Consent to Operate renewal filing with Maharashtra Pollution Control Board',
      targetDate: new Date('2026-07-15T23:59:59Z'),
      status: 'MISSING',
      complianceType: 'SPCB',
    },
  });

  // Deadline C: TDS Deposit (Filed and secured)
  const deadlineC = await prisma.calendarDeadline.create({
    data: {
      clientId: client.id,
      title: 'TDS Deposit (June 2026)',
      description: 'Challan payment deposit for TDS under Section 194C',
      targetDate: new Date('2026-07-07T23:59:59Z'),
      status: 'VERIFIED',
      complianceType: 'TDS',
    },
  });

  // 7. Create Documents for Deadline A
  console.log('Creating sample documents for GSTR-3B...');
  await prisma.document.create({
    data: {
      clientId: client.id,
      deadlineId: deadlineA.id,
      fileName: 'May_Sales_Report.xlsx',
      storagePath: 'private-documents/rajesh-textiles/may_sales_report.xlsx',
      status: 'PENDING_VERIFICATION',
    },
  });

  await prisma.document.create({
    data: {
      clientId: client.id,
      deadlineId: deadlineA.id,
      fileName: 'May_Purchase_Register.pdf',
      storagePath: 'private-documents/rajesh-textiles/may_purchase_register.pdf',
      status: 'PENDING_VERIFICATION',
    },
  });

  // 8. Create Comments on Deadline A
  console.log('Creating comments thread...');
  await prisma.comment.create({
    data: {
      deadlineId: deadlineA.id,
      userId: ca.id,
      message: 'Please upload the missing purchase registers so we can reconcile GSTR-2B.',
      createdAt: new Date('2026-06-21T09:00:00Z'),
    },
  });

  await prisma.comment.create({
    data: {
      deadlineId: deadlineA.id,
      userId: owner.id,
      message: 'Just uploaded the purchase register in PDF format. Let me know if that works.',
      createdAt: new Date('2026-06-21T11:30:00Z'),
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
