import { ImgurAPI } from "@/services/imgurAPI";
import { handleRespose } from "@/state/ContextHelpers";
import { useGlobalContext } from "@/state/GlobalContext";
import { filterNewResults, filterTags } from "@/utils/dataUtils";
import { lazy, Suspense, useEffect } from "react";

const Explore = lazy(() => import("@/components/Explore"));
const Footer = lazy(() => import("@/components/Footer"));
const Header = lazy(() => import("@/components/Header"));
const ImageGrid = lazy(() => import("@/components/ImageGrid"));
const SearchToolBar = lazy(() => import("@/components/SearchToolBar"));

function App() {
  const { state, setState } = useGlobalContext();
  const showFooter =
    state.finishedLazyLoading || (state.items.length === 0 && !state.isLoading);

  useEffect(() => {
    const method = state.requestArgs.method;

    if (method.length > 0) {
      const imgurClient = ImgurAPI.getInstance(state.requestArgs);
      imgurClient.methodDispatcher(method).then((response) => {
        if (method === "search") {
          response = filterNewResults(response, state);
        } else if (method === "tags") {
          response = { ...response, tags: filterTags(response?.tags) };
        }
        handleRespose(method, setState, response);
      });
    }
  }, [
    state.requestArgs.method,
    state.requestArgs.query,
    state.requestArgs.page,
  ]);

  return (
    <Suspense fallback={<span></span>}>
      <Header />
      <Explore />
      <SearchToolBar />
      <ImageGrid />

      {/* Dynamically render footer */}
      {showFooter && <Footer />}
    </Suspense>
  );
}

export default App;
