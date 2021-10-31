import { render } from "@/__tests__/fixtures/test-utils";
import LazyLoadingSpinner from "@/components/LazyLoadingSpinner";

describe("LazyLoadingSpinner", () => {
  test("loads", () => {
    const el = render(<LazyLoadingSpinner />);
    expect(el.container).toMatchSnapshot();
  });
});
