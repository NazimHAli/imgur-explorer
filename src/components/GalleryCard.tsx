import { Item } from "@/state";
import { Ref } from "react";
import { MessageSquare, ThumbsUp, Eye } from "react-feather";

function GalleryCard(props: { item: Item; imgRef: Ref<HTMLImageElement> }) {
  const { imgRef, item } = props;

  const imageInfo = (
    <div className="card_badges">
      <h4 className="card__title">{item?.title}</h4>

      <div className="card_badges_icons">
        <span>
          <ThumbsUp width="15" height="15" />
          {item?.ups}
        </span>
        <span>
          <MessageSquare width="15" height="15" />
          {item?.comment_count}
        </span>
        <span>
          <Eye width="15" height="15" />
          <span>{item?.views}</span>
        </span>
      </div>
    </div>
  );

  return (
    <div className="card_badge_container">
      <span className="img-container">
        <img
          src=""
          alt={item?.title}
          width={item?.images[0]?.width}
          height={item?.images[0]?.height}
          data-srcset={item?.images[0]?.link}
          ref={imgRef}
        />
      </span>
      {imageInfo}
    </div>
  );
}

export default GalleryCard;
