import { lazy, Suspense } from "react";

const Explore = lazy(() => import("@/components/Explore"));
const Footer = lazy(() => import("@/components/Footer"));
const Header = lazy(() => import("@/components/Header"));
const ImageGrid = lazy(() => import("@/components/ImageGrid"));
const SearchToolBar = lazy(() => import("@/components/SearchToolBar"));

function App() {
  return (
    <Suspense fallback={<span></span>}>
      <Header />
      <Explore />
      <SearchToolBar />
      <ImageGrid />

      {/* TODO: Investigate why dynamically rendering footer causes full re-render */}
      <Footer />
    </Suspense>
  );
}

export default App;
