import { render } from "@/__tests__/fixtures/test-utils";
import LoadingAnimation from "@/components/LoadingAnimation";

describe("LoadingAnimation", () => {
  test("loads", () => {
    const el = render(<LoadingAnimation />);
    expect(el.container).toMatchSnapshot();
  });
});
