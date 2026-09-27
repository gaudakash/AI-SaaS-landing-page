"use client";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { subscribe } from "@/app/actions/subscribe";
import { Reveal } from "@/components/ui/Reveal";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-white transition hover:brightness-110 disabled:opacity-60"
    >
      {pending ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <>
          Join waitlist <ArrowRight size={16} />
        </>
      )}
    </button>
  );
}

export function Newsletter() {
  const [state, action] = useActionState(subscribe, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!state) return;
    state.ok ? toast.success(state.message) : toast.error(state.message);
    if (state.ok) formRef.current?.reset();
  }, [state]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <Reveal className="rounded-2xl border border-border bg-card p-8 md:flex md:items-center md:justify-between md:p-12">
        <div>
          <h3 className="text-2xl font-semibold">
            Get early access to new features
          </h3>
          <p className="mt-2 text-sm text-muted">
            Join 2,400+ designers. No spam, unsubscribe anytime.
          </p>
        </div>

        <form
          ref={formRef}
          action={action}
          className="mt-6 flex w-full max-w-md gap-2 md:mt-0"
        >
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden
          />
          <input
            type="email"
            name="email"
            required
            placeholder="you@company.com"
            aria-label="Email address"
            className="h-12 flex-1 rounded-md border border-border bg-background px-4 text-sm outline-none focus:border-primary"
          />
          <Submit />
        </form>
      </Reveal>
    </section>
  );
}
