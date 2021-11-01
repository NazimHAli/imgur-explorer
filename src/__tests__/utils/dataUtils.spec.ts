import { mockItems } from "@/__tests__/fixtures/mockItems";
import * as dataUtils from "@/utils/dataUtils";

let res;

describe("arrToMatrix", () => {
  const images = mockItems.data.slice(0, 10);

  test("creates new array matrix", () => {
    res = dataUtils.arrToMatrix(images, 5);
    expect(res).toHaveLength(2);
    expect(res[0]).toHaveLength(5);
    expect(res[1]).toHaveLength(5);
  });
});

describe("capitalize", () => {
  test.each([
    ["meow", "Meow"],
    ["hello there", "Hello There"],
    ["just Moi", "Just Moi"],
    ["mOO", "MOO"],
  ])("capitalize(%s)", (text, expected) => {
    expect(dataUtils.capitalize(text)).toBe(expected);
  });
});

describe("checkNumberIfFloat", () => {
  test.each([
    [0, false],
    [1, false],
    [1.0, false],
    [1.5, true],
    [1 / 3, true],
  ])("checkNumberIfFloat(%f)", (a, expected) => {
    expect(dataUtils.checkNumberIfFloat(a)).toBe(expected);
  });
});

describe("truncateText", () => {
  let text, result;

  test("should truncate sentence", () => {
    text = "Why hello there!";
    result = dataUtils.truncateText(text, 5);
    expect(result.length).toEqual(5);
  });

  test("should truncate white space", () => {
    text = "     Why hello there!";
    result = dataUtils.truncateText(text, 5);
    expect(result.length).toEqual(5);
    expect(result).toBe("    …");
  });
});

describe("updateImageSize", () => {
  const images = mockItems.data.slice(0, 2);

  test("default behavior sets image size to 'l'", () => {
    res = dataUtils.updateImageSize(images);
    expect(res[0].images[0].link.endsWith("l.jpg")).toBe(true);
  });

  test("sets image size to 'm'", () => {
    res = dataUtils.updateImageSize(images, "m");
    expect(res[0].images[0].link.endsWith("m.jpg")).toBe(true);
  });
});
