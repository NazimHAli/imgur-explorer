import { fetchData } from "@/utils/fetchWrapper";
import fetchMock from "jest-fetch-mock";
import { rest } from "msw";
import { setupServer } from "msw/node";

const requestHandlers = [
  rest.get("https://www.cats.moo/meow/data", (_req, res, ctx) => {
    return res(ctx.json({ results: ["meow"] }));
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
});
