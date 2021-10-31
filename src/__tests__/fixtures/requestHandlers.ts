import { rest } from "msw";
import { setupServer } from "msw/node";

const requestHandlers = [
  rest.get("https://api.imgur.com/3/gallery/*", (_req, res, ctx) => {
    return res(ctx.json({ data: ["meow"] }));
  }),
  rest.get("https://api.imgur.com/3/account/", (_req, res, ctx) => {
    return res(ctx.json({ data: { user: { name: "First Last" } } }));
  }),
];

const mockedServer = setupServer(...requestHandlers);

export { mockedServer };
