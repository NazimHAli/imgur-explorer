import { Action, State } from "@/state";
import { capitalize } from "@/utils/dataUtils";

function Dropdown(props: {
  options: string[];
  actionArg: string;
  dispatchState: React.Dispatch<Action>;
  requestArgs: State["requestArgs"];
}) {
  const { options, actionArg, dispatchState, requestArgs } = props;

  const handleOnChange = (event: { target: HTMLSelectElement }) => {
    const dispatchArgs: Action = {
      type: "submitSearchRequest",
    };

    if (actionArg === "sort") {
      dispatchArgs["sort"] = event.target.value.toLowerCase();
    } else if (actionArg === "window") {
      dispatchArgs["window"] = event.target.value.toLowerCase();
    }

    dispatchState(dispatchArgs);
  };

  return (
    <div className="dropdown">
      <label htmlFor="drop-down">{capitalize(actionArg)}</label>
      <select
        id="drop-down"
        disabled={actionArg === "window" && requestArgs.sort !== "top"}
        onChange={handleOnChange}
        defaultValue={capitalize(requestArgs.sort)}
      >
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
