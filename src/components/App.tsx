import { ImgurAPI } from "@/services/imgurAPI";
import { dispatchIsLoading, dispatchItems, useStore } from "@/state/ZuState";
import { lazy, memo, Suspense, useEffect } from "react";

const Explore = lazy(() => import("@/components/Explore"));
const Footer = lazy(() => import("@/components/Footer"));
const Header = lazy(() => import("@/components/Header"));
const ImageGrid = lazy(() => import("@/components/ImageGrid"));
const SearchToolBar = lazy(() => import("@/components/SearchToolBar"));

function App() {
  // const isLoading = useStore((state) => state.isLoading);
  const requestArgs = useStore((state) => state.requestArgs);

  useEffect(() => {
    dispatchIsLoading(true);

    if (requestArgs.method.length > 0) {
      const imgurClient = ImgurAPI.getInstance(requestArgs);
      imgurClient
        .methodDispatcher(requestArgs.method)
        .then((response) => {
          if (requestArgs.method === "search") {
            dispatchItems(response);
          }
        })
        .finally(() => {
          dispatchIsLoading(false);
        });
    } else {
      dispatchIsLoading(false);
    }
  }, []);

  return (
    <Suspense fallback={<span></span>}>
      <Header />
      <Explore />
      <SearchToolBar />
      <ImageGrid />

      {/* Dynamically render footer */}
      <Footer />
    </Suspense>
  );
}

export default memo(App);
