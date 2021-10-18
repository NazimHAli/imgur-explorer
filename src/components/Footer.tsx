import { State } from "@/types";

import FooterBottom from "./FooterBottom";
import FooterRight from "./FooterRight";
import FooterSection from "./FooterSection";

function Footer(props: { finishedLazyLoading: State["finishedLazyLoading"] }) {
  const { finishedLazyLoading } = props;

  const sectionLinks: string[] = [
    "First Link",
    "Second Link",
    "Third Link",
    "Fourth Link",
  ];

  return (
    <>
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
    </>
  );
}

export default Footer;
