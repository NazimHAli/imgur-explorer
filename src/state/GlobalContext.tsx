import { ImgurAPI } from "@/services/imgurAPI";
import { handleRespose } from "@/state/ContextHelpers";
import { initialState } from "@/state/initialState";
import { State, TypeGlobalContext } from "@/utils/types";
import { createContext, FC, useEffect, useState } from "react";

export const GlobalContext = createContext<TypeGlobalContext>({
  /* eslint-disable @typescript-eslint/no-empty-function */
  setRequestArgs: () => {},
  /* eslint-enable @typescript-eslint/no-empty-function */
  state: initialState,
});

const GlobalContextProvider: FC = (props) => {
  const [state, setState] = useState(initialState);

  const setRequestArgs = (requestArgs: State["requestArgs"]) => {
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
    setRequestArgs: setRequestArgs,
    state: state,
  };

  useEffect(() => {
    const method = state.requestArgs.method;

    if (method.length > 0) {
      const imgurClient = ImgurAPI.getInstance(state.requestArgs);
      imgurClient.methodDispatcher(method).then((response) => {
        handleRespose(method, setState, response);
      });
    }
  }, [
    state.requestArgs.method,
    state.requestArgs.query,
    state.requestArgs.page,
  ]);

  return (
    <GlobalContext.Provider value={contextValue}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
