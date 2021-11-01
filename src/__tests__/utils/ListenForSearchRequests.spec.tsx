import { mockServer } from "@/__tests__/fixtures/mockServer";
import { useGlobalContext } from "@/state/GlobalContext";
import { ListenForSearchRequests } from "@/utils/ListenForSearchRequests";
import fetchMock from "jest-fetch-mock";
import { create, act } from "react-test-renderer";

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

function TestComponent() {
  act(() => {
    const { state, setState, setIsLoading } = useGlobalContext();

    ListenForSearchRequests(state, setIsLoading, setState);
  });

  return <p></p>;
}

describe("ImageGrid", () => {
  let root;

  beforeEach(() => {
    act(() => {
      root = create(<TestComponent />);
    });
  });

  test("mounts", () => {
    expect(root).toBeTruthy();
  });
});
