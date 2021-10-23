import ExploreGalleries from "@/components/ExploreGalleries";
import { State } from "@/utils/types";

function Explore(props: { galleryTags: State["galleryTags"] }) {
  const { galleryTags } = props;

  return (
    <div className="explore">
      <ExploreGalleries galleryTags={galleryTags} />
    </div>
  );
}

export default Explore;
