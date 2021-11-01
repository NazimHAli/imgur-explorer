import { render } from "@/__tests__/fixtures/test-utils";
import Header from "@/components/Header";
import { useGlobalContext } from "@/state/GlobalContext";
import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import { useEffect } from "react";

let requestArgs, testElement, container;

function TestComponent(props: { setEmptyQuery: boolean }) {
  const { setRequestArgs, state } = useGlobalContext();
  const { setEmptyQuery } = props;

  useEffect(() => {
    if (setEmptyQuery) {
      setRequestArgs({
        method: "search",
        query: "",
      });
    }
  }, []);

  useEffect(() => {
    requestArgs = state.requestArgs;
  }, [state.requestArgs.query]);

  return <Header />;
}

describe("Header", () => {
  describe("renders", () => {
    beforeEach(() => {
      process.env.PUBLIC_IMGUR_CLIENT_ID = "mockAPI";
      container = render(<TestComponent setEmptyQuery={false} />);
    });

    test("renders", () => {
      expect(container).toBeTruthy();
    });

    test("logo displayed", () => {
      testElement = container.container.querySelector(".header__logo img");

      expect(testElement.alt).toBe("Logo");
      expect(testElement.src).toBe("http://localhost/imgur.svg");
    });
  });

  describe("search box - with query", () => {
    beforeEach(() => {
      process.env.PUBLIC_IMGUR_CLIENT_ID = "mockAPI";
      container = render(<TestComponent setEmptyQuery={false} />);
    });

    test("input type = search", () => {
      testElement = screen.getByRole("searchbox");

      expect(testElement.type).toBe("search");
    });

    test("has default value", () => {
      testElement = screen.getByRole("searchbox");

      expect(testElement.value).toBe("meow");
    });

    test("can modify query", () => {
      testElement = screen.getByRole("searchbox");
      expect(testElement.value).toBe("meow");

      fireEvent.change(testElement, {
        target: { value: "query 2" },
      });

      expect(testElement.value).toBe("query 2");
    });

    test("requestArgs updates query", () => {
      testElement = screen.getByRole("searchbox");

      fireEvent.change(testElement, {
        target: { value: "query 2" },
      });
      fireEvent.click(screen.getByRole("button"));

      expect(requestArgs.query).toBe("query 2");
    });
  });

  describe("search box - without query", () => {
    beforeEach(() => {
      render(<TestComponent setEmptyQuery={true} />);
    });

    test("empty query set", () => {
      testElement = screen.getByRole("searchbox");
      expect(testElement.value).toBe("");
    });
  });
});
