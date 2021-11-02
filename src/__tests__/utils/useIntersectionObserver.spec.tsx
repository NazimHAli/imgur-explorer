import { useIntersectionObserver } from "@/utils/useIntersectionObserver";
import { render, waitFor } from "@testing-library/react";
import { useEffect, useRef } from "react";

function TestComponent() {
  const elementObserverRef = useRef<HTMLElement>(null);
  const entry = useIntersectionObserver(elementObserverRef);
  const isIntersecting = entry?.isIntersecting;

  useEffect(() => {
    if (isIntersecting) {
      console.log(isIntersecting);
    }
  }, [isIntersecting]);

  return (
    <div>
      <span ref={elementObserverRef}>lazymeister</span>
    </div>
  );
}

describe("useIntersectionObserver", () => {
  let observe, disconnect;

  beforeEach(() => {
    observe = jest.fn();
    disconnect = jest.fn();

    // @ts-ignore
    window.IntersectionObserver = jest.fn(() => ({
      observe,
      disconnect,
    }));

    render(<TestComponent />);
  });

  test("observes element", async () => {
    expect(observe).toBeCalledTimes(1);
  });

  test.todo("disconnect gets called, but Jest can't detect it");
  test.skip("disconnects element", async () => {
    await waitFor(() => expect(disconnect).toBeCalledTimes(1));
  });
});
