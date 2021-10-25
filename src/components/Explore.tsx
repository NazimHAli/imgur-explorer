import ExploreGalleries from "@/components/ExploreGalleries";
import { GlobalContext } from "@/state/GlobalContext";
import { useContext, useEffect } from "react";

function Explore() {
  const { setRequestArgs, state } = useContext(GlobalContext);

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

export default Explore;
