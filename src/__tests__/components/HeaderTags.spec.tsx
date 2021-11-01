import { mockGalleryTags } from "@/__tests__/fixtures/mockGalleryTags";
import { fireEvent, render, screen } from "@/__tests__/fixtures/test-utils";
import HeaderTags from "@/components/HeaderTags";
import { useGlobalContext } from "@/state/GlobalContext";
import { useEffect } from "react";

let bindedState;

function TestComponent() {
  const { state, setState } = useGlobalContext();

  useEffect(() => {
    // @ts-ignore
    setState((currentState) => {
      return { ...currentState, galleryTags: mockGalleryTags.data };
    });
  }, []);

  bindedState = state;

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
    expect(bindedState.requestArgs.method).toBe("search");

    fireEvent.click(document.querySelector(".header__tags__item"));

    expect(bindedState.requestArgs.method).toBe("tagName");
    expect(bindedState.requestArgs.query).toBe("");
    expect(bindedState.requestArgs.tagName).toBe(
      mockGalleryTags.data.tags[0].name
    );
  });
});
