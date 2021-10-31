import LoadingAnimation from "@/components/LoadingAnimation";

import { render } from "../fixtures/test-utils";

describe("LoadingAnimation", () => {
  test("loads", () => {
    const el = render(<LoadingAnimation />);
    expect(el.container).toMatchSnapshot();
  });
});
