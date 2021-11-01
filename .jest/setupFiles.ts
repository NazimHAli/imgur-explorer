/**
 * {@link https://jestjs.io/docs/configuration#setupfiles-array}
 *
 * Each setupFile will be run once per test file.
 */

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

const observe = jest.fn();
const unobserve = jest.fn();

// @ts-ignore
global.IntersectionObserver = jest.fn(() => ({
  observe,
  unobserve,
}));

global.scrollTo = jest.fn();
