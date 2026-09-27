import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("hero, SEO meta and key sections render", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Designly AI/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Automate",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      /opengraph-image/,
    );
    for (const id of ["features", "pricing", "faq", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeVisible();
    }
  });

  test("pricing toggle switches to yearly", async ({ page }) => {
    await page.goto("/#pricing");
    await page.getByRole("button", { name: "Yearly" }).click();
    await expect(page.getByText("$14")).toBeVisible();
  });

  test("browser blocks an invalid email before submit", async ({ page }) => {
    await page.goto("/");
    const input = page.getByLabel("Email address");
    await input.scrollIntoViewIfNeeded();
    await input.fill("nope");
    await page.getByRole("button", { name: /join waitlist/i }).click();

    // native validation stopped the submit → field is invalid, form not reset
    await expect(input).toHaveValue("nope");
    const valid = await input.evaluate((el: HTMLInputElement) =>
      el.checkValidity(),
    );
    expect(valid).toBe(false);
  });

  test("server rejects an invalid email with a toast", async ({ page }) => {
    await page.goto("/");
    const input = page.getByLabel("Email address");
    await input.scrollIntoViewIfNeeded();
    await input.fill("nope");

    // disable native validation so the request reaches the Server Action (Zod)
    await input.evaluate((el: HTMLInputElement) => {
      el.form!.noValidate = true;
      el.form!.requestSubmit();
    });

    await expect(page.getByText(/valid email/i)).toBeVisible({
      timeout: 10_000,
    });
  });

  test("blog list and post are reachable", async ({ page }) => {
    await page.goto("/blog");
    const first = page
      .getByRole("link")
      .filter({ has: page.getByRole("heading", { level: 2 }) })
      .first();
    await first.click();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("404 page renders", async ({ page }) => {
    const res = await page.goto("/this-does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByText(/Back home/i)).toBeVisible();
  });

  test("sitemap, robots and rss respond", async ({ request }) => {
    for (const p of ["/sitemap.xml", "/robots.txt", "/feed.xml"]) {
      const r = await request.get(p);
      expect(r.status(), p).toBe(200);
    }
  });
});
