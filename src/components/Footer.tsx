import { lazy, memo, Suspense } from "react";

const FooterBottom = lazy(() => import("@/components/FooterBottom"));
const FooterRight = lazy(() => import("@/components/FooterRight"));
const FooterSection = lazy(() => import("@/components/FooterSection"));

function Footer(props: { finishedLazyLoading: boolean }) {
  const { finishedLazyLoading } = props;

  const sectionLinks: string[] = [
    "First Link",
    "Second Link",
    "Third Link",
    "Fourth Link",
  ];

  return (
    <Suspense fallback={<span />}>
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
