import { fakeResponse } from "@/__tests__/fixtures/imgurResponse";
import ImageGridCard from "@/components/ImageGridCard";
import { render, screen, fireEvent } from "@testing-library/react";

let testElement;

const mockItem = fakeResponse.data[0];
const item = {
  account_url: mockItem.account_url,
  comment_count: mockItem.comment_count,
  downs: mockItem.downs,
  favorite_count: mockItem.favorite_count,
  id: mockItem.id,
  images: [
    {
      height: mockItem.images[0].height,
      link: `${mockItem.images[0].link}`,
      width: mockItem.images[0].width,
    },
  ],
  title: mockItem.title,
  ups: mockItem.ups,
  views: mockItem.views,
};
const mockSetArgs = jest.fn();

function renderEle(isLoading = false) {
  render(
    <ImageGridCard
      data-testid="card"
      isLoading={isLoading}
      item={item}
      imgRef={() => {
        null;
      }}
      setRequestArgs={mockSetArgs}
    />
  );
}

describe("ImageGridCard", () => {
  describe("loading skeleton", () => {
    test("render if isLoading=true", () => {
      renderEle(true);

      testElement = document.querySelector(".loading-skeleton");
      expect(testElement).toBeDefined();
    });

    test("don't render if isLoading=false", () => {
      renderEle(false);

      testElement = document.querySelector(".loading-skeleton");
      expect(testElement).toBeNull();
    });
  });

  test("img srcset populated", () => {
    renderEle();
    testElement = screen.getByRole("img");

    expect(testElement.dataset.srcset).toEqual(item.images[0].link);
  });

  test("clicking on card dispatches setRequestArgs", () => {
    renderEle();

    testElement = screen.getByRole("link");
    fireEvent.click(testElement);

    expect(mockSetArgs).toBeCalledTimes(1);
    expect(mockSetArgs).toBeCalledWith({
      filter: false,
      method: "comments",
      selectedItemID: item.id,
    });

    fireEvent.click(testElement);
    expect(mockSetArgs).toBeCalledTimes(2);
    expect(mockSetArgs).toBeCalledWith({
      filter: false,
      method: "comments",
      selectedItemID: item.id,
    });
  });

  describe("card info", () => {
    test("card title displayed", () => {
      renderEle();
      testElement = screen.getByRole("heading", { level: 4 });

      expect(
        item.title.startsWith(testElement.textContent.replace("…", ""))
      ).toBeTruthy();
    });

    test("3 icons displayed", () => {
      renderEle();
      testElement = document.querySelectorAll("svg");

      expect(testElement.length).toEqual(3);
    });
  });
});
