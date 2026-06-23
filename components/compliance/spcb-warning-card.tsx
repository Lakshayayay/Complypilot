'use client';

import React from 'react';

export function SPCBWarningCard({ title, type, targetDate, status, daysRemaining }: { title: string, type: string, targetDate: string, status: string, daysRemaining: number }) {
  const isUrgent = daysRemaining <= 30;
  const isExpired = daysRemaining < 0;

  let borderColor = 'border-gray-200';
  let bgColor = 'bg-white';
  
  if (isExpired) {
    borderColor = 'border-red-500';
    bgColor = 'bg-red-50';
  } else if (isUrgent) {
    borderColor = 'border-yellow-400';
    bgColor = 'bg-yellow-50';
  }

  return (
    <div className={`relative p-5 rounded-xl border-2 shadow-sm ${borderColor} ${bgColor}`}>
      {/* Odoo-inspired Handwritten Annotation */}
      {isUrgent && !isExpired && (
        <div className="absolute -top-4 -right-4 z-10 rotate-6 bg-yellow-300 px-3 py-1 text-black shadow font-caveat text-xl font-bold">
          Urgent Attention!
        </div>
      )}
      {isExpired && (
        <div className="absolute -top-4 -right-4 z-10 rotate-[10deg] bg-red-600 px-3 py-1 text-white shadow font-caveat text-xl font-bold">
          Expired!
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-brand-navy text-lg">{title}</h3>
        <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded text-gray-700">
          {type}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">
        Due Date: <span className="font-semibold text-gray-800">{new Date(targetDate).toLocaleDateString()}</span>
      </p>

      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 text-xs font-semibold rounded ${isExpired ? 'bg-red-200 text-red-800' : isUrgent ? 'bg-yellow-200 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
          {isExpired ? 'OVERDUE' : isUrgent ? 'ACTION REQUIRED' : 'COMPLIANT'}
        </span>
        {!isExpired && (
          <span className="text-xs text-gray-500">
            {daysRemaining} days remaining
          </span>
        )}
      </div>
    </div>
  );
}
