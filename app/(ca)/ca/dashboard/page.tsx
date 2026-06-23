'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useWorkspaceStore } from '@/lib/store';
import { useSupabaseRealtime } from '@/lib/supabase/useSupabaseRealtime';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Send,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  X,
  MessageSquare,
} from 'lucide-react';
import clsx from 'clsx';

// Interface definitions matches schema and API responses
interface ClientProfile {
  id: string;
  companyName: string;
  state: 'PUNJAB' | 'DELHI' | 'MAHARASHTRA' | 'OTHER';
  spcbCategory: 'RED' | 'ORANGE' | 'GREEN' | 'WHITE' | 'BLUE';
  gstin: string;
  deadlines: { status: string }[];
}

interface DeadlineItem {
  id: string;
  clientId: string;
  title: string;
  description?: string;
  targetDate: string;
  status: 'MISSING' | 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';
  complianceType: string;
  documents?: {
    id: string;
    fileName: string;
    status: string;
    storagePath: string;
  }[];
}

interface CommentItem {
  id: string;
  message: string;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    role: string;
  };
}

export default function CADashboard() {
  const { data: session } = useSession();
  const {
    activeClientId,
    selectedDeadlineId,
    setActiveClientId,
    setSelectedDeadlineId,
  } = useWorkspaceStore();

  // Component local states
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>([]);
  const [selectedDeadline, setSelectedDeadline] = useState<DeadlineItem | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loadingClients, setLoadingClients] = useState(true);
  const [loadingCalendar, setLoadingCalendar] = useState(false);
  const [loadingDrawer, setLoadingDrawer] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const commentsEndRef = useRef<HTMLDivElement>(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001';

  // ─── 1. Fetch Clients Sidebar List ──────────────────────────────────────────
  useEffect(() => {
    if (!session?.accessToken) return;

    async function fetchClients() {
      try {
        setLoadingClients(true);
        const res = await fetch(`${backendUrl}/api/v1/clients`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setClients(data);
        }
      } catch (err) {
        console.error('Error fetching clients:', err);
      } finally {
        setLoadingClients(false);
      }
    }

    fetchClients();
  }, [session, backendUrl]);

  // ─── 2. Fetch Deadlines for Calendar Grid ───────────────────────────────────
  useEffect(() => {
    if (!session?.accessToken) return;

    async function fetchDeadlines() {
      try {
        setLoadingCalendar(true);
        const url = activeClientId
          ? `${backendUrl}/api/v1/calendar?clientId=${activeClientId}`
          : `${backendUrl}/api/v1/calendar`;
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setDeadlines(data);
        }
      } catch (err) {
        console.error('Error fetching deadlines:', err);
      } finally {
        setLoadingCalendar(false);
      }
    }

    fetchDeadlines();
  }, [session, activeClientId, backendUrl]);

  // ─── 3. Fetch Selected Deadline Details ──────────────────────────────────────
  useEffect(() => {
    if (!session?.accessToken || !selectedDeadlineId) {
      setSelectedDeadline(null);
      setComments([]);
      return;
    }

    async function fetchDeadlineDetails() {
      try {
        setLoadingDrawer(true);
        const res = await fetch(
          `${backendUrl}/api/v1/calendar/deadlines/${selectedDeadlineId}`,
          {
            headers: {
              Authorization: `Bearer ${session?.accessToken}`,
            },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setSelectedDeadline(data);
          setComments(data.comments || []);
        }
      } catch (err) {
        console.error('Error fetching deadline details:', err);
      } finally {
        setLoadingDrawer(false);
      }
    }

    fetchDeadlineDetails();
  }, [session, selectedDeadlineId, backendUrl]);

  // ─── 4. Real-time Subscription via Hook ─────────────────────────────────────
  const handleRealtimeComment = (newCommentPayload: any) => {
    // Check if we already have this comment to avoid double inserts
    setComments((prev) => {
      if (prev.some((c) => c.id === newCommentPayload.id)) return prev;
      
      // Since payload from Supabase has userId instead of expanded user object,
      // let's map the user property based on session info if it matches current user,
      // or set standard user fallback.
      const enrichedComment: CommentItem = {
        id: newCommentPayload.id,
        message: newCommentPayload.message,
        createdAt: newCommentPayload.createdAt,
        user: {
          id: newCommentPayload.userId,
          fullName:
            newCommentPayload.userId === session?.user?.id
              ? (session?.user?.name ?? 'You')
              : 'Client / Staff',
          role:
            newCommentPayload.userId === session?.user?.id
              ? (session?.user?.role ?? 'CA_PARTNER')
              : 'MSME_OWNER',
        },
      };
      
      return [...prev, enrichedComment];
    });
  };

  useSupabaseRealtime(selectedDeadlineId, handleRealtimeComment);

  // Auto-scroll chat
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  // ─── 5. Actions ─────────────────────────────────────────────────────────────
  const handleUpdateStatus = async (status: string) => {
    if (!session?.accessToken || !selectedDeadlineId) return;
    try {
      setIsUpdatingStatus(true);
      const res = await fetch(
        `${backendUrl}/api/v1/calendar/deadlines/${selectedDeadlineId}/status`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status }),
        },
      );
      if (res.ok) {
        const updated = await res.json();
        // Update local deadline and list
        setSelectedDeadline((prev) => (prev ? { ...prev, status: updated.status } : null));
        setDeadlines((prev) =>
          prev.map((d) => (d.id === selectedDeadlineId ? { ...d, status: updated.status } : d)),
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session?.accessToken || !selectedDeadlineId) return;

    try {
      const res = await fetch(
        `${backendUrl}/api/v1/calendar/deadlines/${selectedDeadlineId}/comments`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: newComment }),
        },
      );
      if (res.ok) {
        const data = await res.json();
        // Append comment immediately in UI
        setComments((prev) => {
          if (prev.some((c) => c.id === data.id)) return prev;
          return [...prev, data];
        });
        setNewComment('');
      }
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  // ─── 6. Calendar Helper Functions ──────────────────────────────────────────
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // Client list filtering
  const filteredClients = clients.filter((c) =>
    c.companyName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ─── Client Selector Workspace Sidebar ─── */}
      <aside className="w-80 border-r-2 border-brand-navy bg-neutral-surface flex flex-col p-4">
        <div className="mb-4">
          <h2 className="font-sans font-extrabold text-lg text-brand-navy">Client Navigator</h2>
          <p className="font-sans text-[11px] text-neutral-muted">
            Select a client to isolate deadlines or view the combined heatmap.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-muted" />
          <input
            type="text"
            placeholder="Search Client Profile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border-2 border-brand-navy rounded-sticker font-sans text-xs focus:outline-none focus:border-accent-purple"
          />
        </div>

        {/* Heatmap Reset Toggle */}
        <button
          onClick={() => setActiveClientId(null)}
          className={clsx(
            'w-full py-2.5 px-4 mb-4 border-2 border-brand-navy rounded-sticker text-xs font-bold transition-all shadow-sticker-sm',
            activeClientId === null
              ? 'bg-brand-navy text-neutral-surface'
              : 'bg-neutral-surface text-brand-navy hover:bg-neutral-canvas',
          )}
        >
          🌐 Combined Portfolio Heatmap
        </button>

        {/* Client List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {loadingClients ? (
            <div className="text-center font-sans text-xs text-neutral-muted py-6">
              Loading clients...
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center font-sans text-xs text-neutral-muted py-6">
              No clients found.
            </div>
          ) : (
            filteredClients.map((client) => {
              const missingCount = client.deadlines.filter((d) => d.status === 'MISSING').length;
              return (
                <button
                  key={client.id}
                  onClick={() => setActiveClientId(client.id)}
                  className={clsx(
                    'w-full text-left p-3 border-2 border-brand-navy rounded-sticker transition-all flex justify-between items-center',
                    activeClientId === client.id
                      ? 'bg-accent-purple text-neutral-surface shadow-sticker translate-x-1'
                      : 'bg-neutral-surface text-brand-navy hover:bg-neutral-canvas',
                  )}
                >
                  <div>
                    <span className="font-sans font-bold text-sm block truncate max-w-[150px]">
                      {client.companyName}
                    </span>
                    <span
                      className={clsx(
                        'font-sans text-[10px] uppercase tracking-wider font-extrabold',
                        activeClientId === client.id ? 'text-neutral-surface/80' : 'text-neutral-muted',
                      )}
                    >
                      {client.state}
                    </span>
                  </div>

                  {missingCount > 0 && (
                    <span
                      className={clsx(
                        'h-5 min-w-[20px] px-1.5 flex items-center justify-center font-sans font-extrabold text-[10px] rounded-full border border-brand-navy',
                        activeClientId === client.id
                          ? 'bg-neutral-surface text-accent-purple'
                          : 'bg-accent-rose text-neutral-surface',
                      )}
                    >
                      {missingCount}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </aside>

      {/* ─── Master Calendar Dashboard Panel ─── */}
      <section className="flex-1 flex flex-col bg-neutral-canvas p-6 overflow-y-auto relative">
        {/* Top Header */}
        <header className="flex justify-between items-center mb-6">
          <div>
            <span className="font-handwritten text-accent-purple text-lg rotate-2 block transform origin-top-left">
              {activeClientId ? 'Client Workspace View ↗' : 'Combined Firm Heatmap ↗'}
            </span>
            <h1 className="font-sans font-extrabold text-3xl text-brand-navy">
              {activeClientId
                ? clients.find((c) => c.id === activeClientId)?.companyName ?? 'Client Calendar'
                : 'Compliance Calendar'}
            </h1>
          </div>

          {/* Month Navigator */}
          <div className="flex items-center gap-2 border-2 border-brand-navy rounded-sticker bg-neutral-surface p-1 shadow-sticker-sm">
            <button
              onClick={prevMonth}
              className="p-1 hover:bg-neutral-canvas rounded"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-5 w-5 text-brand-navy" />
            </button>
            <span className="font-sans font-extrabold text-xs px-2 text-brand-navy uppercase tracking-wider">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-neutral-canvas rounded"
              aria-label="Next month"
            >
              <ChevronRight className="h-5 w-5 text-brand-navy" />
            </button>
          </div>
        </header>

        {/* Day Names Grid */}
        <div className="grid grid-cols-7 gap-3 mb-2 text-center">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="font-sans font-extrabold text-xs uppercase tracking-wider text-neutral-muted">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7 gap-3 flex-1 min-h-[400px]">
          {loadingCalendar ? (
            <div className="col-span-7 flex items-center justify-center text-sm font-sans text-neutral-muted">
              Loading calendar deadlines...
            </div>
          ) : (
            dateRange.map((date, idx) => {
              const dateDeadlines = deadlines.filter((d) => isSameDay(new Date(d.targetDate), date));
              const isCurrentMonthDate = isSameMonth(date, currentMonth);

              // Determine day status based on aggregated deadlines
              let dayStatus: 'filed' | 'pending-client' | 'awaiting-verification' | 'none' = 'none';
              if (dateDeadlines.length > 0) {
                if (dateDeadlines.some((d) => d.status === 'MISSING')) {
                  dayStatus = 'pending-client';
                } else if (dateDeadlines.some((d) => d.status === 'PENDING_VERIFICATION' || d.status === 'REJECTED')) {
                  dayStatus = 'awaiting-verification';
                } else if (dateDeadlines.every((d) => d.status === 'VERIFIED')) {
                  dayStatus = 'filed';
                }
              }

              return (
                <div
                  key={idx}
                  onClick={() => {
                    if (dateDeadlines.length > 0) {
                      setSelectedDeadlineId(dateDeadlines[0].id);
                    }
                  }}
                  className={clsx(
                    'h-28 p-2 bg-neutral-surface border-2 border-brand-navy rounded-sticker transition-all duration-200 cursor-pointer flex flex-col justify-between',
                    isCurrentMonthDate ? 'text-brand-navy' : 'text-neutral-muted opacity-40',
                    dateDeadlines.length > 0
                      ? 'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker-sm active:translate-y-0 shadow-sm'
                      : 'opacity-70 pointer-events-none bg-neutral-surface/40 border-dashed border-neutral-muted/50',
                  )}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-sans font-bold text-sm">{format(date, 'd')}</span>
                    {dateDeadlines.length > 0 && (
                      <span className="px-1.5 py-0.5 bg-brand-navy text-neutral-surface font-sans font-extrabold text-[10px] rounded-badge">
                        {dateDeadlines.length}
                      </span>
                    )}
                  </div>

                  {/* Task Tags list */}
                  <div className="space-y-1">
                    {dateDeadlines.slice(0, 2).map((d) => (
                      <div
                        key={d.id}
                        className={clsx(
                          'px-1.5 py-0.5 rounded-badge text-[9px] font-sans font-extrabold tracking-wider uppercase border border-brand-navy truncate',
                          {
                            'bg-accent-mint/20 text-brand-teal': d.status === 'VERIFIED',
                            'bg-accent-rose/20 text-accent-rose': d.status === 'MISSING',
                            'bg-accent-gold/20 text-brand-navy': d.status === 'PENDING_VERIFICATION' || d.status === 'REJECTED',
                          },
                        )}
                      >
                        {d.complianceType}: {d.title}
                      </div>
                    ))}
                    {dateDeadlines.length > 2 && (
                      <div className="text-[8px] font-sans font-extrabold text-neutral-muted pl-1">
                        + {dateDeadlines.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* ─── Context Side-Drawer (Active Deadline Detail Panel) ─── */}
      <div
        className={clsx(
          'fixed inset-y-0 right-0 w-[420px] bg-neutral-surface border-l-2 border-brand-navy shadow-sticker-lg z-50 flex flex-col transition-transform duration-200',
          selectedDeadlineId ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {selectedDeadlineId && (
          <>
            {/* Drawer Header */}
            <div className="p-4 border-b-2 border-brand-navy flex justify-between items-start bg-neutral-canvas">
              <div className="flex-1 min-w-0 pr-2">
                <span className="font-sans font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 bg-brand-navy text-neutral-surface rounded-badge">
                  {selectedDeadline?.complianceType ?? 'COMPLIANCE'}
                </span>
                <h3 className="font-sans font-extrabold text-lg text-brand-navy mt-1 truncate">
                  {selectedDeadline?.title}
                </h3>
                <p className="font-sans text-[11px] text-neutral-muted mt-1 leading-snug">
                  {selectedDeadline?.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedDeadlineId(null)}
                className="p-1.5 hover:bg-neutral-canvas border-2 border-brand-navy rounded-sticker transition-colors"
                aria-label="Close panel"
              >
                <X className="h-4 w-4 text-brand-navy" />
              </button>
            </div>

            {loadingDrawer ? (
              <div className="flex-1 flex items-center justify-center text-sm font-sans text-neutral-muted">
                Loading workspace details...
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {/* 1. Status Section */}
                <div className="p-3 bg-neutral-canvas border-2 border-brand-navy rounded-sticker">
                  <span className="font-sans font-bold text-xs text-brand-navy block mb-2">Filing Status</span>
                  <div className="flex items-center gap-3">
                    <select
                      value={selectedDeadline?.status}
                      disabled={isUpdatingStatus}
                      onChange={(e) => handleUpdateStatus(e.target.value)}
                      className="flex-1 py-1.5 px-3 border-2 border-brand-navy rounded-sticker font-sans text-xs bg-neutral-surface focus:outline-none"
                    >
                      <option value="MISSING">▲ Missing Document</option>
                      <option value="PENDING_VERIFICATION">■ Awaiting CA Review</option>
                      <option value="VERIFIED">● Filed & Secured</option>
                      <option value="REJECTED">✖ Rejected / Needs Correction</option>
                    </select>
                  </div>
                </div>

                {/* 2. Documents Section */}
                <div>
                  <span className="font-sans font-bold text-xs text-brand-navy block mb-2">Attached Documents</span>
                  <div className="space-y-2">
                    {selectedDeadline?.documents && selectedDeadline.documents.length > 0 ? (
                      selectedDeadline.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-2.5 bg-neutral-surface border-2 border-brand-navy rounded-sticker shadow-sticker-sm"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="h-4 w-4 text-brand-blue shrink-0" />
                            <span className="font-sans text-xs font-semibold truncate">{doc.fileName}</span>
                          </div>
                          <span
                            className={clsx(
                              'px-2 py-0.5 rounded-badge text-[9px] font-sans font-extrabold uppercase border border-brand-navy',
                              {
                                'bg-accent-mint/20 text-brand-teal': doc.status === 'VERIFIED',
                                'bg-accent-rose/20 text-accent-rose': doc.status === 'REJECTED',
                                'bg-accent-gold/20 text-brand-navy': doc.status === 'PENDING_VERIFICATION',
                              },
                            )}
                          >
                            {doc.status === 'VERIFIED' && 'Verified'}
                            {doc.status === 'REJECTED' && 'Rejected'}
                            {doc.status === 'PENDING_VERIFICATION' && 'Review'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="font-sans text-xs text-neutral-muted italic">No documents attached yet.</p>
                    )}
                  </div>
                </div>

                {/* 3. Live Chat / Comments Thread */}
                <div className="flex flex-col h-[280px] border-2 border-brand-navy rounded-sticker overflow-hidden bg-neutral-canvas">
                  <div className="px-3 py-2 bg-brand-navy text-neutral-surface flex items-center justify-between">
                    <span className="font-sans font-extrabold text-[10px] tracking-wider uppercase flex items-center gap-1.5">
                      <MessageSquare className="h-3.5 w-3.5" /> Workspace Comment Thread
                    </span>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 p-3 overflow-y-auto space-y-2">
                    {comments.map((comment) => {
                      const isMe = comment.user.id === session?.user?.id;
                      return (
                        <div
                          key={comment.id}
                          className={clsx('flex flex-col max-w-[80%] rounded-[8px] p-2 text-xs border border-brand-navy shadow-sm animate-in fade-in duration-150 slide-in-from-bottom-2', {
                            'bg-accent-purple text-neutral-surface ml-auto': isMe,
                            'bg-neutral-surface text-brand-navy': !isMe,
                          })}
                        >
                          <span className="font-sans font-extrabold text-[9px] opacity-75">
                            {comment.user.fullName} ({comment.user.role === 'MSME_OWNER' ? 'Client' : 'CA Staff'})
                          </span>
                          <p className="font-sans mt-0.5">{comment.message}</p>
                          <span className="font-sans text-[8px] text-right mt-1 opacity-50">
                            {format(new Date(comment.createdAt), 'hh:mm a')}
                          </span>
                        </div>
                      );
                    })}
                    <div ref={commentsEndRef} />
                  </div>

                  {/* Comment Input */}
                  <form onSubmit={handlePostComment} className="border-t border-brand-navy flex bg-neutral-surface">
                    <input
                      type="text"
                      placeholder="Type a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 px-3 py-2 font-sans text-xs bg-transparent focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="p-2 border-l border-brand-navy bg-neutral-canvas hover:bg-neutral-canvas/80 text-brand-navy"
                      aria-label="Send comment"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
