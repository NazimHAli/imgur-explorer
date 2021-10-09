import { Item } from "@/state";
import { Ref } from "react";

function Card(props: { item: Item; imgRef: Ref<HTMLImageElement> }) {
  return (
    <div className="card">
      <img
        src=""
        alt=""
        data-srcset={props.item?.images[0]?.link}
        ref={props.imgRef}
      />
      <span className="info">
        <h3>{props.item?.title}</h3>
        <p>User: {props.item?.account_url}</p>
        <p>Favourites: {props.item?.favorite_count}</p>
        <p>Comments: {props.item?.comment_count}</p>
        <p>
          Ups: {props.item?.ups} Downs: {props.item?.downs}
        </p>
      </span>
    </div>
  );
}

export default Card;
