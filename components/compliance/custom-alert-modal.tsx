'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

export function CustomAlertModal({ clientId }: { clientId: string }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Future integration with backend API to create custom deadline
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-brand-navy text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-brand-navy/90 transition w-full mt-4">
          + Add Custom Alert
        </button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-xl w-[90vw] max-w-md z-50">
          <Dialog.Title className="text-xl font-bold text-brand-navy mb-4">Add Custom Compliance Alert</Dialog.Title>
          <Dialog.Description className="text-gray-600 mb-6 text-sm">
            Set a custom reminder for operational licenses, renewals, or local municipality requirements.
          </Dialog.Description>
          
          {success ? (
            <div className="text-green-600 font-medium mb-4">Custom alert added successfully!</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Alert Title</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="e.g. Municipal Trade License Renewal"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <Dialog.Close asChild>
                  <button type="button" className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-md text-sm">Cancel</button>
                </Dialog.Close>
                <button 
                  type="submit"
                  disabled={loading}
                  className="bg-brand-accent text-white px-4 py-2 rounded-md font-medium text-sm disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Alert'}
                </button>
              </div>
            </form>
          )}
          {success && (
            <div className="flex justify-end">
               <Dialog.Close asChild>
                  <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 rounded-md text-sm">Close</button>
                </Dialog.Close>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
