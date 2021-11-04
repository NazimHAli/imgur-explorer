import { useStore } from "@/state/ZuState";
import { dispatchRequestArgs } from "@/state/dispatchHelpers";
import { capitalize } from "@/utils/dataUtils";
import { TypeState } from "@/utils/types";
import { FormEvent } from "react";
import shallow from "zustand/shallow";

function getDispatchArgs(
  actionArg: string,
  event: FormEvent<HTMLSelectElement>
) {
  const dispatchArgs: Partial<TypeState["requestArgs"]> = {
    filter: true,
    method: "search",
    newSearch: true,
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
  options: string[];
}): JSX.Element {
  const { options, actionArg } = props;
  const { requestArgs } = useStore(
    (state) => ({ requestArgs: state.requestArgs }),
    shallow
  );

  const selectedValue =
    actionArg === "sort"
      ? capitalize(requestArgs.sort)
      : capitalize(requestArgs.window);
  const renderListItems = options.length > 0;

  const handleOnClick = (event: FormEvent<HTMLSelectElement>) => {
    const dispatchArgs = getDispatchArgs(actionArg, event);

    dispatchRequestArgs(dispatchArgs);
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
