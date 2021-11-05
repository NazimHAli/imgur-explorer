import { mockItemComments } from "@/__tests__/fixtures/mockItemComments";
import { render } from "@/__tests__/fixtures/test-utils";
import ItemModalComments from "@/components/ItemModalComments";
import "@testing-library/jest-dom";

const countCommentEls = (testElement) => {
  return testElement.querySelectorAll(".modal-comment__nested").length;
};

describe("ItemModalComments", () => {
  let testElement;

  test("no comments displayed", () => {
    testElement = render(<ItemModalComments comments={[]} />).container;
    expect(countCommentEls(testElement)).toEqual(0);
  });

  test("comments displayed", () => {
    testElement = render(
      // @ts-ignore
      <ItemModalComments comments={mockItemComments} />
    ).container;

    expect(countCommentEls(testElement)).toEqual(15);
  });

  test("datetimes exist", () => {
    testElement = render(
      // @ts-expect-error
      <ItemModalComments comments={mockItemComments} />
    ).container;
    const dts = testElement.querySelectorAll(".modal-comment__datetime");
    expect(dts.length).toEqual(15);
  });

  test("thumbs up/down exist", () => {
    testElement = render(
      // @ts-expect-error
      <ItemModalComments comments={mockItemComments} />
    ).container;
    const dts = testElement.querySelectorAll(".comment-thumbs");
    expect(dts.length).toEqual(15);
  });
});
