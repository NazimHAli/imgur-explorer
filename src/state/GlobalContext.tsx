import { initialState } from "@/state/initialState";
import { TypeGlobalContext } from "@/utils/types";
import { createContext, FC, useContext, useState } from "react";

const GlobalContext = createContext<TypeGlobalContext>({
  /* eslint-disable @typescript-eslint/no-empty-function */
  setState: () => {},
  setRequestArgs: () => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
  state: initialState,
});

const GlobalContextProvider: FC = (props) => {
  const [state, setState] = useState(initialState);

  const setRequestArgs = (requestArgs) => {
    setState((currentState) => {
      return {
        ...currentState,
        finishedLazyLoading: false,
        requestArgs: {
          ...currentState.requestArgs,
          ...requestArgs,
        },
      };
    });
  };

  const contextValue: TypeGlobalContext = {
    setState: setState,
    setRequestArgs: setRequestArgs,
    state: state,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {props.children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  return context;
};

export { GlobalContextProvider, useGlobalContext };
