import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { FlutedGlass } from "@paper-design/shaders-react";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in | Acme Corp" },
      { name: "description", content: "Sign in to your Acme Corp workspace." },
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
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.9c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.6.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.6 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7 1.3 0 1.6.7 2.8.7 1.2 0 1.9-1 2.6-2 .8-1.2 1.2-2.3 1.2-2.4-.1 0-2.3-.9-2.3-3.6zM14.3 6.3c.6-.7 1-1.7.9-2.7-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2z" />
    </svg>
  );
}

function AuthPage() {
  const [mode, setMode] = useState<"signup" | "signin">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const isSignup = mode === "signup";

  const inputClass =
    "h-11 w-full rounded-lg border border-white/10 bg-white/[0.07] px-3.5 text-sm text-white outline-none transition-colors placeholder:text-white/40 focus:border-white/25";

  return (
    <section className="dark min-h-screen bg-[#050505] p-3 text-white [font-synthesis:none]">
      <div className="grid min-h-[calc(100vh-1.5rem)] gap-6 lg:grid-cols-[0.94fr_1.06fr]">
        {/* LEFT — form card */}
        <div className="flex items-center justify-center rounded-md border border-white/10 bg-[#17171b] px-6 py-12 lg:px-14 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mx-auto w-full max-w-[460px]"
          >
            <div className="mb-8">
              <div className="mb-6 grid size-10 place-items-center rounded-md bg-white text-lg font-bold text-black">
                A
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                {isSignup ? "Create your account" : "Welcome back"}
              </h1>
              <p className="mt-1.5 text-sm text-white/50">
                {isSignup
                  ? "Start tracking your workspace in minutes."
                  : "Sign in to continue to your workspace."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.07] text-sm font-medium transition-colors hover:bg-white/[0.12]"
              >
                <GoogleIcon /> Google
              </button>
              <button
                type="button"
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.07] text-sm font-medium transition-colors hover:bg-white/[0.12]"
              >
                <AppleIcon /> Apple
              </button>
            </div>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs uppercase tracking-wide text-white/40">or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {isSignup && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60">First name</label>
                    <input className={inputClass} placeholder="Ada" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/60">Last name</label>
                    <input className={inputClass} placeholder="Lovelace" />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/60">Email</label>
                <input type="email" className={inputClass} placeholder="you@company.com" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-white/60">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`${inputClass} pr-11`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-white/50 transition-colors hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {isSignup && (
                <label className="flex items-start gap-2.5 text-xs text-white/50">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-3.5 rounded border-white/20 bg-white/[0.07]"
                  />
                  <span>I agree to the Terms of Service and Privacy Policy.</span>
                </label>
              )}

              <button
                type="submit"
                className="h-11 w-full rounded-lg bg-white text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                {isSignup ? "Create account" : "Sign in"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/50">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(isSignup ? "signin" : "signup")}
                className="font-medium text-white underline-offset-4 hover:underline"
              >
                {isSignup ? "Sign in" : "Sign up"}
              </button>
            </p>
          </motion.div>
        </div>

        {/* RIGHT — shader marketing panel (desktop only) */}
        <div className="relative hidden overflow-hidden rounded-md bg-linear-to-b from-black to-[#050505] p-8 text-white lg:flex lg:p-16">
          <div className="pointer-events-none absolute inset-0 z-0">
            <FlutedGlass
              size={0.89}
              shape="lines"
              distortionShape="prism"
              distortion={0.5}
              edges={0.25}
              scale={1.11}
              fit="cover"
              highlights={0.1}
              shadows={0.2}
              grainMixer={0.1}
              grainOverlay={0.1}
              colorBack="#00000000"
              colorHighlight="#FFFFFF"
              colorShadow="#000000"
              className="h-full w-full bg-transparent"
            />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between">
            <motion.blockquote
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-md text-2xl font-medium leading-snug tracking-tight"
            >
              “The cleanest way we've found to keep the whole team on the same page.”
              <footer className="mt-4 text-sm font-normal text-white/50">
                — Jordan Reyes, Head of Ops
              </footer>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              className="mt-12 origin-bottom-left overflow-hidden rounded-lg border border-white/10 bg-[#0d0d10] shadow-2xl lg:-rotate-3"
            >
              <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="size-2.5 rounded-full bg-white/20" />
                <span className="ml-3 rounded bg-white/[0.06] px-2 py-0.5 text-[11px] text-white/40">
                  app.acme.co/dashboard
                </span>
              </div>
              <div className="grid gap-3 p-4">
                <div className="h-6 w-2/5 rounded bg-white/[0.08]" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-20 rounded-lg bg-white/[0.05]" />
                  <div className="h-20 rounded-lg bg-white/[0.05]" />
                </div>
                <div className="h-24 rounded-lg bg-white/[0.05]" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
