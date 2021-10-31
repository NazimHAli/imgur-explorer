import { mockedServer } from "@/__tests__/fixtures/requestHandlers";
import { render } from "@/__tests__/fixtures/test-utils";
import Header from "@/components/Header";
import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

beforeAll(() => {
  mockedServer.listen();
  fetchMock.doMock();
});

afterAll(() => {
  delete process.env.PUBLIC_IMGUR_CLIENT_ID;
  mockedServer.resetHandlers();
  mockedServer.close();
  fetchMock.disableMocks();
});

describe("Header", () => {
  let container, testElement;

  beforeEach(() => {
    process.env.PUBLIC_IMGUR_CLIENT_ID = "mockAPI";
    container = render(<Header />);
    // screen.debug();
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

    test("typing query works", async () => {
      testElement = screen.getByRole("searchbox");
      fireEvent.change(testElement, {
        target: { value: "query 2" },
      });

      expect(testElement.value).toBe("query 2");
    });

    test.skip("submit button works", async () => {
      testElement = screen.getByRole("button");
      fireEvent.change(screen.getByRole("searchbox"), {
        target: { value: "query 3" },
      });
      fireEvent.click(testElement);

      expect(testElement).toBeTruthy();
      expect(container).toHaveBeenCalledWith({});
    });
  });
});
