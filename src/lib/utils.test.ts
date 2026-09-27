import { cn } from "./utils";

describe("cn", () => {
  it("merges classes and drops falsy values", () => {
    expect(cn("a", false && "b", "c")).toBe("a c");
  });
  it("resolves tailwind conflicts (last wins)", () => {
    expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
  });
});