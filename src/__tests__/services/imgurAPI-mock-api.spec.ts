import { mockServer } from "@/__tests__/fixtures/mockServer";
import { ImgurAPI } from "@/services/imgurAPI";
import { initialState } from "@/state/initialState";
import fetchMock from "jest-fetch-mock";

const initialRequestArgs = initialState["requestArgs"];

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

describe("test mocked API", () => {
  let api, response;

  beforeEach(async () => {
    api = ImgurAPI.getInstance(initialRequestArgs);
  });

  test("useFakeResponse is false", async () => {
    expect(await api.useFakeResponse).toBeFalsy();
  });

  test("get galleries", async () => {
    response = await api.getGallerySearchResults();
    expect(response.length).toEqual(31);
  });

  test("get user account", async () => {
    response = await api.methodDispatcher("account");
    expect(response.user.name).toEqual("First Last");
  });
});
