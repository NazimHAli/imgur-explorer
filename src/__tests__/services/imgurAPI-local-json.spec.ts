import { ImgurAPI } from "@/services/imgurAPI";
import { initialState } from "@/state/initialState";
import fetchMock from "jest-fetch-mock";

const initialRequestArgs = initialState["requestArgs"];

describe("test hardcoded JSON responses", () => {
  let api, response;

  beforeAll(() => {
    delete process.env.PUBLIC_IMGUR_CLIENT_ID;
    fetchMock.doMock();
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });

  test("initial request args are correct", () => {
    api = ImgurAPI.getInstance(initialRequestArgs);
    expect(api.requestArgs).toEqual(initialRequestArgs);
  });

  test("useFakeResponse is true", async () => {
    api = ImgurAPI.getInstance(initialRequestArgs);
    expect(await api.useFakeResponse).toBeTruthy();
  });

  test("should get gallery results", async () => {
    api = ImgurAPI.getInstance(initialRequestArgs);
    response = await api.getGallerySearchResults();
    expect(response.length).toEqual(60);
  });

  test("should get tags", async () => {
    api = ImgurAPI.getInstance(initialRequestArgs);
    response = await api.methodDispatcher("tags");
    expect(response.galleries.length).toEqual(4);
    expect(response.tags.length).toEqual(88);
  });
});
