import { getDateString } from "@/utils/dataUtils";
import { TypeComments } from "@/utils/types";
import { memo } from "react";
import { ThumbsDown, ThumbsUp, User } from "react-feather";

function dateTime(comment: TypeComments): JSX.Element {
  return (
    <span className="modal-comment__datetime">
      {getDateString(comment?.datetime)}
    </span>
  );
}

function thumbIcons(comment: TypeComments): JSX.Element {
  return (
    <span className="comment-thumbs">
      <ThumbsUp /> {comment.ups.toLocaleString()} <ThumbsDown />
      {comment.downs.toLocaleString()}
    </span>
  );
}

/**
 * Generic comment factory
 *
 * Recursively generates parent comments + nested replies
 * Each comment, including replies, can pontentially contain children
 *
 * @param props
 * @returns
 */
function CommentFactory(props: { comment: TypeComments }): JSX.Element {
  const { comment } = props;

  return (
    <div className="flex">
      <User />

      <div className="modal-comment__nested">
        <strong>{comment?.author} </strong>
        {dateTime(comment)}

        <p className="modal-comment__text">{comment?.comment}</p>
        {thumbIcons(comment)}

        {comment?.children &&
          comment.children.map((nestedComment) => (
            <CommentFactory key={nestedComment.id} comment={nestedComment} />
          ))}
      </div>
    </div>
  );
}

export default memo(CommentFactory);
