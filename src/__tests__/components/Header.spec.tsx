import { render } from "@/__tests__/fixtures/test-utils";
import Header from "@/components/Header";
import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";

describe("Header", () => {
  let container, testElement;

  beforeEach(() => {
    process.env.PUBLIC_IMGUR_CLIENT_ID = "mockAPI";
    container = render(<Header />);
  });

  test("renders", async () => {
    expect(container).toBeTruthy();
  });

  test("logo displayed", async () => {
    testElement = container.asFragment().querySelector(".header__logo img");

    expect(testElement.alt).toBe("Logo");
    expect(testElement.src).toBe("http://localhost/imgur.svg");
  });

  describe("search box", () => {
    test("form input type = search", async () => {
      testElement = screen.getByRole("searchbox");

      expect(testElement.type).toBe("search");
    });

    test("form default value is set", async () => {
      testElement = screen.getByRole("searchbox");

      expect(testElement.value).toBe("meow");
    });

    test("new query value works", async () => {
      testElement = screen.getByRole("searchbox");
      expect(testElement.value).toBe("meow");

      fireEvent.change(testElement, {
        target: { value: "query 2" },
      });

      expect(testElement.value).toBe("query 2");
    });
  });
});
