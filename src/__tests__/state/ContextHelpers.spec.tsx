import { mockItemComments } from "@/__tests__/fixtures/mockItemComments";
import { mockItems } from "@/__tests__/fixtures/mockItems";
import { mockTags } from "@/__tests__/fixtures/mockTags";
import { render } from "@/__tests__/fixtures/test-utils";
import { handleRespose } from "@/state/ContextHelpers";
import { useGlobalContext } from "@/state/GlobalContext";
import { act } from "@testing-library/react";
import { useEffect } from "react";

let bindedState;

function TestComponent(props: { method: string; response: any }) {
  const { method, response } = props;
  const { setState, state } = useGlobalContext();

  useEffect(() => {
    act(() => {
      handleRespose(method, setState, response);
    });
  }, []);

  bindedState = state;

  return <p></p>;
}

describe("handleRespose methods", () => {
  test("addItems", () => {
    render(<TestComponent method={"search"} response={mockItems.data} />);
    expect(bindedState.items).toHaveLength(mockItems.data.length);
  });

  test("addTags", () => {
    render(<TestComponent method={"tags"} response={mockTags} />);
    expect(bindedState.galleryTags.galleries).toHaveLength(
      mockTags.galleries.length
    );
  });

  test("addComments", () => {
    render(<TestComponent method={"comments"} response={mockItemComments} />);
    expect(bindedState.selectedItemComments).toHaveLength(
      mockItemComments.length
    );
  });
});
