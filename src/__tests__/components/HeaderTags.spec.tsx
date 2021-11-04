import { mockGalleryTags } from "@/__tests__/fixtures/mockGalleryTags";
import { fireEvent, render, screen } from "@/__tests__/fixtures/test-utils";
import HeaderTags from "@/components/HeaderTags";
import { useStore } from "@/state/ZuState";
import { dispatchTags } from "@/state/dispatchHelpers";
import { useEffect } from "react";
import shallow from "zustand/shallow";

let bindedRequestArgs;

function TestComponent() {
  const { requestArgs } = useStore(
    (state) => ({ requestArgs: state.requestArgs }),
    shallow
  );

  useEffect(() => {
    dispatchTags(mockGalleryTags.data);
  }, []);

  bindedRequestArgs = requestArgs;

  return <HeaderTags />;
}

describe("HeaderTags", () => {
  beforeEach(() => {
    render(<TestComponent />);
  });

  test("displays 10 tags", () => {
    expect(screen.getAllByRole("link")).toHaveLength(10);
  });

  test("are clickable", () => {
    expect(bindedRequestArgs.method).toBe("search");

    fireEvent.click(document.querySelector(".header__tags__item"));

    expect(bindedRequestArgs.method).toBe("tagName");
    expect(bindedRequestArgs.query).toBe("");
    expect(bindedRequestArgs.tagName.length).toBeGreaterThan(0);
  });
});
