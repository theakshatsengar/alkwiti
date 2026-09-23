import { useState, type ReactNode } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/supabase/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

/**
 * Round avatar for the signed-in user. Google profile images sometimes fail to
 * load (referrer policy, rate limits, or the field being absent) — when that
 * happens we fall back to the user's initial instead of a broken image icon.
 */
export function UserAvatar({
  src,
  initial,
  className,
}: {
  src?: string | undefined;
  initial: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-full bg-brand/15 text-sm font-semibold text-brand",
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt=""
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        initial
      )}
    </span>
  );
}

/**
 * Sign-out control that first asks for confirmation via an alert dialog.
 * `trigger` is the clickable element (icon button in the sidebar).
 */
export function SignOutButton({ trigger }: { trigger: ReactNode }) {
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const confirm = async (e: React.MouseEvent) => {
    // Prevent Radix from auto-closing so the dialog stays up while we sign out.
    e.preventDefault();
    setBusy(true);
    try {
      await signOut();
    } finally {
      setBusy(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent className="rounded-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out of ALKWITI?</AlertDialogTitle>
          <AlertDialogDescription>
            You'll need to sign in again with Google to access the dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={confirm}
            disabled={busy}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {busy ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Signing out…
              </>
            ) : (
              <>
                <LogOut className="size-4" /> Sign out
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
