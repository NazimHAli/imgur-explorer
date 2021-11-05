import { mockItems } from "@/__tests__/fixtures/mockItems";
import { act, render, waitFor } from "@/__tests__/fixtures/test-utils";
import { useStore } from "@/state/ZuState";
import { dispatchIdxsToLoad, dispatchItems } from "@/state/dispatchHelpers";
import {
  imageRefObserveCallback,
  HandleNewItems,
} from "@/utils/imageGridHelpers";
import { useEffect } from "react";

let bindIdxsToLoad;

describe("imageRefObserveCallback", () => {
  function TestComponent() {
    const idxsToLoad = useStore((state) => state.idxsToLoad);
    const imgRef = imageRefObserveCallback();

    bindIdxsToLoad = idxsToLoad;
    return <img src="/meow.webp" alt="Meowdy partner" ref={imgRef} />;
  }

  test("sets 5 indexes on load", () => {
    render(<TestComponent />);
    expect(bindIdxsToLoad).toEqual([...Array(8).keys()]);
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
        dispatchIdxsToLoad(props?.idxsToLoad || [...Array(8).keys()]);
      });
    }, [state.items]);

    HandleNewItems(state.idxsToLoad.length > 5);

    return <p></p>;
  }

  test("does nothing if observed element not intersecting", async () => {
    render(<TestHandleNewItems maxItems={0} idxsToLoad={undefined} />);
    await waitFor(() => expect(useStore.getState().idxsToLoad).toHaveLength(8));
  });

  test.skip("adds new idxs when intersecting", async () => {
    render(
      <TestHandleNewItems idxsToLoad={[0, 1, 2, 3, 4, 5, 6]} maxItems={50} />
    );
    await waitFor(() =>
      expect(useStore.getState().idxsToLoad).toHaveLength(17)
    );
  });

  test.skip("sets new request args for page 2", () => {
    render(
      <TestHandleNewItems idxsToLoad={[0, 1, 2, 3, 4, 5, 6]} maxItems={20} />
    );

    expect(useStore().requestArgs.page).toEqual(2);
  });

  test("finishes lazyloading", async () => {
    render(
      <TestHandleNewItems
        idxsToLoad={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
        maxItems={18}
      />
    );
    await waitFor(() => expect(useStore.getState().idxsToLoad).toHaveLength(9));
  });
});
