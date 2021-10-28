import { ImgurAPI } from "@/services/imgurAPI";
import { initialState } from "@/state/initialState";

describe("ImgurAPI", () => {
  const initialRequestArgs = initialState["requestArgs"];
  let api;

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
    const res = await api.getGallerySearchResults();
    expect(res.length).toEqual(60);
  });

  test("should get tags", async () => {
    api = ImgurAPI.getInstance(initialRequestArgs);
    const res = await api.methodDispatcher("tags");
    expect(res.galleries.length).toEqual(4);
    expect(res.tags.length).toEqual(88);
  });

  test.skip("dev", async () => {
    api = ImgurAPI.getInstance(initialRequestArgs);
    const res = await api.methodDispatcher("tags");
    expect(res.length).toEqual(4);
  });
});
