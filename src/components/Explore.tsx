import { State } from "@/types";
import "@/styles/component/explore-galleries.scss";

import ExploreTags from "./ExploreTags";
import ExploreGalleries from "./ExploreGalleries";

function Explore(props: {
  dispatchState: any;
  galleryTags: State["galleryTags"];
}) {
  const { dispatchState, galleryTags } = props;

  return (
    <div className="explore-galleries">
      <ExploreTags dispatchState={dispatchState} galleryTags={galleryTags} />
      <ExploreGalleries galleryTags={galleryTags} />
    </div>
  );
}

export default Explore;
