import FooterBottom from "@/components/FooterBottom";
import FooterRight from "@/components/FooterRight";
import FooterSection from "@/components/FooterSection";
import { State } from "@/utils/types";

function Footer(props: { finishedLazyLoading: State["finishedLazyLoading"] }) {
  const { finishedLazyLoading } = props;

  const sectionLinks: string[] = [
    "First Link",
    "Second Link",
    "Third Link",
    "Fourth Link",
  ];

  const elements = (
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
  );

  return <>{finishedLazyLoading && elements}</>;
}

export default Footer;
