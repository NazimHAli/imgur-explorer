import { Action, State } from "@/types";
import "@/styles/component/search-toolbar.scss";
import { Dispatch } from "react";
import SearchToolBarDropdown from "./SearchToolBarDropdown";

function SearchToolBar(props: {
  dispatchState: Dispatch<Action>;
  state: State;
}): JSX.Element {
  const { dispatchState, state } = props;

  // imgur API only allows 'window' options if sort == 'top'
  const enableSort = state.requestArgs.query.length > 0;
  const enablewindow = enableSort && state.requestArgs.sort === "top";

  return (
    <div className="container mx-auto my-4 flex flex-row gap-1 md:justify-end">
      <SearchToolBarDropdown
        actionArg="sort"
        options={enableSort ? ["Top", "Viral", "Trending"] : []}
        dispatchState={dispatchState}
        requestArgs={state.requestArgs}
      />
      <SearchToolBarDropdown
        actionArg="window"
        options={enablewindow ? ["All", "Day", "Week", "Month", "Year"] : []}
        dispatchState={dispatchState}
        requestArgs={state.requestArgs}
      />
    </div>
  );
}

export default SearchToolBar;
