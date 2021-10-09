class ObserveElementsInView {
  rootObserver: IntersectionObserver;
  activeElementIDs: Set<unknown>;

  constructor() {
    this.activeElementIDs = new Set();
    this.rootObserver = new IntersectionObserver(this.handleIntersect, {
      root: null,
      rootMargin: "0px",
    });
  }

  private handleIntersect(
    entries: any[],
    observer: { unobserve: (arg0: any) => void }
  ): void {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.src = entry.target.dataset.srcset;
      delete entry.target.dataset.srcset;

      entry.target.style.opacity = 100;
      observer.unobserve(entry.target);
    });
  }

  public observeElements(elements): void {
    elements.forEach((element: Element) => {
      this.rootObserver.observe(element);
      element.setAttribute("observed", "");
    });
  }
}

function isElementInView(element: {
  getBoundingClientRect: () => any;
}): boolean {
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
