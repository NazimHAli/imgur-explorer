import ImageGrid from "@/components/ImageGrid";
import { useGlobalContext } from "@/state/GlobalContext";
import { ListenForSearchRequests } from "@/utils/ListenForSearchRequests";
import { act, render } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { Suspense } from "react";

jest.mock("@/utils/imageGridHelpers");
jest.mock("@/utils/visibilityUtils");
jest.mock("@/utils/useIntersectionObserver");

beforeAll(() => {
  fetchMock.doMock();
});

afterAll(() => {
  fetchMock.disableMocks();
});

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

describe("ImageGrid", () => {
  beforeEach(() => {
    render(<TestComponent />);
  });

  test("mounts", () => {
    expect(document.querySelector(".grid-viewport")).toBeDefined();
  });
});
