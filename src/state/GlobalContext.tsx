import { initialState } from "@/state/initialState";
import { TypeGlobalContext, TypeState } from "@/utils/types";
import { createContext, ReactElement, useContext, useState } from "react";

const GlobalContext = createContext<TypeGlobalContext>({
  isLoading: true,
  /* eslint-disable @typescript-eslint/no-empty-function */
  setIsLoading: () => {},
  setState: () => {},
  setRequestArgs: () => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
  state: initialState,
});

function GlobalContextProvider(props: {
  children: ReactElement<any, any>;
}): JSX.Element {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);

  const setRequestArgs: TypeGlobalContext["setRequestArgs"] = (
    requestArgs: TypeState["requestArgs"]
  ) => {
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
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    setState: setState,
    setRequestArgs: setRequestArgs,
    state: state,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {props.children}
    </GlobalContext.Provider>
  );
}

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  return context;
};

export { GlobalContextProvider, useGlobalContext };
