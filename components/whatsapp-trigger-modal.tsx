'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export function WhatsAppTriggerModal({ clientId }: { clientId: string }) {
  const [docType, setDocType] = useState('Bank Statement');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

  const sendRequest = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const res = await fetch(`${backendUrl}/api/v1/documents/request-drop-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, docType }),
      });
      
      if (!res.ok) throw new Error('Failed to send request');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-green-700 transition">
          Request Document via WhatsApp
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl w-[90vw] max-w-md">
          <Dialog.Title className="text-xl font-bold text-brand-navy mb-4">Request Missing Document</Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-6">
            Select the document type you need. This will generate a secure drop-zone link and send it via WhatsApp to the MSME Owner.
          </Dialog.Description>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
            <select 
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="Bank Statement">Bank Statement</option>
              <option value="Tally Backup">Tally Backup</option>
              <option value="GSTR-1 Data">GSTR-1 Data</option>
              <option value="Purchase Invoices">Purchase Invoices</option>
              <option value="Pollution NOC">Pollution NOC</option>
            </select>
          </div>
          
          {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
          {success && <p className="text-green-600 mb-4 text-sm font-medium">WhatsApp Request sent successfully!</p>}
          
          <div className="flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-md">Cancel</button>
            </Dialog.Close>
            <button 
              onClick={sendRequest}
              disabled={loading || success}
              className="bg-brand-accent text-white px-4 py-2 rounded-md font-medium disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send WhatsApp Request'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
