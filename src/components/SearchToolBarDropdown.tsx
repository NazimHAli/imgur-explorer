import { Action, State } from "@/types";
import { capitalize } from "@/utils/dataUtils";
import { Dispatch } from "react";

function getDispatchArgs(actionArg: string, event) {
  const dispatchArgs: Action = {
    type: "submitSearchRequest",
  };

  dispatchArgs[actionArg] = event.target.value.toLowerCase();

  return dispatchArgs;
}

function SearchToolBarDropdown(props: {
  options: string[];
  actionArg: string;
  dispatchState: Dispatch<Action>;
  requestArgs: State["requestArgs"];
}): JSX.Element {
  const { options, actionArg, dispatchState, requestArgs } = props;
  const selectedValue = capitalize(requestArgs[actionArg]);
  const renderListItems = options.length > 0;

  const handleOnClick = (event: { preventDefault: any; target?: any }) => {
    const dispatchArgs: Action = getDispatchArgs(actionArg, event);

    dispatchState(dispatchArgs);
    event.preventDefault();
  };

  const listItems = renderListItems && (
    <>
      <label htmlFor={actionArg} className="select-none">
        {capitalize(actionArg)}:
      </label>

      <select
        name={actionArg}
        id={actionArg}
        onChange={handleOnClick}
        value={selectedValue}
      >
        {options.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );

  return <div className="search-toolbar__dropdown">{listItems}</div>;
}

export default SearchToolBarDropdown;
