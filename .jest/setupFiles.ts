/**
 * {@link https://jestjs.io/docs/configuration#setupfiles-array}
 *
 * Each setupFile will be run once per test file.
 */

const root = document.createElement("div");
root.setAttribute("id", "root");
document.body.appendChild(root);

global.IntersectionObserver = jest.fn();
global.scrollTo = jest.fn();
