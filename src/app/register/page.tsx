"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { AuthCard } from "@/components/ui/AuthCard";
import { Field } from "@/components/ui/Field";
import { inputClass, primaryButton } from "@/components/ui/styles";
import { useAuth } from "@/hooks/useAuth";

const emptyForm = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState(emptyForm);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setField = (name: keyof typeof emptyForm, value: string) =>
    setForm((previous) => ({ ...previous, [name]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setBusy(true);
    try {
      await register({
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        password: form.password,
      });
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
        title="Create account"
        error={error}
        footer={
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-accent">
              Sign in →
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="First name">
              <input
                required
                value={form.firstname}
                onChange={(event) => setField("firstname", event.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Last name">
              <input
                required
                value={form.lastname}
                onChange={(event) => setField("lastname", event.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
          <Field label="Email">
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => setField("email", event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Password">
            <input
              required
              type="password"
              value={form.password}
              onChange={(event) => setField("password", event.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Confirm password">
            <input
              required
              type="password"
              value={form.confirmPassword}
              onChange={(event) => setField("confirmPassword", event.target.value)}
              className={inputClass}
            />
          </Field>
          <button type="submit" disabled={busy} className={`${primaryButton} w-full mt-2`}>
            {busy ? "Creating account..." : "Create account"}
          </button>
        </form>
      </AuthCard>
    </>
  );
}
