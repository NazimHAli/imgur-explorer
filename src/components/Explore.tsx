import ExploreGalleries from "@/components/ExploreGalleries";
import { useGlobalContext } from "@/state/GlobalContext";
import { memo, useEffect } from "react";

function Explore() {
  const { setRequestArgs, state } = useGlobalContext();

  useEffect(() => {
    setRequestArgs({
      filter: false,
      method: "tags",
      newSearch: true,
    });
  }, []);

  return (
    <div className="explore">
      <ExploreGalleries galleryTags={state.galleryTags} />
    </div>
  );
}

export default memo(Explore);
