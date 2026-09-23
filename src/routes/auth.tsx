import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/supabase/auth";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · ALKWITI, Cutie" },
      { name: "description", content: "Sign in to the ALKWITI financial command center." },
    ],
  }),
  component: AuthPage,
});

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1a6.2 6.2 0 1 1 0-12.4c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 2.9 14.7 2 12 2a10 10 0 1 0 0 20c5.8 0 9.6-4.1 9.6-9.8 0-.7-.1-1.2-.2-1.7H12z"
      />
      <path
        fill="#34A853"
        d="M3.9 7.3l3.2 2.3C8 8 9.8 6.9 12 6.9c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 2.9 14.7 2 12 2 8.1 2 4.8 4.2 3.9 7.3z"
        opacity="0"
      />
    </svg>
  );
}

function AuthPage() {
  const { user, loading, configured, signInWithGoogle } = useAuth();
  const { resolved } = useTheme();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Already signed in → go to the dashboard.
  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/", replace: true });
    }
  }, [loading, user, navigate]);

  const handleGoogle = async () => {
    setError(null);
    setSubmitting(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error);
      setSubmitting(false);
    }
    // On success the browser is redirected to Google, so no further work here.
  };

  const logoSrc = resolved === "dark" ? "/logo-darkbg.png" : "/logo-lightbg.png";

  return (
    <section className="h-screen overflow-hidden bg-canvas p-2.5 text-foreground lg:min-h-screen lg:h-auto">
      <div className="grid h-[calc(100vh-1.25rem)] gap-2.5 overflow-hidden rounded-2xl lg:h-auto lg:min-h-[calc(100vh-1.25rem)] lg:grid-cols-2">
        {/* LEFT — sign-in card */}
        <div className="flex items-center justify-center rounded-2xl border border-border bg-background px-6 pb-12 pt-4 lg:px-14 lg:py-12">
          <div className="mx-auto w-full max-w-[400px] -translate-y-4 lg:translate-y-0">
            <img
              src={logoSrc}
              alt="Alkwiti, Trade Without Borders"
              className="-ml-3 mb-4 h-20 w-auto lg:ml-0 lg:mb-10"
            />

            <h1 className="text-2xl font-semibold tracking-tight">Sign into AlkWiTi, Cutie 😉</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Access the founder financial command center.
            </p>

            {!configured && (
              <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-warning/30 bg-warning/[0.08] p-3 text-sm">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-warning-foreground" />
                <div>
                  <p className="font-medium text-foreground">Authentication not configured</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Add <code className="font-mono">VITE_SUPABASE_URL</code> and{" "}
                    <code className="font-mono">VITE_SUPABASE_ANON_KEY</code> to a{" "}
                    <code className="font-mono">.env</code> file and restart the dev server.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/[0.08] p-3 text-sm">
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                <p className="text-foreground">{error}</p>
              </div>
            )}

            <button
              type="button"
              onClick={handleGoogle}
              disabled={submitting || !configured || loading}
              className="mt-7 flex h-12 w-full items-center justify-center gap-3 rounded-full border border-border bg-card text-sm font-medium text-foreground transition-colors hover:bg-accent disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Redirecting to Google…
                </>
              ) : (
                <>
                  <GoogleIcon /> Continue with Google
                </>
              )}
            </button>

            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              By continuing you agree to ALKWITI's terms. Access is restricted to authorized
              founders.
            </p>
          </div>
        </div>

        {/* RIGHT — brand panel (desktop only) */}
        <div className="relative hidden overflow-hidden rounded-2xl bg-foreground p-16 text-background lg:flex">
          <div className="grid-texture-dark pointer-events-none absolute inset-0 opacity-100" />
          <div
            className="pointer-events-none absolute -right-24 top-1/3 size-96 rounded-full blur-[120px]"
            style={{ background: "color-mix(in oklch, var(--color-brand) 30%, transparent)" }}
          />
          <div className="relative z-10 flex w-full flex-col justify-end">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/50">
              Trade Without Borders
            </p>
            <h2 className="mt-3 max-w-sm text-2xl font-semibold leading-tight tracking-tight">
              Your financial command center.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
