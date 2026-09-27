import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FAQ } from "./FAQ";
import { faqs } from "@/data/faqs";

describe("<FAQ />", () => {
  it("renders every question", () => {
    render(<FAQ />);
    faqs.forEach((f) => expect(screen.getByText(f.q)).toBeInTheDocument());
  });

  it("first answer open by default, others closed", () => {
    render(<FAQ />);
    expect(screen.getByText(faqs[0].a)).toBeInTheDocument();
    expect(screen.queryByText(faqs[1].a)).not.toBeInTheDocument();
  });

  it("opens another question and closes the first", async () => {
    render(<FAQ />);
    await userEvent.click(screen.getByRole("button", { name: faqs[1].q }));
    expect(screen.getByText(faqs[1].a)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: faqs[1].q })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });
});
