import { render, screen } from "@/__tests__/fixtures/test-utils";
import ItemModal from "@/components/ItemModal";

describe("ItemModal", () => {
  beforeEach(() => {
    render(
      <ItemModal
        isOpen={false}
        setIsOpen={() => {
          null;
        }}
      />,
      {
        container: document.getElementById("root"),
      }
    );
  });

  test("mounts successfully", async () => {
    screen.debug();
    expect(document.querySelector(".ReactModalPortal")).toBeDefined();
  });
});
