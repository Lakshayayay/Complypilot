'use client';

import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Bell, CheckCircle2 } from 'lucide-react';

interface Props {
  clientId: string;
  onSave?: (alert: { title: string; expiryDate: string }) => void;
}

export function CustomAlertModal({ clientId: _clientId, onSave }: Props) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setSaved(true);
      setLoading(false);
      onSave?.({ title, expiryDate: date });
      // Auto-close after showing success tick
      setTimeout(() => {
        setOpen(false);
        setSaved(false);
        setTitle('');
        setDate('');
      }, 1200);
    }, 700);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="w-full mt-4 py-2.5 px-4 bg-brand-navy text-neutral-surface border-2 border-brand-navy rounded-sticker font-sans font-extrabold text-xs uppercase tracking-wider shadow-sticker hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2">
          <Bell className="h-3.5 w-3.5" />
          + Add Custom Alert
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-150" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-surface border-2 border-brand-navy rounded-sticker shadow-sticker-lg w-[90vw] max-w-sm z-50 p-5 animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <Dialog.Title className="font-sans font-extrabold text-lg text-brand-navy">
                Add Custom Alert
              </Dialog.Title>
              <Dialog.Description className="font-sans text-[11px] text-neutral-muted mt-0.5">
                Track boiler inspection, trade license, fire NOC, and more.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button className="p-1 border-2 border-brand-navy rounded-sticker hover:bg-neutral-canvas transition-colors">
                <X className="h-4 w-4 text-brand-navy" />
              </button>
            </Dialog.Close>
          </div>

          {saved ? (
            <div className="flex flex-col items-center justify-center py-6 gap-2">
              <CheckCircle2 className="h-10 w-10 text-brand-teal" />
              <p className="font-sans font-extrabold text-sm text-brand-teal">Alert saved!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-sans font-bold text-xs text-brand-navy uppercase tracking-wider block mb-1.5">
                  Alert Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Municipal Trade License Renewal"
                  required
                  className="w-full px-3 py-2 border-2 border-brand-navy rounded-sticker font-sans text-sm bg-neutral-canvas focus:outline-none focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="font-sans font-bold text-xs text-brand-navy uppercase tracking-wider block mb-1.5">
                  Expiry Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border-2 border-brand-navy rounded-sticker font-sans text-sm bg-neutral-canvas focus:outline-none focus:border-accent-purple"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="flex-1 py-2 border-2 border-brand-navy rounded-sticker font-sans font-bold text-xs text-brand-navy hover:bg-neutral-canvas transition-colors"
                  >
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 bg-brand-navy text-neutral-surface border-2 border-brand-navy rounded-sticker font-sans font-extrabold text-xs shadow-sticker-sm hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:cursor-wait"
                >
                  {loading ? 'Saving...' : 'Save Alert'}
                </button>
              </div>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
