import { ImgurAPI } from "@/services/imgurAPI";
import { initialState } from "@/state/initialState";

describe("ImgurAPI", () => {
  const initialRequestArgs = initialState["requestArgs"];
  let api, res;

  beforeEach(() => {
    global.Headers = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: { test: 100 } }),
      })
    ) as jest.Mock;
  });

  test("request args should match", () => {
    api = ImgurAPI.getInstance(initialRequestArgs);
    expect(api.requestArgs).toEqual(initialRequestArgs);
  });

  test("should use fake response", () => {
    api = ImgurAPI.getInstance(initialRequestArgs);
    expect(api.useFakeResponse).toBeTruthy();
  });

  test("should get gallery results", async () => {
    api = ImgurAPI.getInstance(initialRequestArgs);
    res = await api.getGallerySearchResults();
    expect(res.length).toEqual(60);
  });

  test("should get tags", async () => {
    api = ImgurAPI.getInstance(initialRequestArgs);
    res = await api.methodDispatcher("tags");
    expect(res.galleries.length).toEqual(4);
    expect(res.tags.length).toEqual(88);
  });

  test("has correct account request args", async () => {
    jest.mock("@/services/imgurAPI");
    api = ImgurAPI.getInstance(initialRequestArgs);

    res = await api.methodDispatcher("account");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.imgur.com/3/account/?account_id==0",
      { headers: {}, method: "GET" }
    );
  });

  test.skip("dev", async () => {
    jest.mock("@/services/imgurAPI");
    api = ImgurAPI.getInstance(initialRequestArgs);

    res = await api.methodDispatcher("account");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.imgur.com/3/account/?account_id==0",
      { headers: {}, method: "GET" }
    );
  });
});
