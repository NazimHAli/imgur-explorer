import { mockedServer } from "@/__tests__/fixtures/mockedServer";
import { initialState } from "@/state/initialState";
import fetchMock from "jest-fetch-mock";

const initialRequestArgs = initialState["requestArgs"];

beforeAll(() => {
  mockedServer.listen();
  fetchMock.doMock();
});

afterAll(() => {
  delete process.env.PUBLIC_IMGUR_CLIENT_ID;
  mockedServer.resetHandlers();
  mockedServer.close();
  fetchMock.disableMocks();
});

describe("test mocked API", () => {
  let api, response;

  const getInst = async () => {
    process.env.PUBLIC_IMGUR_CLIENT_ID = "mockAPI";

    const { ImgurAPI } = await import("@/services/imgurAPI");
    const napi = ImgurAPI.getInstance(initialRequestArgs);
    return napi;
  };

  beforeEach(async () => {
    api = await getInst();
  });

  test("useFakeResponse is false", async () => {
    expect(await api.useFakeResponse).toBeFalsy();
  });

  test("get galleries", async () => {
    response = await api.getGallerySearchResults();
    expect(response.length).toEqual(1);
  });

  test("get user account", async () => {
    response = await api.methodDispatcher("account");
    expect(response.user.name).toEqual("First Last");
  });
});
