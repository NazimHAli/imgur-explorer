import { fakeResponse } from "@/__tests__/fixtures/imgurResponse";
import ImageGridCard from "@/components/ImageGridCard";
import { render, screen } from "@testing-library/react";

describe("ImageGridCard", () => {
  test("ImageGridCard rendered", () => {
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

    render(
      <div data-testid="card">
        <ImageGridCard
          item={item}
          imgRef={() => {
            null;
          }}
          dispatchState={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    );

    const cardImage = screen.getByRole("img");

    expect(cardImage.dataset.srcset).toEqual(item.images[0].link);
  });
});
