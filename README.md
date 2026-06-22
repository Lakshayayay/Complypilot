
  # ComplyPilot MVP Development

  This is a code bundle for ComplyPilot MVP Development. The original project is available at https://www.figma.com/design/qxAk4a3CqsicJPDCGaXWi8/ComplyPilot-MVP-Development.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Backend (NestJS)
  
  A NestJS TypeScript backend template is initialized under `backend/`.
  
  - Install dependencies:
    - `cd backend`
    - `npm install`
  - Start the API server:
    - `npm run start:dev` (runs NestJS in development mode)
  - The server starts on `http://localhost:5000` (configured in `src/main.ts` to avoid conflict with Vite's dev server on port 3000).

  