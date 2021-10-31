import LazyLoadingSpinner from "@/components/LazyLoadingSpinner";

import { render } from "../fixtures/test-utils";

describe("LazyLoadingSpinner", () => {
  test("loads", () => {
    const el = render(<LazyLoadingSpinner />);
    expect(el.container).toMatchSnapshot();
  });
});
