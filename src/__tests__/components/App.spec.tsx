import { mockServer } from "@/__tests__/fixtures/mockServer";
import App from "@/components/App";
import { useGlobalContext } from "@/state/GlobalContext";
import { act, render, screen } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

jest.mock("@/utils/imageGridHelpers");
jest.mock("@/utils/visibilityUtils");
jest.mock("@/utils/useIntersectionObserver");

beforeAll(() => {
  mockServer.listen();
  fetchMock.doMock();
});

afterAll(() => {
  delete process.env.PUBLIC_IMGUR_CLIENT_ID;
  mockServer.resetHandlers();
  mockServer.close();
  fetchMock.disableMocks();
});

let bindState, bindSet;

function TestComponent() {
  act(() => {
    const { state, setState } = useGlobalContext();
    bindState = state;
    bindSet = setState;
  });

  return <App />;
}

describe("App", () => {
  beforeEach(() => {
    render(<TestComponent />);
  });

  test("mounts", () => {
    screen.queryByRole("button");
    expect(bindState).toBeDefined();
    expect(bindSet).toBeDefined();
  });
});
