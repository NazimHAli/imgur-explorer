import { Action, State } from "@/types";
import { capitalize } from "@/utils/dataUtils";

function getDispatchArgs(
  actionArg: string,
  event: { currentTarget: { getAttribute: (arg0: string) => string } }
) {
  const dispatchArgs: Action = {
    type: "submitSearchRequest",
  };

  dispatchArgs[actionArg] = event.currentTarget
    .getAttribute("value")
    .toLowerCase();

  return dispatchArgs;
}

function SearchToolBarDropdown(props: {
  options: string[];
  actionArg: string;
  dispatchState: React.Dispatch<Action>;
  requestArgs: State["requestArgs"];
}): JSX.Element {
  const { options, actionArg, dispatchState, requestArgs } = props;
  const selectedValue = capitalize(requestArgs[actionArg]);
  const renderListItems = options.length > 0;

  const handleOnClick = (event: {
    currentTarget: { getAttribute: (arg0: string) => string };
  }) => {
    const dispatchArgs: Action = getDispatchArgs(actionArg, event);

    dispatchState(dispatchArgs);
  };

  const listItems = renderListItems && (
    <ul
      id="drop-down"
      className="dropdown__content"
      defaultValue={selectedValue}
    >
      {options.map((item) => (
        <li
          key={item}
          value={item}
          onClick={handleOnClick}
          className={item === selectedValue ? "selected" : ""}
        >
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="dropdown">
      <button className="dropdown__button" disabled={!renderListItems}>
        {capitalize(actionArg)}: {selectedValue}
      </button>
      {listItems}
    </div>
  );
}

export default SearchToolBarDropdown;
