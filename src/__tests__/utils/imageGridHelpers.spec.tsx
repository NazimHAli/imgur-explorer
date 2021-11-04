import { mockItems } from "@/__tests__/fixtures/mockItems";
import { act, render } from "@/__tests__/fixtures/test-utils";
import { dispatchIdxsToLoad, dispatchItems, useStore } from "@/state/ZuState";
import { HandleImageLazyLoad, HandleNewItems } from "@/utils/imageGridHelpers";
import { useEffect, useState } from "react";

let bindIdxsToLoad;

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
  function TestHandleNewItems(props: { maxItems: number; idxsToLoad: any }) {
    const state = useStore();

    useEffect(() => {
      act(() => {
        dispatchItems(mockItems.data.slice(0, props?.maxItems || 20));
      });
    }, []);

    useEffect(() => {
      act(() => {
        dispatchIdxsToLoad(props?.idxsToLoad || [0, 1, 2, 3, 4]);
      });
    }, [state.items]);

    HandleNewItems(state.idxsToLoad.length > 5);

    return <p></p>;
  }

  test("does nothing if observed element not intersecting", () => {
    render(<TestHandleNewItems maxItems={0} idxsToLoad={undefined} />);
    expect(bindIdxsToLoad).toHaveLength(5);
  });

  test("adds new idxs when intersecting", () => {
    render(
      <TestHandleNewItems idxsToLoad={[0, 1, 2, 3, 4, 5, 6]} maxItems={50} />
    );
    expect(bindIdxsToLoad).toHaveLength(17);
  });

  test.skip("sets new request args for page 2", () => {
    render(
      <TestHandleNewItems idxsToLoad={[0, 1, 2, 3, 4, 5, 6]} maxItems={20} />
    );

    expect(useStore().requestArgs.page).toEqual(2);
  });

  test("finishes lazyloading", () => {
    render(
      <TestHandleNewItems
        idxsToLoad={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
        maxItems={18}
      />
    );
    expect(useStore().idxsToLoad).toHaveLength(9);
    expect(useStore().finishedLazyLoading).toBeTruthy();
  });
});
