import { notFound } from 'next/navigation';
import { SecureDropzone } from '@/components/dropzone/secure-dropzone';

export default async function DropZonePage({ params }: { params: { token: string } }) {
  // Extract token from params. In Next 15, params is a Promise that needs awaiting or we can access it directly if we destructure early.
  // Wait, in Next 15, params is a Promise. Let's await it.
  const { token } = await params;

  // Validate token via server-to-server call to NestJS
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  let validationResult = null;
  
  try {
    const res = await fetch(`${backendUrl}/api/v1/documents/validate-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      cache: 'no-store', // Always check fresh status
    });

    if (!res.ok) {
      throw new Error('Invalid token');
    }

    validationResult = await res.json();
  } catch (error) {
    // Render 403 Link Expired state
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-md shadow-xl border-red-100 bg-white rounded-lg p-6">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-red-700">Link Expired</h2>
            <p className="mt-2 text-gray-600">
              This secure upload link is no longer valid or has already been used. Please ask your CA to generate a new request.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md shadow-xl border-blue-100 bg-white rounded-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-brand-navy">Secure Document Upload</h2>
          <p className="text-gray-600 mt-2">
            Your CA has requested: <span className="font-semibold text-brand-accent">{validationResult.docType}</span>
          </p>
        </div>
        <div>
          <SecureDropzone token={token} docType={validationResult.docType} />
        </div>
      </div>
    </div>
  );
}
