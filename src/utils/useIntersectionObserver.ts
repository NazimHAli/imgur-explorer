import { RefObject, useEffect, useState } from "react";

const useIntersectionObserver = (
  ref: RefObject<HTMLElement>
): IntersectionObserverEntry | null => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const options = {
    rootElement: document.documentElement,
    rootMargin: "35%",
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      setEntry(entries[0]);
    };

    const observer = new IntersectionObserver(handleIntersect, options || {});
    observer.observe(ref.current);

    return () => {
      setEntry(null);
      observer.disconnect();
    };
  }, []);

  return entry;
};

export { useIntersectionObserver };
