'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createClient } from '@supabase/supabase-js';

export function SecureDropzone({ token, docType }: { token: string, docType: string }) {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    
    setUploading(true);
    setError(null);

    try {
      const fileName = `${Date.now()}-${file.name}`;
      const storagePath = `uploads/${token}/${fileName}`;

      // 1. Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('private-documents')
        .upload(storagePath, file);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // 2. Confirm upload with NestJS Backend
      const res = await fetch(`${backendUrl}/api/v1/documents/confirm-upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, fileName: file.name, storagePath }),
      });

      if (!res.ok) {
        throw new Error('Failed to confirm upload with backend');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, maxFiles: 1 });

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg border-2 border-green-200">
        <svg className="w-16 h-16 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <h3 className="text-xl font-bold text-green-700">Upload Successful</h3>
        <p className="text-sm text-green-600 mt-2 text-center">Your document has been securely sent to your CA. You can close this window.</p>
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
          {error}
        </div>
      )}
      
      <div
        {...getRootProps()}
        className={`p-10 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors
          ${isDragActive ? 'border-brand-accent bg-blue-50' : 'border-neutral-muted bg-neutral-surface hover:bg-gray-50'}`}
      >
        <input {...getInputProps()} />
        <svg className="w-12 h-12 text-brand-navy mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        {uploading ? (
          <p className="text-brand-navy font-medium">Uploading securely...</p>
        ) : isDragActive ? (
          <p className="text-brand-accent font-medium">Drop the file here...</p>
        ) : (
          <div className="text-center">
            <p className="text-brand-navy font-medium">Drag & drop your {docType} here</p>
            <p className="text-sm text-neutral-muted mt-1">or click to browse files</p>
          </div>
        )}
      </div>
    </div>
  );
}
