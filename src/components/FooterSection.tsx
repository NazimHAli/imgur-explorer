function FooterSection(props: { sectionLinks: string[] }) {
  const { sectionLinks } = props;

  return (
    <div className="footer-section">
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
