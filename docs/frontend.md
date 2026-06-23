

This design system is a deliberate fusion of two design philosophies:
1. **Odoo’s Playful, App-Centric Simplification:** Clean floating sidebars, multi-colored icon grids, minimal card layers, and hand-drawn sketched annotations (arrows, markers, underlines) that humanize the interface for MSME owners.
2. **Tally’s Sophisticated "Sticker" Utility:** Thick-bordered high-contrast cards, retro-neobrutalist structural outlines, solid flat shadows, and dense information grids that signal trust and functional capability to professional CAs.

-

# FRONTEND_GUIDELINES.md: Design System & Component Library Tokens

## 1. Design System Tokens (Tailwind Configuration)

This Tailwind config extension implements the merged design system. Paste this directly into your `tailwind.config.ts`.

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        // Tally-Inspired Trust Primaries
        brand: {
          navy: "#0A192F",      // Deep, trustworthy background & heavy text
          blue: "#1E3A8A",      // Primary UI interactive elements
          teal: "#0F766E",      // Success, "Filed & Secured" state indicator
        },
        // Odoo-Inspired Vibrant UI Accents
        accent: {
          gold: "#F59E0B",      // Odoo marker-yellow / alert highlighters
          mint: "#10B981",      // Soft, friendly interactive green
          rose: "#EF4444",      // High priority alert state
          purple: "#7C3AED",    // Playful primary/secondary accents
        },
        // Clean Neutrals with Purple/Slate Tints
        neutral: {
          canvas: "#F8FAFC",    // Standard page background
          surface: "#FFFFFF",   // Cards, drawers, modals
          muted: "#64748B",     // Secondary text and grid borders
        }
      },
      fontFamily: {
        // Structured sans-serif for numbers/grids + handwritten scripts for playful callouts
        sans: ["Inter", "system-ui", "sans-serif"],
        handwritten: ["Caveat", "Architects Daughter", "cursive"], // Odoo annotations
      },
      boxShadow: {
        // Tally-style flat "Sticker" drop shadows (Neo-brutalist Lite)
        "sticker-sm": "2px 2px 0px 0px #0A192F",
        "sticker": "4px 4px 0px 0px #0A192F",
        "sticker-lg": "6px 6px 0px 0px #0A192F",
        "sticker-hover": "2px 2px 0px 0px #0A192F",
      },
      borderRadius: {
        "sticker": "12px",      // Card elements
        "badge": "8px",         // Tag & icon containers
      },
      borderWidth: {
        "sticker": "2px",       // Bold outlines for the sticker look
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
```

---

## 2. Global Typography & Accent Philosophy

To visually merge corporate reliability with friendly, human guidance, the application utilizes a dual-font strategy:

*   **Primary Font (Inter):** Applied to all tables, transaction numbers, forms, dates, and dashboard headers to ensure clarity, structured alignment, and immediate readability.
*   **Accent Font (Caveat/Handwritten):** Used exclusively for context callouts, tooltips, guidance notes, and highlight sketches (e.g., curved pointers, circled warnings). This simulates a personal "CA pencil annotation" on the digital document.

```html
<!-- Example of typography styling -->
<div class="relative">
  <h2 class="font-sans font-extrabold text-2xl text-brand-navy">Compliance Health Score</h2>
  <span class="absolute -top-6 right-2 font-handwritten text-accent-purple text-lg rotate-3">
    Level up your quality of work! ↗
  </span>
</div>
```

---

## 3. UI Component Construction Recipes

### Component A: The "Sticker-Style" Master Calendar Day (Desktop CA View)
This represents the atomic component of the Shared Collaborative Calendar, displaying dense information using Tally’s high-contrast outlined borders.

```tsx
import React from "react";
import clsx from "clsx";

interface CalendarDayProps {
  dayNumber: number;
  isCurrentMonth: boolean;
  status: "filed" | "pending-client" | "awaiting-verification" | "none";
  tasksCount: number;
}

export const CalendarDay: React.FC<CalendarDayProps> = ({
  dayNumber,
  isCurrentMonth,
  status,
  tasksCount,
}) => {
  return (
    <div
      className={clsx(
        "h-24 p-2 bg-neutral-surface border-sticker border-brand-navy rounded-sticker transition-all duration-200 cursor-pointer",
        isCurrentMonth ? "text-brand-navy" : "text-neutral-muted opacity-40",
        // Soft hover lift mimicking physical stickers
        "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker"
      )}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-sans font-bold text-sm">{dayNumber}</span>
        {tasksCount > 0 && (
          <span className="px-1.5 py-0.5 bg-brand-navy text-neutral-surface font-sans font-extrabold text-xs rounded-badge">
            {tasksCount}
          </span>
        )}
      </div>

      {/* Dynamic Status Badges (Odoo-inspired rounded labels) */}
      {status !== "none" && (
        <div
          className={clsx(
            "mt-2 px-2 py-1 rounded-badge text-[10px] font-sans font-extrabold tracking-wider uppercase border border-brand-navy",
            {
              "bg-accent-mint/20 text-brand-teal": status === "filed",
              "bg-accent-rose/20 text-accent-rose": status === "pending-client",
              "bg-accent-gold/20 text-brand-navy": status === "awaiting-verification",
            }
          )}
        >
          {status === "filed" && "● Filed"}
          {status === "pending-client" && "▲ Missing Doc"}
          {status === "awaiting-verification" && "■ Review"}
        </div>
      )}
    </div>
  );
};
```

### Component B: SPCB Warning Card with Handwritten Annotations (Mobile Owner View)
This card utilizes hand-drawn aesthetics to draw attention to critical deadlines, keeping the interface approachable yet clear.

```tsx
import React from "react";

interface SPCBWarningCardProps {
  stateBoardName: "DPCC" | "MPCB" | "PPCB";
  industryCategory: "Red" | "Orange" | "Green";
  daysRemaining: number;
}

export const SPCBWarningCard: React.FC<SPCBWarningCardProps> = ({
  stateBoardName,
  industryCategory,
  daysRemaining,
}) => {
  return (
    <div className="relative p-5 bg-neutral-surface border-sticker border-brand-navy rounded-sticker shadow-sticker">
      {/* Hand-drawn underline highlight element */}
      <div className="absolute -top-3 -right-2 bg-accent-gold text-brand-navy px-2 py-1 rounded-badge font-handwritten text-sm border border-brand-navy rotate-6">
        Urgent Attention!
      </div>

      <div className="flex justify-between items-center mb-3">
        <span className="font-sans font-bold text-brand-navy text-lg">{stateBoardName} CTO Renewal</span>
        <span className="px-2.5 py-1 bg-brand-navy text-neutral-surface font-sans font-bold text-xs rounded-badge">
          {industryCategory} Category
        </span>
      </div>

      <p className="font-sans text-sm text-neutral-muted mb-4">
        Your Consent to Operate expires shortly. Failure to submit renewal documents triggers automatic penalties.
      </p>

      <div className="flex justify-between items-center">
        <div>
          <span className="font-sans text-xs text-neutral-muted uppercase block">Time Remaining</span>
          <span className="font-sans font-extrabold text-2xl text-accent-rose">{daysRemaining} Days</span>
        </div>
        
        <button className="px-4 py-2 bg-brand-navy text-neutral-surface font-sans font-bold text-sm border-sticker border-brand-navy rounded-sticker shadow-sticker-sm hover:translate-y-0.5 hover:shadow-sticker-hover active:translate-y-1 transition-all">
          Upload Documents
        </button>
      </div>
    </div>
  );
};
```

### Component C: Multi-Tenant client Selector (Sticky CA Sidebar Component)
This clean list represents the client profile sidebar workspace, allowing fast keyboard navigation for CAs.

```tsx
import React from "react";
import clsx from "clsx";

interface ClientProfileItemProps {
  companyName: string;
  state: "Punjab" | "Delhi" | "Maharashtra";
  missingDocsCount: number;
  isActive: boolean;
  onClick: () => void;
}

export const ClientProfileItem: React.FC<ClientProfileItemProps> = ({
  companyName,
  state,
  missingDocsCount,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-full text-left p-3 mb-2 border-sticker border-brand-navy rounded-sticker transition-all duration-150 flex justify-between items-center",
        isActive 
          ? "bg-accent-purple text-neutral-surface shadow-sticker translate-x-1" 
          : "bg-neutral-surface text-brand-navy hover:bg-neutral-canvas"
      )}
    >
      <div>
        <span className="font-sans font-bold text-sm block truncate max-w-[150px]">
          {companyName}
        </span>
        <span className={clsx(
          "font-sans text-xs uppercase tracking-wider font-extrabold",
          isActive ? "text-neutral-surface/80" : "text-neutral-muted"
        )}>
          {state}
        </span>
      </div>

      {missingDocsCount > 0 && (
        <span className={clsx(
          "h-6 min-w-[24px] px-1.5 flex items-center justify-center font-sans font-extrabold text-xs rounded-full border border-brand-navy",
          isActive ? "bg-neutral-surface text-accent-purple" : "bg-accent-rose text-neutral-surface"
        )}>
          {missingDocsCount}
        </span>
      )}
    </button>
  );
};
```

---

## 4. UI Transition & Interaction Standards

To ensure the interface feels responsive and snappy, keep transitions beneath **150ms** as observed in Odoo’s UI benchmarks:

1.  **Slide-Out Calendar Drawers:**
    *   *Entrance:* `transition-transform duration-200 ease-out translate-x-0`
    *   *Exit:* `transition-transform duration-150 ease-in translate-x-full`
2.  **Sticker Card Hover Lift:**
    *   Avoid using traditional soft, blurry CSS shadows. Use direct, crisp translation movements to interact with solid flat shadows:
    *   `hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(10,25,47,1)] transition-all duration-100`
3.  **Realtime Collaborative Comment Popups:**
    *   Message bubbles fade in and out cleanly using a simple opacity transition:
    *   `animate-in fade-in duration-150 slide-in-from-bottom-2`

---

