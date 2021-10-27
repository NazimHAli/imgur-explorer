import { useGlobalContext } from "@/state/GlobalContext";
import { lazy, memo, Suspense } from "react";

import { listenForSearchRequests } from "./listenForSearchRequests";

const Explore = lazy(() => import("@/components/Explore"));
const Footer = lazy(() => import("@/components/Footer"));
const Header = lazy(() => import("@/components/Header"));
const ImageGrid = lazy(() => import("@/components/ImageGrid"));
const SearchToolBar = lazy(() => import("@/components/SearchToolBar"));

function App() {
  const { state, setState, setIsLoading } = useGlobalContext();
  listenForSearchRequests(state, setIsLoading, setState);

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
