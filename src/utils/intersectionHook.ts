import { MutableRefObject, useEffect, useState } from "react";

const useIntersectObserver = (
  ref: MutableRefObject<undefined>,
  options: IntersectionObserverInit = {}
): IntersectionObserverEntry | null | void => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

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

export { useIntersectObserver };
