import Dropdown from "./Dropdown";
import "@/styles/component/search-toolbar.scss";

function SearchToolBar(props: { dispatchState: any; state: any }) {
  const { dispatchState, state } = props;

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
        options={["All", "Day", "Week", "Month", "Year"]}
        dispatchState={dispatchState}
        requestArgs={state.requestArgs}
      />
    </div>
  );
}

export default SearchToolBar;
