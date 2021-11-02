import { mockItemComments } from "@/__tests__/fixtures/mockItemComments";
import { mockItems } from "@/__tests__/fixtures/mockItems";
import { rest } from "msw";
import { setupServer } from "msw/node";

const requestHandlers = [
  rest.get(
    "https://api.imgur.com/3/gallery/**/comments/*",
    (_req, res, ctx) => {
      return res(ctx.json({ data: mockItemComments.slice(0, 31) }));
    }
  ),

  rest.get("https://api.imgur.com/3/gallery/*", (_req, res, ctx) => {
    return res(ctx.json({ ...mockItems, data: mockItems.data.slice(0, 31) }));
  }),

  rest.get("https://api.imgur.com/3/account/", (_req, res, ctx) => {
    return res(ctx.json({ data: { user: { name: "First Last" } } }));
  }),
];

const mockServer = setupServer(...requestHandlers);

export { mockServer };
