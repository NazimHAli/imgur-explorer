import ExploreGalleries from "@/components/ExploreGalleries";
import { dispatchRequestArgs } from "@/state/dispatchHelpers";
import { memo, useEffect } from "react";

function Explore() {
  useEffect(() => {
    dispatchRequestArgs({
      filter: false,
      method: "tags",
      newSearch: true,
    });
  }, []);

  return (
    <div className="explore">
      <ExploreGalleries />
    </div>
  );
}

export default memo(Explore);
