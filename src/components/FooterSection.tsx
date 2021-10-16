function FooterSection({ sectionLinks }) {
  return (
    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
      <h2 className="title-font font-medium tracking-widest text-lg mb-3">
        CATEGORIES
      </h2>
      <ul className="list-none mb-10">
        {sectionLinks.map((linkName) => (
          <li key={linkName}>
            <a href="#explore">{linkName}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterSection;
