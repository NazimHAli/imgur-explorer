import { Item } from "@/types";
import { truncateText } from "@/utils/dataUtils";
import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  Ref,
  SetStateAction,
} from "react";
import { MessageSquare, ThumbsUp, Eye } from "react-feather";

function ImageGridCard(props: {
  item: Item;
  imgRef: Ref<HTMLImageElement>;
  setSelectedCard:
    | Dispatch<
        SetStateAction<
          ReactElement<any, string | JSXElementConstructor<any>> | undefined
        >
      >
    | Dispatch<SetStateAction<undefined>>;
}) {
  const { imgRef, item, setSelectedCard } = props;

  const imageInfo = (
    <div className="card-info">
      <h4 className="card-info__title">{truncateText(item?.title, 20)}</h4>
      <div className="card-info__icons">
        <span>
          <ThumbsUp width="15" height="15" />
          {item?.ups?.toLocaleString()}
        </span>
        <span>
          <MessageSquare width="15" height="15" />
          {item?.comment_count?.toLocaleString()}
        </span>
        <span>
          <Eye width="15" height="15" />
          <span>{item?.views?.toLocaleString()}</span>
        </span>
      </div>
    </div>
  );

  const handleOnClick = (event: { preventDefault: () => void }) => {
    setSelectedCard(cardEl);
    event.preventDefault();
  };

  const cardEl = (
    <a href="" className="card" onClick={handleOnClick}>
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
