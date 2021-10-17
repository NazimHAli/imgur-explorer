import { State } from "@/types";

import ExploreGalleries from "./ExploreGalleries";
import ExploreTags from "./ExploreTags";

function Explore(props: {
  dispatchState: any;
  galleryTags: State["galleryTags"];
}) {
  const { dispatchState, galleryTags } = props;

  return (
    <div className="explore">
      <ExploreTags dispatchState={dispatchState} galleryTags={galleryTags} />
      <ExploreGalleries galleryTags={galleryTags} />
    </div>
  );
}

export default Explore;
