import { State } from "@/types";

import ExploreGalleries from "./ExploreGalleries";

function Explore(props: { galleryTags: State["galleryTags"] }) {
  const { galleryTags } = props;

  return (
    <div className="explore">
      <ExploreGalleries galleryTags={galleryTags} />
    </div>
  );
}

export default Explore;
