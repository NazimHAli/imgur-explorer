import ImageGrid from "@/components/ImageGrid";
import { ListenForSearchRequests } from "@/utils/ListenForSearchRequests";
import { act, render, screen } from "@testing-library/react";
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
    ListenForSearchRequests();
  });

  return (
    <Suspense fallback={<span></span>}>
      <ImageGrid />
    </Suspense>
  );
}

describe("ImageGrid", () => {
  let testElement;

  render(<TestComponent />);

  test("on mounted displays loading skeletons", async () => {
    testElement = await screen.findAllByTestId("loading-skeleton");
    expect(testElement).toHaveLength(8);
  });
});
