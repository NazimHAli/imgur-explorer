import { act, render } from "@/__tests__/fixtures/test-utils";
import SearchToolBar from "@/components/SearchToolBar";
import { useGlobalContext } from "@/state/GlobalContext";
import userEvent from "@testing-library/user-event";
import { useEffect } from "react";

function TestComponent() {
  const { setRequestArgs } = useGlobalContext();

  useEffect(() => {
    act(() => {
      setRequestArgs({ query: "" });
    });
  }, []);

  return <SearchToolBar />;
}

describe("SearchToolBar", () => {
  let container;

  describe("dropdown options", () => {
    let options, selectSort;

    beforeEach(() => {
      container = render(<SearchToolBar />).container;
    });

    test("sort options selectable", () => {
      selectSort = container.querySelector("#sort");

      options = ["Viral", "Trending", "Top"];
      options.forEach((option) => {
        userEvent.selectOptions(selectSort, option);
        expect(selectSort.value).toBe(option);
      });
    });

    test("window options selectable", () => {
      selectSort = container.querySelector("#window");

      options = ["Year", "Month", "Week", "Day"];
      options.forEach((option) => {
        userEvent.selectOptions(selectSort, option);
        expect(selectSort.value).toBe(option);
      });
    });
  });

  describe("empty query", () => {
    beforeAll(() => {
      container = render(<TestComponent />).container;
    });

    test("sort options not displayed", () => {
      expect(container.querySelector("#sort")).toBeNull();
    });

    test("window options not displayed", () => {
      expect(container.querySelector("#window")).toBeNull();
    });
  });
});
