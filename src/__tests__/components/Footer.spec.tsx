import { render } from "@/__tests__/fixtures/test-utils";
import Footer from "@/components/Footer";
import { dispatchFinishedLazyLoading } from "@/state/dispatchHelpers";
import { screen } from "@testing-library/react";
import { Suspense, useEffect } from "react";

function TestComponent() {
  useEffect(() => {
    dispatchFinishedLazyLoading(true);
  }, []);

  return (
    <Suspense fallback="<span></span>">
      <Footer />
    </Suspense>
  );
}

describe("Footer", () => {
  beforeEach(() => {
    render(<TestComponent />);
  });

  test("sections displayed", async () => {
    const categories = await screen.findAllByRole("heading", { level: 2 });
    expect(categories.length).toEqual(4);
  });

  test("links rendered", async () => {
    const links = await screen.findAllByRole("link");
    expect(links.length).toEqual(21);
  });
});
