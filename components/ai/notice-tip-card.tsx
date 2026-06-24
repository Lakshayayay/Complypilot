'use client';

import React from 'react';
import clsx from 'clsx';
import { Sparkles } from 'lucide-react';

export interface AiSummaryResult {
  summary: string;
  deadline: string | null;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
}

interface NoticeTipCardProps {
  result: AiSummaryResult;
  isLoading?: boolean;
}

const severityConfig = {
  HIGH: {
    bg: 'bg-accent-rose/10',
    border: 'border-accent-rose/50',
    badge: 'bg-accent-rose text-white',
    label: 'High Priority',
  },
  MEDIUM: {
    bg: 'bg-accent-gold/10',
    border: 'border-accent-gold/50',
    badge: 'bg-accent-gold/80 text-brand-navy',
    label: 'Medium Priority',
  },
  LOW: {
    bg: 'bg-accent-mint/10',
    border: 'border-accent-mint/50',
    badge: 'bg-accent-mint/70 text-brand-navy',
    label: 'Low Priority',
  },
};

export function NoticeTipCard({ result, isLoading }: NoticeTipCardProps) {
  const config = severityConfig[result.severity] ?? severityConfig.MEDIUM;

  if (isLoading) {
    return (
      <div className="p-4 bg-accent-purple/10 border-2 border-dashed border-accent-purple/40 rounded-sticker animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-accent-purple" />
          <span className="font-sans font-extrabold text-xs uppercase tracking-wider text-accent-purple">
            AI Reading Notice...
          </span>
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-accent-purple/20 rounded w-full" />
          <div className="h-3 bg-accent-purple/20 rounded w-5/6" />
          <div className="h-3 bg-accent-purple/20 rounded w-4/6" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'p-4 border-2 border-dashed rounded-sticker',
        'bg-accent-purple/10 border-accent-purple/40',
      )}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent-purple shrink-0" />
          <span className="font-sans font-extrabold text-xs uppercase tracking-wider text-accent-purple">
            ✦ AI Note
          </span>
        </div>

        <div className="flex items-center gap-2">
          {result.deadline && (
            <span className="px-2 py-0.5 bg-brand-navy text-neutral-surface font-sans font-extrabold text-[9px] uppercase tracking-wider rounded-badge">
              Due: {result.deadline}
            </span>
          )}
          <span
            className={clsx(
              'px-2 py-0.5 font-sans font-extrabold text-[9px] uppercase tracking-wider rounded-badge border border-brand-navy',
              config.badge,
            )}
          >
            {config.label}
          </span>
        </div>
      </div>

      {/* The AI Summary — displayed in Caveat handwritten font to visually separate it from official text */}
      <p className="font-handwritten text-accent-purple text-lg leading-snug mb-3">
        {result.summary}
      </p>

      {/* Disclaimer — mandatory per product guardrails */}
      <p className="font-sans text-[9px] text-neutral-muted italic border-t border-accent-purple/20 pt-2 mt-2">
        ⚠ This is an AI-generated summary for quick reference only. It is not legal advice. 
        Always refer to the official government notice for binding information.
      </p>
    </div>
  );
}

// Skeleton loading state for SSR
export function NoticeTipCardSkeleton() {
  return (
    <div className="p-4 bg-accent-purple/10 border-2 border-dashed border-accent-purple/40 rounded-sticker">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-4 w-4 text-accent-purple/40" />
        <div className="h-3 w-24 bg-accent-purple/20 rounded animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-accent-purple/15 rounded w-full animate-pulse" />
        <div className="h-4 bg-accent-purple/15 rounded w-5/6 animate-pulse" />
        <div className="h-4 bg-accent-purple/15 rounded w-3/4 animate-pulse" />
      </div>
    </div>
  );
}
