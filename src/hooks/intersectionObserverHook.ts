import { useState, useRef, useEffect, MutableRefObject } from "react";

/**
 * intersectionObserverHook
 *
 * @param ref
 * @param options
 * @param forward
 * @returns boolean
 */
export const intersectionObserverHook = (
  ref: MutableRefObject<Element | null>,
  options: any = {},
  forward = true
) => {
  const [element, setElement] = useState<Element | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const refObserver = useRef<null | IntersectionObserver>(null);

  const disconnectObserver = () => {
    if (refObserver.current) {
      refObserver.current.disconnect();
    }
  };

  useEffect(() => {
    if (!element && ref.current) {
      setElement(ref.current);
    }
  }, [ref.current]);

  useEffect(() => {
    if (!element) {
      return;
    }

    disconnectObserver();

    const newObserver = (refObserver.current = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        if (!forward) {
          setIsIntersecting(isElementIntersecting);
        } else if (forward && !isIntersecting && isElementIntersecting) {
          setIsIntersecting(isElementIntersecting);
          disconnectObserver();
        }
      },
      { ...options }
    ));

    newObserver.observe(element);

    return () => {
      disconnectObserver();
    };
  }, [element, options]);

  return isIntersecting;
};
