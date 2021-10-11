import { render, screen } from "@testing-library/react";
import Card from "../../components/Card";
import { fakeResponse } from "../fixtures/imgurResponse";

describe("Card", () => {
  test("Card rendered", () => {
    const mockItem = fakeResponse.data[0];
    const item = {
      id: mockItem.id,
      account_url: mockItem.account_url,
      images: [
        {
          link: `${mockItem.images[0].link}`,
          width: `${mockItem.images[0].width}`,
          height: `${mockItem.images[0].height}`,
        },
      ],
      ups: mockItem.ups,
      downs: mockItem.downs,
      favorite_count: mockItem.favorite_count,
      comment_count: mockItem.comment_count,
      title: mockItem.title,
    };

    render(
      <div data-testid="card">
        <Card item={item} imgRef={() => {}} />
      </div>
    );

    const cardImage = screen.getByRole("img");

    expect(cardImage.dataset.srcset).toEqual(item.images[0].link);
  });
});
