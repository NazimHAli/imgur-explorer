import { useStore } from "@/state/ZuState";
import { lazy, memo, Suspense } from "react";
import shallow from "zustand/shallow";

const FooterBottom = lazy(() => import("@/components/FooterBottom"));
const FooterRight = lazy(() => import("@/components/FooterRight"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

function Footer() {
  const { finishedLazyLoading } = useStore(
    (state) => ({
      finishedLazyLoading: state.finishedLazyLoading,
    }),
    shallow
  );

  const sectionLinks: string[] = [
    "First Link",
    "Second Link",
    "Third Link",
    "Fourth Link",
  ];

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {!finishedLazyLoading && <span></span>}
      {finishedLazyLoading && (
        <footer className="footer">
          <div className="footer__content">
            <FooterRight />
            <div className="footer__content__sections">
              <FooterSection sectionLinks={sectionLinks} />
              <FooterSection sectionLinks={sectionLinks} />
              <FooterSection sectionLinks={sectionLinks} />
              <FooterSection sectionLinks={sectionLinks} />
            </div>
          </div>
          <FooterBottom />
        </footer>
      )}
    </Suspense>
  );
}

export default memo(Footer);
