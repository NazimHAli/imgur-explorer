import { mockItems } from "@/__tests__/fixtures/mockItems";
import { act, render } from "@/__tests__/fixtures/test-utils";
import { HandleImageLazyLoad, HandleNewItems } from "@/utils/imageGridHelpers";
import { useEffect, useState } from "react";

let bindIdxsToLoad, bindState;

describe("HandleImageLazyLoad", () => {
  function TestComponent() {
    const isNewSearch = true;

    const [idxsToLoad, setidxsToLoad] = useState([0, 1, 2, 3, 4]);
    const imgRef = HandleImageLazyLoad(isNewSearch, setidxsToLoad);

    bindIdxsToLoad = idxsToLoad;
    return <img src="/meow.webp" alt="Meowdy partner" ref={imgRef} />;
  }

  test("sets 5 indexes on load", () => {
    render(<TestComponent />);
    expect(bindIdxsToLoad).toEqual([0, 1, 2, 3, 4]);
  });
});

describe("HandleNewItems", () => {
  /* eslint-disable react/prop-types */
  function TestHandleNewItems(props) {
    const { setState, state } = useGlobalContext();
    const [idxsToLoad, setidxsToLoad] = useState([0, 1, 2]);

    useEffect(() => {
      act(() => {
        addItems(setState, mockItems.data.slice(0, props?.maxItems || 20));
      });
    }, []);

    useEffect(() => {
      act(() => {
        setidxsToLoad(props?.idxsToLoad || [0, 1, 2, 3, 4]);
      });
    }, [state.items]);

    HandleNewItems(idxsToLoad.length > 5, idxsToLoad, setidxsToLoad);

    bindIdxsToLoad = idxsToLoad;
    bindState = state;

    return <p></p>;
  }

  test("does nothing if observed element not intersecting", () => {
    render(<TestHandleNewItems />);
    expect(bindIdxsToLoad).toHaveLength(5);
  });

  test("adds new idxs when intersecting", () => {
    render(
      <TestHandleNewItems idxsToLoad={[0, 1, 2, 3, 4, 5, 6]} maxItems={50} />
    );
    expect(bindIdxsToLoad).toHaveLength(17);
  });

  test("sets new request args for page 2", () => {
    render(
      <TestHandleNewItems idxsToLoad={[0, 1, 2, 3, 4, 5, 6]} maxItems={20} />
    );

    expect(bindState.requestArgs.page).toEqual(2);
  });

  test("finishes lazyloading", () => {
    render(
      <TestHandleNewItems
        idxsToLoad={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
        maxItems={18}
      />
    );
    expect(bindIdxsToLoad).toHaveLength(9);
    expect(bindState.finishedLazyLoading).toBeTruthy();
  });
});
