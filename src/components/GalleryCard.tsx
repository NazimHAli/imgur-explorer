import { Item } from "@/state";
import { Ref } from "react";

function itemCounts(item: Item) {
  return (
    <>
      <span>Ups:</span> {item?.ups} <span>Downs:</span> {item?.downs}
    </>
  );
}

function GalleryCard(props: { item: Item; imgRef: Ref<HTMLImageElement> }) {
  const { imgRef, item } = props;

  return (
    <div className="card">
      <img
        src=""
        alt={item?.title}
        width={item?.images[0]?.width}
        height={item?.images[0]?.height}
        data-srcset={item?.images[0]?.link}
        ref={imgRef}
      />
      <span className="card__info">
        <h3 className="card__title">{item?.title}</h3>
        <ol className="card__counts">
          <li>
            <span>User</span> {item?.account_url}
          </li>
          <li>
            <span>Faves</span> {item?.favorite_count}
          </li>
          <li>
            <span>Comments</span> {item?.comment_count}
          </li>
          <li>{itemCounts(item)}</li>
        </ol>
      </span>
    </div>
  );
}

export default GalleryCard;
