import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { Pricing } from "./Pricing";

describe("<Pricing />", () => {
  it("shows monthly prices by default", () => {
    render(<Pricing />);
    expect(screen.getByText("$17")).toBeInTheDocument();
    expect(screen.getByText("$37")).toBeInTheDocument();
    expect(screen.queryByText("-20%")).not.toBeInTheDocument();
  });

  it("switches to yearly prices with discount badge", async () => {
    render(<Pricing />);
    await userEvent.click(screen.getByRole("button", { name: "Yearly" }));
    expect(screen.getByText("$14")).toBeInTheDocument();
    expect(screen.getByText("$30")).toBeInTheDocument();
    expect(screen.getAllByText("-20%")).toHaveLength(2); // Pro + Team, not Free
  });

  it("free plan shows an info toast instead of checkout", async () => {
    render(<Pricing />);
    const [freeBtn] = screen.getAllByRole("button", { name: /subscribe/i });
    await userEvent.click(freeBtn);
    expect(toast.info).toHaveBeenCalled();
  });
});
