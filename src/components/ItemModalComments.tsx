import { getDateString } from "@/utils/dataUtils";
import { Comments, SelectedComments } from "@/utils/types";
import { ThumbsUp, ThumbsDown, User } from "react-feather";

function dateTime(comment: Comments): JSX.Element {
  return (
    <span className="modal-comment__datetime">
      {getDateString(comment?.datetime)}
    </span>
  );
}

function thumbIcons(comment: Comments): JSX.Element {
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
function CommentFactory(props: { comment: Comments }): JSX.Element {
  const { comment } = props;

  return (
    <div className="flex">
      <User />

      <div className="modal-comment__nested">
        <strong>{comment?.author} </strong>
        {dateTime(comment)}

        <p className="modal-comment__text">{comment?.comment}</p>
        {thumbIcons(comment)}

        {comment.children.map((nestedComment) => (
          <CommentFactory key={nestedComment.id} comment={nestedComment} />
        ))}
      </div>
    </div>
  );
}

function ItemModalComments(props: { comments: SelectedComments }): JSX.Element {
  const { comments } = props;

  return (
    <div className="modal-comment">
      <h3 className="modal-comment__title">Comments</h3>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentFactory key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default ItemModalComments;
