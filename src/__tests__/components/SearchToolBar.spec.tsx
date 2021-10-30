import { render } from "@/__tests__/fixtures/test-utils";
import SearchToolBar from "@/components/SearchToolBar";
import userEvent from "@testing-library/user-event";

describe("SearchToolBar", () => {
  let container;

  beforeEach(() => {
    container = render(<SearchToolBar />).container;
  });

  describe("dropdown options", () => {
    let options, selectSort;

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
});
