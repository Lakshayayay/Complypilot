import React from 'react';
import { SPCBWarningCard } from '@/components/compliance/spcb-warning-card';
import { CustomAlertModal } from '@/components/compliance/custom-alert-modal';

export default async function OwnerCompliancePage({ searchParams }: { searchParams: { clientId?: string } }) {
  // Extract searchParams - in Next 15 it's a promise
  const params = await searchParams;
  const clientId = params.clientId || 'demo-client-123';
  
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  let complianceData = null;
  let isAtRisk = false;

  try {
    const res = await fetch(`${backendUrl}/api/v1/compliance/safety-status/${clientId}`, {
      cache: 'no-store'
    });
    if (res.ok) {
      complianceData = await res.json();
      isAtRisk = complianceData.isAtRisk;
    }
  } catch (error) {
    console.error('Failed to fetch compliance data', error);
  }

  const deadlines = complianceData?.deadlines || [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className={`${isAtRisk ? 'bg-red-600' : 'bg-green-600'} text-white p-6 pb-12 rounded-b-3xl shadow-md transition-colors`}>
        <h1 className="text-2xl font-bold mb-1">Safety & License Center</h1>
        <p className="text-sm opacity-90">
          {isAtRisk ? 'Immediate action required on operational licenses.' : 'All factory and environmental licenses are compliant.'}
        </p>
      </div>

      <div className="px-4 -mt-6 max-w-lg mx-auto">
        {/* KPI Card */}
        <div className="bg-white rounded-xl shadow-lg p-5 mb-6 flex items-center justify-between border border-gray-100">
          <div>
            <h2 className="text-gray-500 text-sm font-medium">Compliance Health</h2>
            <div className={`text-2xl font-bold ${isAtRisk ? 'text-red-600' : 'text-green-600'}`}>
              {isAtRisk ? 'At Risk' : 'Healthy'}
            </div>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isAtRisk ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isAtRisk ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              )}
            </svg>
          </div>
        </div>

        {/* Warning Cards List */}
        <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">Active Trackers</h2>
        
        {deadlines.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">No active tracking records found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {deadlines.map((deadline: any) => {
              const diffTime = new Date(deadline.targetDate).getTime() - new Date().getTime();
              const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              return (
                <SPCBWarningCard
                  key={deadline.id}
                  title={deadline.title}
                  type={deadline.complianceType}
                  targetDate={deadline.targetDate}
                  status={deadline.status}
                  daysRemaining={daysRemaining}
                />
              );
            })}
          </div>
        )}

        {/* Custom Alert Modal for "OTHER" state scenario */}
        <CustomAlertModal clientId={clientId} />
      </div>
    </div>
  );
}
