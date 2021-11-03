import { dispatchIdxsToLoad } from "@/state/ZuState";
import { ListenForSearchRequests } from "@/utils/ListenForSearchRequests";
import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { lazy, memo, Suspense, useEffect, useRef } from "react";

const Explore = lazy(() => import("@/components/Explore"));
const Footer = lazy(() => import("@/components/Footer"));
const Header = lazy(() => import("@/components/Header"));
const ImageGrid = lazy(() => import("@/components/ImageGrid"));
const SearchToolBar = lazy(() => import("@/components/SearchToolBar"));

function App() {
  ListenForSearchRequests();

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
