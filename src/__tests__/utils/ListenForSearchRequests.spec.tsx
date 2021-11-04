import { mockServer } from "@/__tests__/fixtures/mockServer";
import { useStore } from "@/state/ZuState";
import { dispatchRequestArgs } from "@/state/dispatchHelpers";
import { ListenForSearchRequests } from "@/utils/ListenForSearchRequests";
import { act, render, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { useEffect } from "react";

beforeAll(() => {
  process.env.PUBLIC_IMGUR_CLIENT_ID = "mockAPI";
  mockServer.listen();
  fetchMock.doMock();
});

afterAll(() => {
  delete process.env.PUBLIC_IMGUR_CLIENT_ID;
  mockServer.resetHandlers();
  mockServer.close();
  fetchMock.disableMocks();
});

function TestComponent(props: { method: string }) {
  const { method } = props;

  ListenForSearchRequests();

  useEffect(() => {
    act(() => {
      dispatchRequestArgs({ method: method });
    });
  }, []);

  return <div />;
}

describe("ListenForSearchRequests", () => {
  afterEach(() => {
    useStore.destroy();
  });

  test("method = comments", async () => {
    render(<TestComponent method={"comments"} />);
    await waitFor(() =>
      expect(useStore.getState().selectedItemComments.length).toBeGreaterThan(0)
    );
  });

  test("method = search", async () => {
    render(<TestComponent method={"search"} />);
    await waitFor(() =>
      expect(useStore.getState().items.length).toBeGreaterThan(0)
    );
  });

  test("on mounted calls setIsLoading=true", async () => {
    render(<TestComponent method={"comments"} />);

    await waitFor(() => expect(useStore.getState().isLoading).toBe(true));
  });
});
