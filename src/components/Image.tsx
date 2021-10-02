import React from "react";

export default function BaseImage({ src, id, cRef }) {
  return <img id={id} ref={cRef} data-srcset={src} className={"lazy-img item-img"} />;
}
