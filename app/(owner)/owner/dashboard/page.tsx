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
  ChevronLeft,
  ChevronRight,
  Send,
  FileText,
  X,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
} from 'lucide-react';
import clsx from 'clsx';

interface ClientProfile {
  id: string;
  companyName: string;
  state: string;
  spcbCategory: string;
  gstin: string;
}

interface DeadlineItem {
  id: string;
  clientId: string;
  title: string;
  description?: string;
  targetDate: string;
  status: 'MISSING' | 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';
  complianceType: string;
}

interface DetailedDeadline {
  id: string;
  title: string;
  description?: string;
  status: 'MISSING' | 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';
  complianceType: string;
  documents?: {
    id: string;
    fileName: string;
    status: string;
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

export default function OwnerDashboard() {
  const { data: session } = useSession();
  const { selectedDeadlineId, setSelectedDeadlineId } = useWorkspaceStore();

  const [client, setClient] = useState<ClientProfile | null>(null);
  const [deadlines, setDeadlines] = useState<DeadlineItem[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Bottom sheet details states
  const [detailedDeadline, setDetailedDeadline] = useState<DetailedDeadline | null>(null);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loadingDetails, setLoadingDetails] = useState(false);

  const commentsEndRef = useRef<HTMLDivElement>(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001';

  // ─── 1. Fetch Client Profile & Deadlines ───────────────────────────────────
  useEffect(() => {
    const token = session?.accessToken;
    if (!token) return;

    async function initDashboard() {
      try {
        setLoading(true);
        // Get client profile assigned to owner
        const clientRes = await fetch(`${backendUrl}/api/v1/clients`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!clientRes.ok) return;
        const clientsData = await clientRes.json();
        if (clientsData.length === 0) return;

        const myClient = clientsData[0];
        setClient(myClient);

        // Fetch client calendar deadlines
        const calendarRes = await fetch(
          `${backendUrl}/api/v1/calendar?clientId=${myClient.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (calendarRes.ok) {
          const deadlinesData = await calendarRes.json();
          setDeadlines(deadlinesData);
        }
      } catch (err) {
        console.error('Error initializing owner dashboard:', err);
      } finally {
        setLoading(false);
      }
    }

    initDashboard();
  }, [session, backendUrl]);

  // ─── 2. Fetch Selected Deadline Details (for Bottom Sheet) ─────────────────
  useEffect(() => {
    const token = session?.accessToken;
    if (!token || !selectedDeadlineId) {
      setDetailedDeadline(null);
      setComments([]);
      return;
    }

    async function fetchDetails() {
      try {
        setLoadingDetails(true);
        const res = await fetch(
          `${backendUrl}/api/v1/calendar/deadlines/${selectedDeadlineId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (res.ok) {
          const data = await res.json();
          setDetailedDeadline(data);
          setComments(data.comments || []);
        }
      } catch (err) {
        console.error('Error fetching deadline details:', err);
      } finally {
        setLoadingDetails(false);
      }
    }

    fetchDetails();
  }, [session, selectedDeadlineId, backendUrl]);

  // ─── 3. Realtime Comment Thread ─────────────────────────────────────────────
  const handleRealtimeComment = (newCommentPayload: any) => {
    setComments((prev) => {
      if (prev.some((c) => c.id === newCommentPayload.id)) return prev;

      const enriched: CommentItem = {
        id: newCommentPayload.id,
        message: newCommentPayload.message,
        createdAt: newCommentPayload.createdAt,
        user: {
          id: newCommentPayload.userId,
          fullName:
            newCommentPayload.userId === session?.user?.id
              ? (session?.user?.name ?? 'You')
              : 'CA Advisor',
          role:
            newCommentPayload.userId === session?.user?.id
              ? (session?.user?.role ?? 'MSME_OWNER')
              : 'CA_PARTNER',
        },
      };
      return [...prev, enriched];
    });
  };

  useSupabaseRealtime(selectedDeadlineId, handleRealtimeComment);

  // Auto-scroll chat
  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  // ─── 4. Actions ─────────────────────────────────────────────────────────────
  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !session?.accessToken || !selectedDeadlineId) return;

    try {
      const res = await fetch(
        `${backendUrl}/api/v1/calendar/deadlines/${selectedDeadlineId}/comments`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: newComment }),
        },
      );
      if (res.ok) {
        const data = await res.json();
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

  // ─── 5. Calendar Helper Functions ──────────────────────────────────────────
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // ─── 6. Compliance Health Calculation ──────────────────────────────────────
  const totalDeadlines = deadlines.length;
  const verifiedDeadlines = deadlines.filter((d) => d.status === 'VERIFIED').length;
  const healthScore = totalDeadlines > 0 ? Math.round((verifiedDeadlines / totalDeadlines) * 100) : 100;

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-canvas flex items-center justify-center p-5">
        <div className="text-center font-sans text-sm text-neutral-muted">
          Loading your compliance profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-canvas flex flex-col p-4 pb-20 relative overflow-x-hidden">
      {/* Top Welcome Section */}
      <header className="mb-4">
        <h1 className="font-sans font-extrabold text-2xl text-brand-navy">
          Welcome, {session?.user?.name ?? 'Owner'}!
        </h1>
        <p className="font-sans text-xs text-neutral-muted">
          Portal for <strong className="text-brand-navy">{client?.companyName ?? 'Your Business'}</strong>
        </p>
      </header>

      {/* Filing Health Progress Card */}
      <div className="mb-5 p-4 bg-neutral-surface border-2 border-brand-navy rounded-sticker shadow-sticker flex items-center justify-between">
        <div className="flex-1 pr-3">
          <span className="font-handwritten text-accent-purple text-base rotate-3 block transform origin-top-left mb-1">
            Filing Quality Score ↗
          </span>
          <h2 className="font-sans font-extrabold text-md text-brand-navy">Filing Health Status</h2>
          <p className="font-sans text-[11px] text-neutral-muted mt-1 leading-snug">
            Percentage of on-time tax filings and license certificates secured.
          </p>
        </div>

        {/* Circular Progress Indicator */}
        <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="34"
              className="stroke-neutral-canvas fill-none"
              strokeWidth="6"
            />
            <circle
              cx="40"
              cy="40"
              r="34"
              className={clsx('fill-none transition-all duration-500', {
                'stroke-accent-rose': healthScore < 50,
                'stroke-accent-gold': healthScore >= 50 && healthScore < 80,
                'stroke-brand-teal': healthScore >= 80,
              })}
              strokeWidth="6"
              strokeDasharray={2 * Math.PI * 34}
              strokeDashoffset={2 * Math.PI * 34 * (1 - healthScore / 100)}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute font-sans font-extrabold text-sm text-brand-navy">
            {healthScore}%
          </span>
        </div>
      </div>

      {/* Monthly Calendar View (Card Header) */}
      <div className="mb-4 bg-neutral-surface border-2 border-brand-navy rounded-sticker p-3 shadow-sticker-sm">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-sans font-extrabold text-sm text-brand-navy">Compliance Schedule</h3>
          
          {/* Navigator */}
          <div className="flex items-center gap-1 border-2 border-brand-navy rounded-sticker bg-neutral-canvas p-0.5">
            <button onClick={prevMonth} className="p-0.5" aria-label="Previous month">
              <ChevronLeft className="h-4 w-4 text-brand-navy" />
            </button>
            <span className="font-sans font-extrabold text-[10px] px-1.5 text-brand-navy uppercase tracking-wider">
              {format(currentMonth, 'MMM yy')}
            </span>
            <button onClick={nextMonth} className="p-0.5" aria-label="Next month">
              <ChevronRight className="h-4 w-4 text-brand-navy" />
            </button>
          </div>
        </div>

        {/* Day Name headers */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
            <span key={i} className="font-sans font-bold text-[10px] text-neutral-muted">
              {day}
            </span>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          {dateRange.map((date, idx) => {
            const isCurrentMonthDate = isSameMonth(date, currentMonth);
            const dateDeadlines = deadlines.filter((d) => isSameDay(new Date(d.targetDate), date));

            // Dot color helper
            let dotColor: 'red' | 'amber' | 'green' | 'none' = 'none';
            if (dateDeadlines.length > 0) {
              if (dateDeadlines.some((d) => d.status === 'MISSING')) {
                dotColor = 'red';
              } else if (dateDeadlines.some((d) => d.status === 'PENDING_VERIFICATION' || d.status === 'REJECTED')) {
                dotColor = 'amber';
              } else if (dateDeadlines.every((d) => d.status === 'VERIFIED')) {
                dotColor = 'green';
              }
            }

            return (
              <button
                key={idx}
                disabled={dateDeadlines.length === 0}
                onClick={() => setSelectedDeadlineId(dateDeadlines[0].id)}
                className={clsx(
                  'h-12 border-2 border-brand-navy rounded-sticker flex flex-col justify-between items-center p-1 relative transition-all active:translate-y-0.5',
                  isCurrentMonthDate ? 'bg-neutral-surface' : 'bg-neutral-surface/40 opacity-40',
                  dateDeadlines.length > 0
                    ? 'cursor-pointer hover:bg-neutral-canvas border-solid'
                    : 'border-dashed border-neutral-muted/40 cursor-default',
                )}
              >
                <span className="font-sans font-extrabold text-[11px]">
                  {format(date, 'd')}
                </span>

                {/* Status Dot */}
                {dotColor !== 'none' && (
                  <span
                    className={clsx('h-2 w-2 rounded-full border border-brand-navy mb-0.5 animate-pulse', {
                      'bg-accent-rose': dotColor === 'red',
                      'bg-accent-gold': dotColor === 'amber',
                      'bg-accent-mint': dotColor === 'green',
                    })}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-around items-center px-2 py-2 bg-neutral-surface border-2 border-brand-navy rounded-sticker text-[10px] font-sans font-extrabold tracking-wider uppercase text-brand-navy mb-5 shadow-sticker-sm">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent-rose border border-brand-navy" /> Action Required</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent-gold border border-brand-navy" /> In Progress</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent-mint border border-brand-navy" /> Filed & Secured</span>
      </div>

      {/* ─── Swipe-Up Bottom Sheet Drawer (Contextual details) ─── */}
      <div
        className={clsx(
          'fixed inset-x-0 bottom-0 bg-neutral-surface border-t-2 border-brand-navy rounded-t-[20px] shadow-sticker-lg z-50 flex flex-col max-h-[85vh] transition-transform duration-200 ease-out',
          selectedDeadlineId ? 'translate-y-0' : 'translate-y-full',
        )}
      >
        {selectedDeadlineId && (
          <>
            {/* Grabber indicator */}
            <div className="w-12 h-1 bg-brand-navy/30 rounded-full mx-auto my-3 shrink-0" />

            {/* Bottom Sheet Header */}
            <div className="px-4 pb-3 border-b-2 border-brand-navy flex justify-between items-start">
              <div className="flex-1 min-w-0 pr-2">
                <span className="font-sans font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 bg-brand-navy text-neutral-surface rounded-badge">
                  {detailedDeadline?.complianceType ?? 'COMPLIANCE'}
                </span>
                <h4 className="font-sans font-extrabold text-md text-brand-navy mt-1 truncate">
                  {detailedDeadline?.title}
                </h4>
                <p className="font-sans text-[11px] text-neutral-muted mt-1 leading-snug">
                  {detailedDeadline?.description}
                </p>
              </div>
              <button
                onClick={() => setSelectedDeadlineId(null)}
                className="p-1 hover:bg-neutral-canvas border-2 border-brand-navy rounded-sticker transition-colors shrink-0"
              >
                <X className="h-4 w-4 text-brand-navy" />
              </button>
            </div>

            {loadingDetails ? (
              <div className="p-8 text-center font-sans text-xs text-neutral-muted">
                Loading task details...
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Status Indicator */}
                <div className="p-3 bg-neutral-canvas border-2 border-brand-navy rounded-sticker flex items-center justify-between">
                  <span className="font-sans font-extrabold text-xs text-brand-navy"> Filer Status</span>
                  <div className="flex items-center gap-1.5">
                    {detailedDeadline?.status === 'VERIFIED' && (
                      <span className="flex items-center gap-1 font-sans font-bold text-xs text-brand-teal">
                        <CheckCircle2 className="h-4 w-4 text-brand-teal" /> Filed & Secured
                      </span>
                    )}
                    {detailedDeadline?.status === 'MISSING' && (
                      <span className="flex items-center gap-1 font-sans font-bold text-xs text-accent-rose">
                        <AlertCircle className="h-4 w-4 text-accent-rose" /> Action Required (Missing)
                      </span>
                    )}
                    {detailedDeadline?.status === 'PENDING_VERIFICATION' && (
                      <span className="flex items-center gap-1 font-sans font-bold text-xs text-accent-gold">
                        <Clock className="h-4 w-4 text-accent-gold" /> Under CA Review
                      </span>
                    )}
                    {detailedDeadline?.status === 'REJECTED' && (
                      <span className="flex items-center gap-1 font-sans font-bold text-xs text-accent-rose">
                        <AlertCircle className="h-4 w-4 text-accent-rose" /> Document Rejected
                      </span>
                    )}
                  </div>
                </div>

                {/* Documents list */}
                <div>
                  <span className="font-sans font-bold text-xs text-brand-navy block mb-2">My Uploaded Files</span>
                  <div className="space-y-1.5">
                    {detailedDeadline?.documents && detailedDeadline.documents.length > 0 ? (
                      detailedDeadline.documents.map((doc) => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-2.5 bg-neutral-surface border border-brand-navy rounded-sticker"
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
                      <p className="font-sans text-xs text-neutral-muted italic">No files uploaded yet.</p>
                    )}
                  </div>
                </div>

                {/* Chat window */}
                <div className="flex flex-col h-[220px] border-2 border-brand-navy rounded-sticker overflow-hidden bg-neutral-canvas">
                  <div className="px-3 py-1.5 bg-brand-navy text-neutral-surface flex items-center justify-between">
                    <span className="font-sans font-extrabold text-[9px] tracking-wider uppercase flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> Chat with CA Advisor
                    </span>
                  </div>

                  {/* Comments list */}
                  <div className="flex-1 p-2.5 overflow-y-auto space-y-2">
                    {comments.map((comment) => {
                      const isMe = comment.user.id === session?.user?.id;
                      return (
                        <div
                          key={comment.id}
                          className={clsx('flex flex-col max-w-[85%] rounded-[8px] p-2 text-xs border border-brand-navy shadow-sm animate-in fade-in duration-150 slide-in-from-bottom-2', {
                            'bg-accent-purple text-neutral-surface ml-auto': isMe,
                            'bg-neutral-surface text-brand-navy': !isMe,
                          })}
                        >
                          <span className="font-sans font-extrabold text-[8px] opacity-75">
                            {comment.user.fullName} ({comment.user.role === 'MSME_OWNER' ? 'You' : 'CA Partner'})
                          </span>
                          <p className="font-sans mt-0.5">{comment.message}</p>
                          <span className="font-sans text-[7px] text-right mt-0.5 opacity-50">
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
                      placeholder="Ask your CA..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 px-3 py-2 font-sans text-xs bg-transparent focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="p-2 border-l border-brand-navy bg-neutral-canvas text-brand-navy"
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
