import ExploreGalleries from "@/components/ExploreGalleries";
import { State } from "@/utils/types";
import { useEffect } from "react";

function Explore(props: { setRequestArgs; galleryTags: State["galleryTags"] }) {
  const { setRequestArgs, galleryTags } = props;

  useEffect(() => {
    setRequestArgs({
      filter: false,
      method: "tags",
      newSearch: true,
    });
  }, []);

  return (
    <div className="explore">
      <ExploreGalleries galleryTags={galleryTags} />
    </div>
  );
}

export default Explore;
