import { useReducer, useEffect } from "react";

import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Header from "@/components/Header";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { stateReducer, initialState } from "./state";
import NoResults from "./NoResults";

function App() {
  const [state, dispatchState] = useReducer(stateReducer, initialState);

  /**
   * Dynamically imports the the imgur API class
   * - Constructs search arguments
   * - Dispatches event to update state.items
   *
   * @param args
   */

  const getData = handleGetData(dispatchState, state);

  /**
   * On mounted get initial results
   */

  useEffect(() => {
    console.log("MOUNTED: useEffect");
    // document.body.style.overflow = "hidden";
    dispatchState({ type: "setIsLoading", loading: true });

    if (!state.items.length) {
      getData({ query: "hello" });
    }

    setTimeout(() => {
      dispatchState({ type: "setIsLoading", loading: false });
      // document.body.style.overflow = "";
    }, 1000);
  }, []);

  /**
   * Submit search request for new queries
   */

  useEffect(() => {
    if (state.requestArgs.query.length) {
      getData();
    }
  }, [state.requestArgs.query]);

  return (
    <>
      <Header dispatchState={dispatchState} />
      {state.isLoading && <LoadingAnimation />}
      {state.items.length > 0 && <Gallery state={state} />}
      {!state.items.length && !state.isLoading && <NoResults />}
      <Footer />
    </>
  );
}

export default App;

function handleGetData(dispatchState, state) {
  return (args = {} as any) => {
    dispatchState({ type: "setIsLoading", loading: true });

    import("@/services/imgurAPI").then(async (mod) => {
      const imgurClient = mod.ImgurAPI.getInstance();
      const filter = args.filter || state.requestArgs.filter;
      const page = args.page || state.requestArgs.page;
      const query = args.query || state.requestArgs.query;
      const sort = args.sort || state.requestArgs.sort;
      const newSearch = args.newSearch || state.requestArgs.newSearch;

      await imgurClient
        .submitGallerySearch({
          searchQuery: query,
          pageNumber: page,
          filterImageResults: filter,
          sort: sort,
        })
        .then((response) => {
          dispatchState({
            type: "setItems",
            items: newSearch ? response : state.items.concat(response),
          });
        })
        .finally(() => {
          dispatchState({ type: "setIsLoading", loading: false });
        });
    });
  };
}
