import React from "react";

export default function BaseImage({ src, id, cRef }) {
  return (
    <img
      id={id}
      data-srcset={src}
      ref={cRef}
      className={"lazy-img item-img"}
    />
  );
}
