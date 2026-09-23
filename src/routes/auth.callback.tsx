import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({ meta: [{ title: "Signing in · ALKWITI" }] }),
  component: AuthCallback,
});

/**
 * OAuth redirect target. Supabase (with detectSessionInUrl + PKCE) exchanges
 * the code in the URL for a session automatically. We wait for that session,
 * then route into the dashboard.
 */
function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      navigate({ to: "/auth", replace: true });
      return;
    }

    let done = false;
    const goHome = () => {
      if (done) return;
      done = true;
      navigate({ to: "/", replace: true });
    };

    supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
          return;
        }
        if (data.session) goHome();
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Sign-in failed"));

    // Fallback: the session may land a tick after the URL is processed.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) goHome();
    });

    const timeout = window.setTimeout(() => {
      if (!done) navigate({ to: "/auth", replace: true });
    }, 8000);

    return () => {
      sub.subscription.unsubscribe();
      window.clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 text-foreground">
      <div className="text-center">
        {error ? (
          <>
            <AlertCircle className="mx-auto size-6 text-destructive" />
            <p className="mt-3 text-sm font-medium">Sign-in failed</p>
            <p className="mt-1 text-xs text-muted-foreground">{error}</p>
            <a
              href="/auth"
              className="mt-4 inline-block text-sm font-medium text-brand underline-offset-4 hover:underline"
            >
              Back to sign in
            </a>
          </>
        ) : (
          <>
            <Loader2 className="mx-auto size-6 animate-spin text-brand" />
            <p className="mt-3 text-sm text-muted-foreground">Completing sign-in…</p>
          </>
        )}
      </div>
    </div>
  );
}
