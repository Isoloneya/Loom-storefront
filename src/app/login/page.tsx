"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { AuthCard } from "@/components/ui/AuthCard";
import { Field } from "@/components/ui/Field";
import { inputClass, primaryButton } from "@/components/ui/styles";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Header />

      <AuthCard
        title="Sign in"
        error={error}
        footer={
          <>
            No account yet?{" "}
            <Link href="/register" className="text-accent">
              Create one →
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="Email">
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Password">
            <input
              required
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={inputClass}
            />
          </Field>
          <button type="submit" disabled={busy} className={`${primaryButton} w-full mt-2`}>
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </AuthCard>
    </>
  );
}
