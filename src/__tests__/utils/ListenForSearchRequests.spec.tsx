import { mockServer } from "@/__tests__/fixtures/mockServer";
import { useGlobalContext } from "@/state/GlobalContext";
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
const setState = jest.fn();
let bindState;

function TestComponent(props: { method: string }) {
  const { method } = props;
  const { setRequestArgs, state } = useGlobalContext();

  act(() => {
    ListenForSearchRequests(state, setIsLoading, setState);
  });

  useEffect(() => {
    act(() => {
      if (method !== "search" && state.requestArgs.method === "search") {
        setRequestArgs({ method: method });
      }
    });
  }, []);

  bindState = state;

  return <div />;
}

describe("ListenForSearchRequests", () => {
  let root;

  test("method = comments", async () => {
    root = render(<TestComponent method={"comments"} />);
    await waitFor(() => expect(setState).toBeCalledTimes(1));
  });

  test("method = search", () => {
    root = render(<TestComponent method={"search"} />);
    expect(root).toBeTruthy();
    expect(bindState).toBeDefined();
  });

  test("on mounted calls setIsLoading=true", () => {
    render(<TestComponent method={"search"} />);
    expect(setIsLoading).nthCalledWith(1, true);
  });
});
