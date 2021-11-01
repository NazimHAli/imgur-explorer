import { mockItemComments } from "@/__tests__/fixtures/mockItemComments";
import { mockSelectedItem } from "@/__tests__/fixtures/mockSelectedItem";
import {
  act,
  fireEvent,
  render,
  screen,
} from "@/__tests__/fixtures/test-utils";
import ItemModal from "@/components/ItemModal";
import { useGlobalContext } from "@/state/GlobalContext";
import "@testing-library/jest-dom";
import { useEffect } from "react";

const setIsOpen = jest.fn();

/* eslint-disable react/prop-types */
function TestComponent({
  setSelectedItem = false,
  setItemComments = false,
  isOpen = false,
} = {}) {
  const { setState } = useGlobalContext();

  useEffect(() => {
    if (setSelectedItem || setItemComments) {
      let newState = { selectedItem: mockSelectedItem };

      if (setSelectedItem) {
        // @ts-ignore
        newState = { ...newState, selectedItemComments: mockItemComments };
      }

      act(() => {
        setState((currentState) => {
          return { ...currentState, ...newState };
        });
      });
    }
  }, []);

  return <ItemModal isOpen={isOpen} setIsOpen={setIsOpen} />;
}
/* eslint-enable react/prop-types */

function renderModal(args) {
  const updArgs = {
    setSelectedItem: false,
    setItemComments: false,
    isOpen: false,
    ...args,
  };

  const { setItemComments, setSelectedItem, isOpen } = updArgs;

  render(
    <TestComponent
      isOpen={isOpen}
      setItemComments={setItemComments}
      setSelectedItem={setSelectedItem}
    />,
    {
      container: document.getElementById("root"),
    }
  );
}

describe("ItemModal", () => {
  let args, testElement;

  describe("renders one element when not open", () => {
    beforeEach(() => {
      renderModal({});
    });

    test("should match snapshot", () => {
      expect(document.querySelector("body")).toMatchSnapshot();
    });
  });

  describe("when open", () => {
    beforeEach(() => {
      renderModal({ isOpen: true });
    });

    test("mounts", () => {
      expect(document.querySelector(".ReactModalPortal")).toBeDefined();
    });

    test("document.body contains modal open class", () => {
      expect(document.querySelector("body").className).toBe(
        "ReactModal__Body--open"
      );
    });

    test("images not rendered", () => {
      expect(screen.queryAllByRole("img")).toHaveLength(0);
    });

    test("has comments section", () => {
      testElement = screen.getByRole("heading", { level: 3 });
      expect(testElement).toHaveTextContent("Comments");
    });
  });

  describe("selected item", () => {
    beforeEach(() => {
      args = {
        setSelectedItem: true,
        isOpen: true,
      };
      renderModal(args);
    });

    test("img rendered", () => {
      const image = screen.queryByRole("img");
      expect(image).toMatchInlineSnapshot(
        `
        <img
          alt="Garden Meow"
          height="898"
          loading="lazy"
          srcset="https://i.imgur.com/Ykajvmel.jpg"
          width="450"
        />
      `
      );
    });

    test("has info badges", () => {
      testElement = document.querySelectorAll("span.data-badge");
      expect(testElement).toHaveLength(3);

      expect(testElement[0].dataset.count).toEqual(
        mockSelectedItem.ups.toLocaleString()
      );
      expect(testElement[1].dataset.count).toEqual(
        mockSelectedItem.comment_count.toLocaleString()
      );
      expect(testElement[2].dataset.count).toEqual(
        mockSelectedItem.views.toLocaleString()
      );
    });

    test("close modal on button click", () => {
      fireEvent.click(screen.getByRole("button"));

      testElement = document.querySelector(".item-modal");
      expect(testElement).toBeNull();
    });
  });

  describe("with item + comments", () => {
    beforeEach(() => {
      args = {
        setSelectedItem: true,
        setItemComments: true,
      };
      renderModal(args);
    });

    test("on mount sets isOpen=true", () => {
      expect(setIsOpen).toHaveBeenCalledWith(true);
    });
  });
});
