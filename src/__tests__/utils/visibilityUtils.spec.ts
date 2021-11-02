import { isElementInView } from "@/utils/visibilityUtils";

function createElement(size: number) {
  document.body.innerHTML = "";
  const testElement = document.createElement("div");

  testElement.setAttribute("width", `${size}px`);
  testElement.setAttribute("height", `${size}px`);

  if (size === 0) {
    testElement.style.position = "absolute";
    testElement.style.bottom = "-100px";
  }

  document.body.append(testElement);
  return testElement;
}

describe("isElementInView", () => {
  let testElement;

  test("false", () => {
    expect(isElementInView(null)).toBeFalsy();
  });

  test("true", () => {
    testElement = createElement(20);
    expect(isElementInView(testElement)).toBeTruthy();
  });
});
