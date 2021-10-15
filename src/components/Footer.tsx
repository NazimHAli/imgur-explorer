import FooterBottom from "./FooterBottom";
import FooterRight from "./FooterRight";
import FooterSection from "./FooterSection";

function Footer() {
  const sectionLinks = [
    "First Link",
    "Second Link",
    "Third Link",
    "Fourth Link",
  ];

  return (
    <footer className=" body-font footer">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <FooterRight />
        <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
          <FooterSection sectionLinks={sectionLinks} />
          <FooterSection sectionLinks={sectionLinks} />
          <FooterSection sectionLinks={sectionLinks} />
          <FooterSection sectionLinks={sectionLinks} />
        </div>
      </div>
      <FooterBottom />
    </footer>
  );
}

export default Footer;
