import { Action, State } from "@/state";
import "@/styles/component/search-toolbar.scss";
import { Dispatch } from "react";
import Dropdown from "./Dropdown";

function SearchToolBar(props: {
  dispatchState: Dispatch<Action>;
  state: State;
}) {
  const { dispatchState, state } = props;

  // imgur API only allows 'window' options if sort == 'top'
  const enablewindow = state.requestArgs.sort === "top";

  return (
    <div className="search-toolbar">
      <Dropdown
        actionArg="sort"
        options={["Top", "Viral", "Trending"]}
        dispatchState={dispatchState}
        requestArgs={state.requestArgs}
      />
      <Dropdown
        actionArg="window"
        options={enablewindow ? ["All", "Day", "Week", "Month", "Year"] : []}
        dispatchState={dispatchState}
        requestArgs={state.requestArgs}
      />
    </div>
  );
}

export default SearchToolBar;
