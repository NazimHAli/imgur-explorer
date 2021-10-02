class LazyLoadImages {
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
  ) {
    entries.forEach((entry) => {
      handleIntersectEntry(entry, observer);
    });
  }

  public observeElements(elements: any[]) {
    elements.forEach((element: Element) => {
      this.rootObserver.observe(element);
      element.setAttribute("observed", "");
    });
  }
}

function handleIntersectEntry(entry, observer): void {
  if (!entry.isIntersecting) {
    return;
  }

  if (entry.target.childNodes.length) {
    entry.target.childNodes.forEach(
      (el: { src: any; dataset: { srcset: any } }) => {
        el.src = el.dataset.srcset;
      }
    );
  } else {
    entry.target.src = entry.target.dataset.srcset;
  }
  entry.target.style.opacity = 100;
  observer.unobserve(entry.target);
}

function isElementInView(element: { getBoundingClientRect: () => any }) {
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

export { LazyLoadImages, isElementInView };
