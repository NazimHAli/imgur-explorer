import { fetchData } from "@/utils/fetchWrapper";
import fetchMock from "jest-fetch-mock";
import { rest } from "msw";
import { setupServer } from "msw/node";

const requestHandlers = [
  rest.get("https://www.cats.moo/meow/data", (_req, res, ctx) => {
    return res(ctx.json({ results: ["meow"] }));
  }),

  rest.get("https://www.cats.moo/meow/error", (_req, res, ctx) => {
    return res(
      ctx.status(400, "No cake 4 u :p"),
      ctx.json({
        errorMessage: "Not authorized",
      })
    );
  }),
];

const server = setupServer(...requestHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("fetchData", () => {
  let response;

  beforeAll(() => {
    fetchMock.doMock();
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });

  test("successfull response", async () => {
    response = await fetchData("https://www.cats.moo/meow/data");
    expect(response).toEqual(["meow"]);
  });

  test("errors out", async () => {
    response = await fetchData("https://www.cats.moo/meow/error");

    expect(response.statusText).toBe("No cake 4 u :p");
    expect(response.status).toBe(400);
  });
});
