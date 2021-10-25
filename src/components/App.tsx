import { GlobalContext } from "@/components/GlobalContext";
import { lazy, Suspense, useContext } from "react";

const Explore = lazy(() => import("@/components/Explore"));
const Footer = lazy(() => import("@/components/Footer"));
const Header = lazy(() => import("@/components/Header"));
const ImageGrid = lazy(() => import("@/components/ImageGrid"));
const SearchToolBar = lazy(() => import("@/components/SearchToolBar"));

function App() {
  const { setRequestArgs, state } = useContext(GlobalContext);

  return (
    <Suspense fallback={<span></span>}>
      <Header />
      <Explore
        setRequestArgs={setRequestArgs}
        galleryTags={state.galleryTags}
      />

      {/* Don't display toolbar for tagName searches */}
      {state.requestArgs.query?.length > 0 && (
        <SearchToolBar setRequestArgs={setRequestArgs} state={state} />
      )}

      <ImageGrid />

      {/* TODO: Investigate why dynamically rendering footer causes full re-render */}
      <Footer />
    </Suspense>
  );
}

export default App;
