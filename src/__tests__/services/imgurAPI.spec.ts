import { ImgurAPI } from "@/services/imgurAPI";
import { initialState } from "@/state/initialState";

describe("ImgurAPI", () => {
  const initialRequestArgs = initialState["requestArgs"];
  let api;

  test("should init", () => {
    api = ImgurAPI.getInstance(initialRequestArgs);
    expect(api).toBeTruthy();
  });
});
