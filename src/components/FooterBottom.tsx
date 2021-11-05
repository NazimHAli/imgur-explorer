import { memo } from "react";

function LeftSide() {
  return <p className="footer__bottom__left">© 2021 Meows</p>;
}

function FooterIcon() {
  return (
    <svg
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="0"
      className="w-5 h-5"
      viewBox="0 0 24 24"
    >
      <path
        stroke="none"
        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
      ></path>
      <circle cx="4" cy="4" r="2" stroke="none"></circle>
    </svg>
  );
}

function FooterBottom() {
  return (
    <div className="footer__bottom">
      <div className="footer__bottom__container">
        <LeftSide />
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
