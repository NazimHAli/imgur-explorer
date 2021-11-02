import {
  ObserveElementsInView,
  isElementInView,
} from "@/utils/visibilityUtils";
import { waitFor } from "@testing-library/dom";

let testElement;

function createElement(size: number) {
  document.body.innerHTML = "";
  document.body.setAttribute("height", "1500px");

  const testElement = document.createElement("div");
  testElement.setAttribute("width", `${size}px`);
  testElement.setAttribute("height", `${size}px`);
  testElement.style.position = "absolute";
  testElement.style.bottom = "0";

  document.body.appendChild(testElement);

  return testElement;
}

describe("isElementInView", () => {
  test("false", () => {
    expect(isElementInView(null)).toBeFalsy();
  });

  test("true", () => {
    testElement = createElement(20);
    expect(isElementInView(testElement)).toBeTruthy();
  });
});

describe("ObserveElementsInView", () => {
  let imgObserver, observe, unobserve;

  beforeEach(() => {
    observe = jest.fn();
    unobserve = jest.fn();

    // @ts-ignore
    window.IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
    }));

    imgObserver = new ObserveElementsInView();
  });

  test.skip("unobserve called", async () => {
    testElement = createElement(20);
    imgObserver.observeElements([testElement]);

    window.scrollTo(0, document.body.scrollHeight);
    await waitFor(() => expect(unobserve).toBeCalledTimes(1));
  });

  test("observe called", () => {
    imgObserver.observeElements([createElement(20)]);
    expect(observe).toBeCalledTimes(1);
  });
});
