import { subscribe } from "./subscribe";

const form = (fields: Record<string, string>) => {
  const fd = new FormData();
  Object.entries(fields).forEach(([k, v]) => fd.append(k, v));
  return fd;
};

describe("subscribe action", () => {
  beforeEach(() => {
    delete process.env.RESEND_API_KEY; // force dev-fallback branch (no network)
    vi.spyOn(console, "log").mockImplementation(() => {});
  });
  afterEach(() => vi.restoreAllMocks());

  it("rejects an invalid email", async () => {
    const res = await subscribe(null, form({ email: "not-an-email" }));
    expect(res).toEqual({ ok: false, message: "Please enter a valid email address" });
  });

  it("accepts a valid email", async () => {
    const res = await subscribe(null, form({ email: "  Jane@Example.com " }));
    expect(res?.ok).toBe(true);
    expect(console.log).toHaveBeenCalledWith("[waitlist] new signup:", "jane@example.com");
  });

  it("silently accepts bots that fill the honeypot", async () => {
    const res = await subscribe(null, form({ email: "bot@spam.com", company: "ACME" }));
    expect(res?.ok).toBe(true);
    expect(console.log).not.toHaveBeenCalled(); // never reached the save step
  });
});