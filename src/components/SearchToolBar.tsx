import SearchToolBarDropdown from "@/components/SearchToolBarDropdown";
import { useStore } from "@/state/ZuState";
import { memo } from "react";
import shallow from "zustand/shallow";

function SearchToolBar(): JSX.Element {
  const { requestArgs } = useStore(
    (state) => ({ requestArgs: state.requestArgs }),
    shallow
  );

  // imgur API only allows 'window' options if sort == 'top'
  const enableSort = requestArgs.query.length > 0;
  const enablewindow = enableSort && requestArgs.sort === "top";

  return (
    <div className="search-toolbar">
      <SearchToolBarDropdown
        actionArg="sort"
        options={enableSort ? ["Top", "Viral", "Trending"] : []}
      />
      <SearchToolBarDropdown
        actionArg="window"
        options={enablewindow ? ["All", "Day", "Week", "Month", "Year"] : []}
      />
    </div>
  );
}

export default memo(SearchToolBar);
