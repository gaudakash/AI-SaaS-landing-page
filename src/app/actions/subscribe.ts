"use server";
import { z } from "zod";

const schema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export type SubscribeState = { ok: boolean; message: string } | null;

export async function subscribe(
  _prev: SubscribeState,
  formData: FormData
): Promise<SubscribeState> {
  // honeypot — bots fill hidden fields, humans don't
  if (formData.get("company")) return { ok: true, message: "You're on the list!" };

  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0].message };

  const email = parsed.data.email.toLowerCase();

  // dev fallback — no key configured
  if (!process.env.RESEND_API_KEY) {
    console.log("[waitlist] new signup:", email);
    return { ok: true, message: "You're on the list! We'll be in touch soon." };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const audienceId = process.env.RESEND_AUDIENCE_ID;

    // audienceId is optional — newer accounts have a single default audience
    const target = (audienceId ? { email, audienceId } : { email }) as never;

    // 1. already subscribed?
    const existing = await resend.contacts.get(target);
    if (existing.data) {
      return { ok: true, message: "You're already on the list — thanks!" };
    }

    // 2. create the contact
    const { error } = await resend.contacts.create(target);

    if (error) {
      console.error("[resend]", error);

      // race condition / SDK returned "exists" instead of 404 on get
      if (/exist/i.test(error.message)) {
        return { ok: true, message: "You're already on the list — thanks!" };
      }
      if (error.name === "restricted_api_key") {
        return { ok: false, message: "Server misconfigured: API key needs Full access." };
      }
      if (error.name === "not_found") {
        return { ok: false, message: "Server misconfigured: audience not found." };
      }
      return { ok: false, message: "Could not save your email. Please try again." };
    }

    return { ok: true, message: "You're on the list! We'll be in touch soon." };
  } catch (e) {
    console.error("[waitlist]", e);
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}