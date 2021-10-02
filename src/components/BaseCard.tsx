import * as React from "react";

const BaseImage = React.lazy(() => import("./BaseImage"));

export default function BaseCard({ item, cRef }) {
  return (
    <div>
      <ul>
        <li>id: {item.account_url.slice(0, 2)}</li>
        <li>title: {item?.title}</li>
        <li>favs: {item?.favorite_count}</li>
        {<BaseImage src={item?.images[0]?.link} id={item?.id} cRef={cRef} />}
      </ul>
    </div>
  );
}
