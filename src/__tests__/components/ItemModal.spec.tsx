import { mockSelectedItem } from "@/__tests__/fixtures/mockSelectedItem";
import { act, render, screen } from "@/__tests__/fixtures/test-utils";
import ItemModal from "@/components/ItemModal";
import { useGlobalContext } from "@/state/GlobalContext";
import "@testing-library/jest-dom";
import { useEffect } from "react";

mockSelectedItem;

/* eslint-disable react/prop-types */
function TestComponent({
  setSelectedItem = false,
  isOpen = false,
  setIsOpen = () => {
    null;
  },
} = {}) {
  const { setState } = useGlobalContext();

  useEffect(() => {
    if (setSelectedItem) {
      act(() => {
        setState((currentState) => {
          return { ...currentState, selectedItem: mockSelectedItem };
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
    isOpen: false,
    setIsOpen: () => {
      null;
    },
    ...args,
  };

  const { setSelectedItem, isOpen, setIsOpen } = updArgs;

  render(
    <TestComponent
      isOpen={isOpen}
      setIsOpen={setIsOpen}
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

    test.skip("dev", () => {
      screen.debug();
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
  });
});
