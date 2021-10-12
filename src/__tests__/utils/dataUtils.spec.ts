import { truncateText, updateImageSize } from "../../utils/dataUtils";
import { fakeResponse } from "../fixtures/imgurResponse";

describe("truncateText", () => {
  let text, result;

  test("should truncate sentence", () => {
    text = "Why hello there!";
    result = truncateText(text, 5);
    expect(result.length).toEqual(5);
  });

  test("should truncate white space", () => {
    text = "     Why hello there!";
    result = truncateText(text, 5);
    expect(result.length).toEqual(5);
    expect(result).toBe("    …");
  });
});

describe("updateImageSize", () => {
  test("should update image link", () => {
    const images = fakeResponse.data.slice(0, 2);
    const res = updateImageSize(images);
    expect(res[0].images[0].link).toBe(images[0].images[0].link);
  });
});
