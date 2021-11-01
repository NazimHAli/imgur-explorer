import { act, render, screen } from "@/__tests__/fixtures/test-utils";
import ImageGrid from "@/components/ImageGrid";
import { useGlobalContext } from "@/state/GlobalContext";
import { ListenForSearchRequests } from "@/utils/ListenForSearchRequests";
import { Suspense } from "react";

jest.mock("@/utils/imageGridHelpers");
jest.mock("@/utils/visibilityUtils");
jest.mock("@/utils/useIntersectionObserver");

function TestComponent() {
  act(() => {
    const { state, setState, setIsLoading } = useGlobalContext();
    ListenForSearchRequests(state, setIsLoading, setState);
  });

  return (
    <Suspense fallback={<span></span>}>
      <ImageGrid />
    </Suspense>
  );
}

describe.skip("ImageGrid", () => {
  beforeEach(() => {
    render(<TestComponent />);
  });

  test("should meow", () => {
    screen.debug();
    expect(screen).toBeTruthy();
  });
});
