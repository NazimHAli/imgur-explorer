import { Action, State } from "@/types";
import { capitalize } from "@/utils/dataUtils";
import { Dispatch, FormEvent } from "react";

function getDispatchArgs(
  actionArg: string,
  event: FormEvent<HTMLSelectElement>
) {
  const dispatchArgs: Action = {
    newSearch: true,
    type: "submitSearchRequest",
  };

  const element = event.target as HTMLSelectElement;
  const displayValue = element.value.toLowerCase();

  if (actionArg === "sort") {
    dispatchArgs.sort = displayValue;
  } else if (actionArg === "window") {
    dispatchArgs.window = displayValue;
  }

  return dispatchArgs;
}

function SearchToolBarDropdown(props: {
  actionArg: string;
  dispatchState: Dispatch<Action>;
  options: string[];
  requestArgs: State["requestArgs"];
}): JSX.Element {
  const { options, actionArg, dispatchState, requestArgs } = props;
  const selectedValue =
    actionArg === "sort"
      ? capitalize(requestArgs.sort)
      : capitalize(requestArgs.window);
  const renderListItems = options.length > 0;

  const handleOnClick = (event: FormEvent<HTMLSelectElement>) => {
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
