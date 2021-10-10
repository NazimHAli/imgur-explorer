import { Action, State } from "@/state";
import { capitalize } from "@/utils/dataUtils";

function Dropdown(props: {
  options: string[];
  actionArg: string;
  dispatchState: React.Dispatch<Action>;
  requestArgs: State["requestArgs"];
}): JSX.Element {
  const { options, actionArg, dispatchState, requestArgs } = props;

  const handleOnClick = (event: {
    currentTarget: { getAttribute: (arg0: string) => string };
  }) => {
    const dispatchArgs: Action = getDispatchArgs(actionArg, event);

    dispatchState(dispatchArgs);
  };

  const enableListItems = options.length > 0;
  const listItems = enableListItems && (
    <ul
      id="drop-down"
      className="dropdown__content"
      defaultValue={capitalize(requestArgs[actionArg])}
    >
      {options.map((item) => (
        <li key={item} value={item} onClick={handleOnClick}>
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="dropdown">
      <button className="dropdown__button" disabled={!enableListItems}>
        {capitalize(actionArg)}: {capitalize(requestArgs[actionArg])}
      </button>
      {listItems}
    </div>
  );
}

export default Dropdown;

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
