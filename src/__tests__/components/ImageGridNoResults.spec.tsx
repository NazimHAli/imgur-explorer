import ImageGridNoResults from "@/components/ImageGridNoResults";
import { render } from "@testing-library/react";

describe("ImageGridNoResults", () => {
  test("matches snapshot", () => {
    const container = render(<ImageGridNoResults />);
    expect(container.asFragment()).toMatchSnapshot();
  });
});
