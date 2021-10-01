import * as React from "react";
import BaseImage from "./BaseImage";

export default function BaseCard({ item }) {
  return (
    <div>
      <ul>
        <li>id: {item.account_url.slice(0, 2)}</li>
        <li>title: {item?.title}</li>
        <li>favs: {item?.favorite_count}</li>
        <img src={item?.images[0]?.link} alt="" />
        {<BaseImage src={item?.images[0]?.link} id={item?.id} />}
      </ul>
    </div>
  );
}
