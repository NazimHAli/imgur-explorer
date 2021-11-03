import { ImgurAPI } from "@/services/imgurAPI";
import {
  dispatchIdxsToLoad,
  dispatchIsLoading,
  dispatchItems,
  useStore,
} from "@/state/ZuState";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { lazy, memo, Suspense, useEffect, useRef } from "react";

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

  const elementObserverRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(elementObserverRef);
  const isIntersecting = entry?.isIntersecting || false;

  useEffect(() => {
    if (isIntersecting) {
      dispatchIdxsToLoad();
    }
  }, [isIntersecting]);

  return (
    <Suspense fallback={<span></span>}>
      <Header />
      <Explore />
      <SearchToolBar />
      <ImageGrid />
      <span ref={elementObserverRef} className="block w-px h-px" />
      {/* Dynamically render footer */}
      <Footer />
    </Suspense>
  );
}

export default memo(App);
