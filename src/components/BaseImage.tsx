import React from "react";

export default function BaseImage({ src, id }) {
  return <img id={id} data-srcset={src} className={"lazy-img item-img"} />;
}
