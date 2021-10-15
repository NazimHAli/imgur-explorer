function LeftSide() {
  return (
    <p className=" text-sm text-center sm:text-left">
      © 2021 Meows ||
      <a
        href="https://twitter.com/none"
        rel="noopener noreferrer"
        className=" ml-1"
        target="_blank"
      >
        @none
      </a>
    </p>
  );
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
    <div className="bg-gray-100 text-black">
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <LeftSide />
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
          <a className="">
            <FooterIcon />
          </a>
          <a className="ml-3 ">
            <FooterIcon />
          </a>
          <a className="ml-3 ">
            <FooterIcon />
          </a>
          <a className="ml-3 ">
            <FooterIcon />
          </a>
        </span>
      </div>
    </div>
  );
}

export default FooterBottom;
