import { render, screen } from "@/__tests__/fixtures/test-utils";
import ItemModal from "@/components/ItemModal";
import "@testing-library/jest-dom";

function renderModal({
  isOpen = false,
  setIsOpen = () => {
    null;
  },
} = {}) {
  render(<ItemModal isOpen={isOpen} setIsOpen={setIsOpen} />, {
    container: document.getElementById("root"),
  });
}

describe("ItemModal", () => {
  let testElement;

  describe("renders one element when not open", () => {
    renderModal();

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

    test.skip("dev", () => {
      screen.debug();
      expect(screen.queryAllByRole("img")).toHaveLength(0);
    });
  });
});
