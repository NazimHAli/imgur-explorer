function setImageSrc(entry: IntersectionObserverEntry) {
  entry.target.setAttribute(
    "src",
    entry.target.getAttribute("data-srcset") || ""
  );
  entry.target.setAttribute("style", "opacity: 100");
}

class ObserveElementsInView {
  rootObserver: IntersectionObserver;

  constructor() {
    this.rootObserver = new IntersectionObserver(this.handleIntersect, {
      root: null,
      rootMargin: "0px",
    });
  }

  private handleIntersect(
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ): void {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      setImageSrc(entry);
      observer.unobserve(entry.target);
    });
  }

  public observeElements(elements: Element[]): void {
    elements.forEach((element: Element) => {
      this.rootObserver.observe(element);
    });
  }
}

function isElementInView(element: Element): boolean {
  if (!element) {
    return false;
  }

  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const elBounds = element.getBoundingClientRect();
  return (
    (elBounds.bottom > 0 && elBounds.bottom <= viewportHeight) ||
    (elBounds.top >= 0 && viewportHeight >= elBounds.top)
  );
}

export { ObserveElementsInView, isElementInView };
