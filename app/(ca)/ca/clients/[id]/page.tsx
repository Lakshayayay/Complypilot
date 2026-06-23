import { TallySyncDropzone } from '@/components/dropzone/tally-sync-dropzone';
import { WhatsAppTriggerModal } from '@/components/whatsapp-trigger-modal';

interface ClientDetailPageProps {
  params: { id: string };
}

export default async function ClientDetailPage({ params }: ClientDetailPageProps) {
  const { id } = await params;

  // Fetch Safety Status (Tab 3 Data)
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';
  let complianceData = null;
  try {
    const res = await fetch(`${backendUrl}/api/v1/compliance/safety-status/${id}`, { cache: 'no-store' });
    if (res.ok) complianceData = await res.json();
  } catch (e) {
    console.error('Failed to fetch safety status', e);
  }

  const deadlines = complianceData?.deadlines || [];
  const isAtRisk = complianceData?.isAtRisk || false;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className={`flex items-center justify-between mb-8 p-4 rounded-lg ${isAtRisk ? 'border-4 border-accent-rose text-brand-navy bg-red-50' : 'bg-transparent'}`}>
        <div>
          <h1 className="font-sans font-extrabold text-3xl text-brand-navy">
            Client Workspace
            {isAtRisk && <span className="ml-4 text-sm bg-red-600 text-white px-3 py-1 rounded-full font-bold">URGENT ACTION REQUIRED</span>}
          </h1>
          <p className="font-sans text-sm text-neutral-muted mt-2">
            Client ID: <code className="font-mono bg-gray-100 px-2 py-1 rounded">{id}</code>
          </p>
        </div>
        
        {/* Phase 3 WhatsApp Trigger Modal */}
        <WhatsAppTriggerModal clientId={id} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 bg-neutral-surface border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-brand-navy mb-4">Document Locker & Grid</h2>
          <p className="text-gray-500 mb-6">Phase 2 — Document grid goes here.</p>
          
          <div className="h-64 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400">
            [Document Grid Placeholder]
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-neutral-surface border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-brand-navy mb-4">Calendar & Deadlines</h2>
            <p className="text-gray-500 text-sm">Phase 2 — Slide-Out Drawer trigger and mini calendar.</p>
          </div>
          
          {/* Phase 3 Fast Ingestion Engine */}
          <TallySyncDropzone clientId={id} />
        </div>
      </div>

      {/* Phase 4 SPCB & Safety Tab */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold text-brand-navy mb-4">Tab 3: SPCB & Operational Safety</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deadlines.length > 0 ? (
            deadlines.map((deadline: any) => {
              const diffTime = new Date(deadline.targetDate).getTime() - new Date().getTime();
              const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              const isExpired = daysRemaining < 0;
              const urgent = daysRemaining <= 30 && !isExpired;

              return (
                <div key={deadline.id} className={`p-4 rounded-lg border-2 ${isExpired ? 'border-red-500 bg-red-50' : urgent ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 bg-white'}`}>
                  <h3 className="font-bold text-brand-navy text-sm mb-1">{deadline.title}</h3>
                  <p className="text-xs text-gray-600 mb-3">{new Date(deadline.targetDate).toLocaleDateString()}</p>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${isExpired ? 'bg-red-200 text-red-800' : urgent ? 'bg-yellow-200 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                    {isExpired ? 'EXPIRED' : urgent ? 'URGENT' : 'COMPLIANT'}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-gray-500 col-span-full">No active compliance trackers.</p>
          )}
        </div>
      </div>
    </div>
  );
}
