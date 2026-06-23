'use client';

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export function TallySyncDropzone({ clientId }: { clientId: string }) {
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    
    setSyncing(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${backendUrl}/api/v1/clients/${clientId}/sync-tally`, {
        method: 'POST',
        // Omitting Content-Type so browser sets boundary for multipart/form-data
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || 'Failed to sync data');
      }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSyncing(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'text/xml': ['.xml'],
      'application/xml': ['.xml'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    }
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mt-6">
      <h3 className="text-lg font-bold text-brand-navy mb-4">Fast Ingestion Engine</h3>
      <p className="text-sm text-gray-600 mb-4">Upload Tally Trial Balance XML or Winman Excel sheets to instantly sync client ledgers.</p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded border border-red-200 text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded border border-green-200 text-sm">
          <strong>Sync Successful!</strong> Parsed {result.type.toUpperCase()} data for client.
        </div>
      )}
      
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors
          ${isDragActive ? 'border-brand-accent bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}
      >
        <input {...getInputProps()} />
        <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        {syncing ? (
          <p className="text-brand-navy font-medium">Processing & Syncing...</p>
        ) : isDragActive ? (
          <p className="text-brand-accent font-medium">Drop the XML/Excel file here...</p>
        ) : (
          <div className="text-center">
            <p className="text-brand-navy font-medium">Drag & drop XML or Excel file</p>
            <p className="text-xs text-gray-500 mt-1">Only .xml, .xlsx, .xls</p>
          </div>
        )}
      </div>
    </div>
  );
}
