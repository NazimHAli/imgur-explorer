import {
  act,
  render,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import { ReactElement } from "react";

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  let ac: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement
  >;
  act(() => {
    ac = render(ui, { ...options });
  });

  return ac;
}

export * from "@testing-library/react";
export { customRender as render };
