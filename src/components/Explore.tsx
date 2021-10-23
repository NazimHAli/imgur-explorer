import ExploreGalleries from "@/components/ExploreGalleries";
import { Action, State } from "@/utils/types";
import { Dispatch, useEffect } from "react";

function Explore(props: {
  dispatchState: Dispatch<Action>;
  galleryTags: State["galleryTags"];
}) {
  const { dispatchState, galleryTags } = props;

  useEffect(() => {
    dispatchState({
      method: "tags",
      type: "submitSearchRequest",
      requestArgs: {
        newSearch: true,
        filter: false,
      },
    });
  }, []);

  return (
    <div className="explore">
      <ExploreGalleries galleryTags={galleryTags} />
    </div>
  );
}

export default Explore;
