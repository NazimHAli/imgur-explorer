import { mockItems } from "@/__tests__/fixtures/mockItems";
import { mockTags } from "@/__tests__/fixtures/mockTags";
import { initialState } from "@/state/initialState";
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
    ["", ""],
    ["meow", "Meow"],
    ["hello there", "Hello There"],
    ["just Moi", "Just Moi"],
    ["mOO", "MOO"],
  ])("capitalize(%s)", (text, expected) => {
    expect(dataUtils.capitalize(text)).toBe(expected);
  });
});

describe("extractImageResults", () => {
  test("no items", () => {
    expect(dataUtils.extractImageResults([])).toEqual([]);
  });
});

describe("genRandomColor", () => {
  test.each([[0], [1], [2]])("%# random HEX color", () => {
    expect(dataUtils.genRandomColor().length).toBeGreaterThan(2);
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

describe("getDateString", () => {
  test.each([[0], [1000000000], [1100000000]])("getDateString(%f)", (a) => {
    const dtString = dataUtils.getDateString(a);
    const isValidDate =
      Object.prototype.toString.call(new Date(dtString)) === "[object Date]";

    expect(isValidDate).toBeTruthy();
  });
});

describe("getSelectedItem", () => {
  test("gets correct item from list", () => {
    expect(dataUtils.getSelectedItem("0ZQ9e7q", mockItems.data).id).toBe(
      mockItems.data[0].id
    );
  });
});

describe("filterNewResults", () => {
  let newState;

  test("with default settings", () => {
    expect(
      dataUtils.filterNewResults(mockItems.data, initialState)
    ).toHaveLength(60);
  });

  test("filter=false", () => {
    newState = {
      ...initialState,
      requestArgs: { ...initialState.requestArgs, filter: false },
    };

    expect(dataUtils.filterNewResults(mockItems.data, newState)).toHaveLength(
      60
    );
  });

  test("newSearch=false", () => {
    newState = {
      ...initialState,
      items: [0, 1, 2],
      requestArgs: { ...initialState.requestArgs, newSearch: false },
    };

    expect(dataUtils.filterNewResults(mockItems.data, newState)).toHaveLength(
      63
    );
  });
});

describe("filterTags", () => {
  test.each([1, 5, 10])("filterTags(%d)", (input) => {
    expect(
      dataUtils.filterTags(mockTags.tags.slice(0, 20), input)
    ).toHaveLength(input);
  });
});

describe("selectRandomItems", () => {
  test.each([1, 2, 3])("selectRandomItems(%d)", (input) => {
    expect(
      dataUtils.selectRandomItems(mockTags.tags.slice(0, 20), input)
    ).toHaveLength(input);
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
