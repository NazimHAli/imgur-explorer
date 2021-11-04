import { mockServer } from "@/__tests__/fixtures/mockServer";
import { dispatchRequestArgs, useStore } from "@/state/ZuState";
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

const setIsLoading = jest.fn();
let bindRequestArgs;

function TestComponent(props: { method: string }) {
  const { method } = props;
  const requestArgs = useStore((state) => state.requestArgs);

  act(() => {
    ListenForSearchRequests();
  });

  useEffect(() => {
    act(() => {
      if (method !== "search" && requestArgs.method === "search") {
        dispatchRequestArgs({ method: method });
      }
    });
  }, []);

  bindRequestArgs = requestArgs;

  return <div />;
}

describe("ListenForSearchRequests", () => {
  test.todo("Update tests below to validate methods");

  test("method = comments", async () => {
    render(<TestComponent method={"comments"} />);
    await waitFor(() => expect(setIsLoading).nthCalledWith(1, true));
    await waitFor(() => expect(setIsLoading).nthCalledWith(2, false));
  });

  test("method = search", () => {
    render(<TestComponent method={"search"} />);
    expect(bindRequestArgs).toBeDefined();
  });

  test("on mounted calls setIsLoading=true", () => {
    render(<TestComponent method={"search"} />);
    expect(setIsLoading).nthCalledWith(1, true);
  });
});
