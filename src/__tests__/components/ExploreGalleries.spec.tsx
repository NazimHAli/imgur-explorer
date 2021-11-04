import { mockTags } from "@/__tests__/fixtures/mockTags";
import { render } from "@/__tests__/fixtures/test-utils";
import ExploreGalleries from "@/components/ExploreGalleries";
import { dispatchTags } from "@/state/ZuState";
import { screen } from "@testing-library/react";

describe("ExploreGalleries", () => {
  let galleries;

  test("zero galleries displayed", () => {
    render(<ExploreGalleries />);

    expect(document.querySelector(".explore__galleries").innerHTML).toBe("");
  });

  test("4 galleries displayed", () => {
    dispatchTags(mockTags);
    render(<ExploreGalleries />);

    galleries = screen.getAllByRole("link");
    expect(galleries.length).toEqual(mockTags.galleries.length);
  });

  test("gallery titles displayed", () => {
    dispatchTags(mockTags);
    render(<ExploreGalleries />);

    galleries = screen.getAllByRole("link");

    galleries.forEach((gallery, idx) => {
      const desc = gallery.querySelector("p").textContent;
      const title = gallery.firstChild.textContent;

      expect(desc).toBe(mockTags.galleries[idx].description);
      expect(title).toEqual(mockTags.galleries[idx].name);
    });

    expect(galleries.length).toEqual(mockTags.galleries.length);
  });
});
