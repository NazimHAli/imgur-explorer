import { Action, Item } from "@/types";
import { truncateText } from "@/utils/dataUtils";
import { Dispatch, Ref } from "react";
import { MessageSquare, ThumbsUp, Eye } from "react-feather";

function ImageGridCard(props: {
  dispatchState: Dispatch<Action>;
  imgRef: Ref<HTMLImageElement>;
  item: Item;
}) {
  const { imgRef, item, dispatchState } = props;

  const imageInfo = (
    <div className="card-info">
      <h4 className="card-info__title">{truncateText(item?.title, 20)}</h4>
      <div className="card-info__icons">
        <ThumbsUp width="15" height="15" />
        {item?.ups?.toLocaleString()}

        <MessageSquare width="15" height="15" />
        {item?.comment_count?.toLocaleString()}

        <Eye width="15" height="15" />
        <span>{item?.views?.toLocaleString()}</span>
      </div>
    </div>
  );

  const handleOnClick = (event: { preventDefault: () => void }) => {
    dispatchState({
      requestArgs: {
        filter: false,
        method: "comments",
        selectedItemID: item.id,
      },
      type: "setSearchRequestArgs",
    });
    event.preventDefault();
  };

  const cardEl = (
    <a href="#explore" className="card" onClick={handleOnClick}>
      <span className="card__img">
        <img
          alt={item?.title}
          width={320}
          height={320}
          data-srcset={item?.images[0]?.link}
          ref={imgRef}
        />
      </span>
      {imageInfo}
    </a>
  );

  return cardEl;
}

export default ImageGridCard;
