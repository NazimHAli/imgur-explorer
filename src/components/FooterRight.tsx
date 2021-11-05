import { memo } from "react";

function FooterRight() {
  return (
    <div className="footer__content__right">
      <a className="footer__content__right__link" href="#explore">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-10 h-10 text-white p-2 bg-pink-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
        <span className="ml-3 text-xl">The Memes</span>
      </a>
      <p className="mt-2 text-sm ">Lets just say it was meowed and move on.</p>
    </div>
  );
}

export default memo(FooterRight);
