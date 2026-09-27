import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Toaster } from "sonner";
import { FloatingCTA } from "@/components/ui/FloatingCTA";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { CookieBanner } from "@/components/ui/CookieBanner";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "Designly AI — Automate Intelligence. Accelerate Growth.",
    template: "%s | Designly AI",
  },
  description:
    "AI-powered design assistant that generates, customizes and exports creative assets in seconds.",
  keywords: ["AI design tool", "SaaS", "design automation"],
  openGraph: {
    type: "website",
    url: "https://yourdomain.com",
    title: "Designly AI",
    description: "Automate Intelligence. Accelerate Growth.",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans`}>
        <ThemeProvider>
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster richColors position="bottom-right" />
          <FloatingCTA />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <CookieBanner />
      </body>
    </html>
  );
}
