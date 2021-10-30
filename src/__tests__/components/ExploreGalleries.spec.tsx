import { mockTags } from "@/__tests__/fixtures/tags";
import { render } from "@/__tests__/fixtures/test-utils";
import ExploreGalleries from "@/components/ExploreGalleries";
import { screen } from "@testing-library/react";

describe("ExploreGalleries", () => {
  let galleries;

  test("zero galleries displayed", () => {
    render(
      <ExploreGalleries
        galleryTags={{
          galleries: [],
          tags: [],
        }}
      />
    );

    expect(document.querySelector(".explore__galleries").innerHTML).toBe("");
  });

  test("4 galleries displayed", () => {
    render(<ExploreGalleries galleryTags={mockTags} />);

    galleries = screen.getAllByRole("link");
    expect(galleries.length).toEqual(mockTags.galleries.length);
  });

  test("gallery titles displayed", () => {
    render(<ExploreGalleries galleryTags={mockTags} />);

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
