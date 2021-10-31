import { GlobalContextProvider } from "@/state/GlobalContext";
import { act, render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";

global.IntersectionObserver = jest.fn();
global.scrollTo = jest.fn();

const AllTheProviders = (props: { children: ReactElement<any, any> }) => {
  const { children } = props;

  return <GlobalContextProvider>{children}</GlobalContextProvider>;
};

function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) {
  let ac;
  act(() => {
    ac = render(ui, { wrapper: AllTheProviders, ...options });
  });

  return ac;
}

export * from "@testing-library/react";
export { customRender as render };
