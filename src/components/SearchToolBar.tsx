import SearchToolBarDropdown from "@/components/SearchToolBarDropdown";
import { useStore } from "@/state/ZuState";
import { memo } from "react";
import shallow from "zustand/shallow";

function SearchToolBar(): JSX.Element {
  const { query, sort } = useStore(
    (state) => ({
      query: state.requestArgs.query,
      sort: state.requestArgs.sort,
    }),
    shallow
  );

  // imgur API only allows 'window' options if sort == 'top'
  const enableSort = query.length > 0;
  const enablewindow = enableSort && sort === "top";

  return (
    <div className="search-toolbar">
      {enableSort && (
        <SearchToolBarDropdown
          actionArg="sort"
          options={enableSort ? ["Top", "Viral", "Trending"] : []}
        />
      )}
      {enablewindow && (
        <SearchToolBarDropdown
          actionArg="window"
          options={enablewindow ? ["All", "Day", "Week", "Month", "Year"] : []}
        />
      )}
    </div>
  );
}

export default memo(SearchToolBar);
