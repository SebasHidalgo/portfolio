"use client";

import { useActionState, useEffect, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { ArrowLeft, ArrowRight, Loader } from "lucide-react";
import { login, type LoginState } from "@/lib/auth/actions";

const INITIAL_STATE: LoginState = {
  step: "email",
  email: "",
  error: null,
  notice: null,
  sentAt: null,
};
const RESEND_COOLDOWN_SECONDS = 60;

type StepProps = {
  state: LoginState;
  formAction: (formData: FormData) => void;
};

export default function LoginForm() {
  const [state, formAction] = useActionState(login, INITIAL_STATE);

  return state.step === "code" ? (
    <CodeStep key={state.sentAt ?? "code"} state={state} formAction={formAction} />
  ) : (
    <EmailStep state={state} formAction={formAction} />
  );
}

function EmailStep({ state, formAction }: StepProps) {
  return (
    <form action={formAction} className="flex flex-col gap-5">
      <div>
        <label htmlFor="email" className="label mb-2 block">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.email}
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "login-error" : undefined}
          className="input"
        />
      </div>

      <ErrorMessage message={state.error} />

      <SubmitButton intent="send" busyLabel="Sending code...">
        Send code <ArrowRight size={16} aria-hidden="true" />
      </SubmitButton>
    </form>
  );
}

function CodeStep({ state, formAction }: StepProps) {
  const [code, setCode] = useState("");

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="email" value={state.email} />

      <p className="text-sm text-ink-2">
        We sent a sign-in code to{" "}
        <span className="font-medium wrap-anywhere text-ink">{state.email}</span>.
      </p>

      <div>
        <label htmlFor="code" className="label mb-2 block">
          Code
        </label>
        <input
          id="code"
          name="code"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]{6,8}"
          minLength={6}
          required
          autoFocus
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 8))}
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "code-hint login-error" : "code-hint"}
          className="input font-mono text-lg tracking-[0.3em]"
        />
        <p id="code-hint" className="mt-2 text-xs text-ink-2">
          Enter the 6 to 8 digit code from the email. You can paste it.
        </p>
      </div>

      {state.notice && (
        <p role="status" className="text-sm text-ok">
          {state.notice}
        </p>
      )}
      <ErrorMessage message={state.error} />

      <SubmitButton intent="verify" busyLabel="Verifying...">
        Verify and sign in <ArrowRight size={16} aria-hidden="true" />
      </SubmitButton>

      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm font-medium">
        <ResendButton />
        <ChangeEmailButton />
      </div>
    </form>
  );
}

function SubmitButton({
  intent,
  busyLabel,
  children,
}: {
  intent: string;
  busyLabel: string;
  children: ReactNode;
}) {
  const { pending, data } = useFormStatus();
  const busy = pending && data?.get("intent") === intent;

  return (
    <button
      type="submit"
      name="intent"
      value={intent}
      disabled={pending}
      className="btn btn-primary"
    >
      {busy ? (
        <>
          <Loader size={16} className="animate-spin" aria-hidden="true" />
          {busyLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

function ResendButton() {
  const [remaining, setRemaining] = useState(RESEND_COOLDOWN_SECONDS);
  const { pending, data } = useFormStatus();
  const resending = pending && data?.get("intent") === "resend";

  useEffect(() => {
    if (remaining <= 0) return;
    const timer = setTimeout(() => setRemaining((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  return (
    <button
      type="submit"
      name="intent"
      value="resend"
      formNoValidate
      disabled={remaining > 0 || pending}
      className="link disabled:cursor-not-allowed disabled:text-ink-2 disabled:no-underline"
    >
      {resending
        ? "Sending..."
        : remaining > 0
          ? `Resend code in ${remaining}s`
          : "Resend code"}
    </button>
  );
}

function ChangeEmailButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      name="intent"
      value="change-email"
      formNoValidate
      disabled={pending}
      className="link inline-flex items-center gap-1.5 disabled:cursor-not-allowed"
    >
      <ArrowLeft size={14} aria-hidden="true" />
      Use a different email
    </button>
  );
}

function ErrorMessage({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p
      id="login-error"
      role="alert"
      className="border border-error bg-sheet px-3 py-2 text-sm text-error"
    >
      {message}
    </p>
  );
}
