import { Item } from "@/state";
import { Ref } from "react";

function Card(props: { item: Item; imgRef: Ref<HTMLImageElement> }) {
  const { item } = props;

  return (
    <div className="card">
      <img
        src=""
        alt={item?.title}
        width={item?.images[0]?.width}
        height={item?.images[0]?.height}
        data-srcset={item?.images[0]?.link}
        ref={props.imgRef}
      />
      <span className="info">
        <h3>{item?.title}</h3>
        <p>User: {item?.account_url}</p>
        <p>Favourites: {item?.favorite_count}</p>
        <p>Comments: {item?.comment_count}</p>
        <p>
          Ups: {item?.ups} Downs: {item?.downs}
        </p>
      </span>
    </div>
  );
}

export default Card;
