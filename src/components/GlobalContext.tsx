import { ImgurAPI } from "@/services/imgurAPI";
import { initialState } from "@/utils/state";
import { Item, State, TypeGlobalContext } from "@/utils/types";
import { createContext, FC, useEffect, useState } from "react";

export const GlobalContext = createContext<TypeGlobalContext>({
  addItems: () => {},
  setRequestArgs: () => {},
  state: initialState,
});

const GlobalContextProvider: FC = (props) => {
  const [state, setState] = useState(initialState);

  const addItems = (items: Item[]) => {
    setState((currentState) => {
      return {
        ...currentState,
        items: currentState.requestArgs.newSearch
          ? items
          : currentState.items.concat(items),
      };
    });
  };

  const addTags = (response) => {
    setState((currentState) => {
      return { ...currentState, galleryTags: response };
    });
  };

  const addComments = (response) => {
    setState((currentState) => {
      return { ...currentState, selectedItemComments: response };
    });
  };

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
    addItems: addItems,
    setRequestArgs: setRequestArgs,
    state: state,
  };

  useEffect(() => {
    const method = state.requestArgs.method;

    if (method.length > 0) {
      const imgurClient = ImgurAPI.getInstance(state.requestArgs);
      imgurClient.methodDispatcher(method).then((response) => {
        if (method === "search") {
          addItems(response);
        } else if (method === "tags") {
          addTags(response);
        } else if (method === "comments") {
          addComments(response);
        }
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
