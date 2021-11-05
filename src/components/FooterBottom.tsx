import { FooterIcon } from "@/components/FooterIcon";
import { memo } from "react";

function leftSide() {
  return <p className="footer__bottom__left">© 2021 Meows</p>;
}

function FooterBottom() {
  return (
    <div className="footer__bottom">
      <div className="footer__bottom__container">
        {leftSide()}
        <span className="footer__bottom__center">
          <a href="#explore">
            <FooterIcon />
          </a>
          <a href="#explore" className="ml-3 ">
            <FooterIcon />
          </a>
          <a href="#explore" className="ml-3 ">
            <FooterIcon />
          </a>
          <a href="#explore" className="ml-3 ">
            <FooterIcon />
          </a>
        </span>
      </div>
    </div>
  );
}

export default memo(FooterBottom);
