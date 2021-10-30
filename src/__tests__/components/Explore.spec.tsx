import { render } from "@/__tests__/fixtures/test-utils";
import Explore from "@/components/Explore";
import { screen } from "@testing-library/react";

describe("Explore", () => {
  test("text displayed", () => {
    render(<Explore />);
    const el = screen.getByRole("heading");

    expect(el.textContent).toBe("Explore Galleries");
  });
});
