import { GlobalContext } from "@/components/GlobalContext";
import SearchToolBarDropdown from "@/components/SearchToolBarDropdown";
import { useContext } from "react";

function SearchToolBar(): JSX.Element {
  const { setRequestArgs, state } = useContext(GlobalContext);

  // imgur API only allows 'window' options if sort == 'top'
  const enableSort = state.requestArgs.query.length > 0;
  const enablewindow = enableSort && state.requestArgs.sort === "top";

  return (
    <div className="search-toolbar">
      <SearchToolBarDropdown
        actionArg="sort"
        options={enableSort ? ["Top", "Viral", "Trending"] : []}
        setRequestArgs={setRequestArgs}
        requestArgs={state.requestArgs}
      />
      <SearchToolBarDropdown
        actionArg="window"
        options={enablewindow ? ["All", "Day", "Week", "Month", "Year"] : []}
        setRequestArgs={setRequestArgs}
        requestArgs={state.requestArgs}
      />
    </div>
  );
}

export default SearchToolBar;
