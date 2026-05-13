import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Admin Login — AVS Kollam Gold Covering" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fn = mode === "signin" ? signIn : signUp;
    const { error } = await fn(email, password);
    setBusy(false);
    if (error) setError(error);
    else navigate({ to: "/admin" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cocoa-deep px-4">
      <div className="w-full max-w-md rounded-2xl border border-border/60 bg-card p-8 shadow-luxury">
        <Link to="/" className="text-xs uppercase tracking-[0.3em] text-champagne/70 hover:text-champagne">← Back to site</Link>
        <h1 className="mt-4 font-display text-3xl text-champagne">Admin {mode === "signin" ? "Login" : "Sign up"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Sign in to manage products, categories and filters."
            : "Create an account, then ask an existing admin to grant you the admin role."}
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground"
          />
          <input
            type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (min 6 chars)"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground"
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            disabled={busy}
            className="w-full rounded-lg bg-gold-gradient px-4 py-2.5 font-semibold text-cocoa-deep shadow-gold-glow disabled:opacity-60"
          >
            {busy ? "..." : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-xs uppercase tracking-wider text-champagne/70 hover:text-champagne"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}
