import { GlobalContextProvider } from "@/state/GlobalContext";
import {
  act,
  render,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import { ReactElement } from "react";

function AllTheProviders(props: { children: ReactElement<any, any> }) {
  const { children } = props;

  return <GlobalContextProvider>{children}</GlobalContextProvider>;
}

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  let ac: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement
  >;
  act(() => {
    ac = render(ui, { wrapper: AllTheProviders, ...options });
  });

  return ac;
}

export * from "@testing-library/react";
export { customRender as render };
