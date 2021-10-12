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
  const enablewindow = state.requestArgs.sort === "top";

  return (
    <div className="search-toolbar">
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
