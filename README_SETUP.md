# ComplyPilot MVP - Setup Instructions

## Backend Setup (NestJS)

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Run the backend server:**
   ```bash
   npm run start:dev
   ```
   
   The NestJS backend will start on `http://localhost:5000`.

## Frontend Setup

1. **Install Node.js dependencies (if not already done):**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   
   The frontend will start on `http://localhost:3000`.

## Troubleshooting

### Port Conflicts:
- The React Vite server is configured to run on port `3000`.
- The NestJS server is configured in `backend/src/main.ts` to run on port `5000`.
- Vite proxies `/api` requests to `http://localhost:5000` automatically.
