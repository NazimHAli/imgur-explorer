import { mockItems } from "@/__tests__/fixtures/mockItems";
import { truncateText, updateImageSize } from "@/utils/dataUtils";

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
  let res;
  const images = mockItems.data.slice(0, 2);

  test("default behavior sets image size to 'l'", () => {
    res = updateImageSize(images);
    expect(res[0].images[0].link.endsWith("l.jpg")).toBe(true);
  });

  test("sets image size to 'm'", () => {
    res = updateImageSize(images, "m");
    expect(res[0].images[0].link.endsWith("m.jpg")).toBe(true);
  });
});
