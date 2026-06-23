/**
 * Public layout shell
 * Wraps unauthenticated routes: /auth/ca-login, /auth/owner-login, /drop/[token]
 * Minimal — no sidebar, no nav bar.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-canvas">
      {children}
    </div>
  );
}
