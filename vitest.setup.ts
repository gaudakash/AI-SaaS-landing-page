import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

// matchMedia — used by next-themes & useReducedMotion
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false, media: query, onchange: null,
    addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
  })),
});

// IntersectionObserver — used by whileInView / useInView
class IO {
  observe = vi.fn(); unobserve = vi.fn(); disconnect = vi.fn(); takeRecords = vi.fn(() => []);
  root = null; rootMargin = ""; thresholds = [];
}
Object.defineProperty(window, "IntersectionObserver", { writable: true, value: IO });

// ResizeObserver — used by Framer layout animations
Object.defineProperty(window, "ResizeObserver", {
  writable: true,
  value: class { observe = vi.fn(); unobserve = vi.fn(); disconnect = vi.fn(); },
});

// next/image → plain <img> in tests
vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean; fill?: boolean }) => {
    const { priority, fill, ...rest } = props;
    return React.createElement("img", rest);
  },
}));

// sonner → spy instead of rendering toasts
vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn(), info: vi.fn() },
  Toaster: () => null,
}));