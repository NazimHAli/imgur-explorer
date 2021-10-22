import { BaseComment, Comments } from "@/types";
import { getDateString } from "@/utils/dataUtils";
import { ThumbsUp, ThumbsDown, User } from "react-feather";

function thumbsIcons(comment: BaseComment) {
  return (
    <span className="comment-thumbs">
      <ThumbsUp /> {comment.ups.toLocaleString()} <ThumbsDown />
      {comment.downs.toLocaleString()}
    </span>
  );
}

function commentReplies(children: Array<BaseComment>) {
  return (
    <>
      <h4 className="my-5 uppercase tracking-wide text-gray-400 font-bold text-xs">
        {children.length || 0} Replies
      </h4>

      <div className="space-y-4">
        {Array.from(children.length ? children : []).map((childComment) => (
          <div key={childComment.id} className="flex">
            <User className="flex-shrink-0 mr-3" />

            <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <strong>{childComment.author}</strong>

              <span className="text-xs text-gray-400">
                {getDateString(childComment?.datetime)}
              </span>

              <p className="text-xs sm:text-sm">{childComment.comment}</p>
              {thumbsIcons(childComment)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ItemComment(props: { comment: Comments }) {
  const { comment } = props;

  return (
    <div className="flex">
      <User className="flex-shrink-0 mr-3" />

      <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong>{comment?.author} </strong>

        <span className="text-xs text-gray-400">
          {getDateString(comment?.datetime)}
        </span>

        <p className="text-sm">{comment?.comment}</p>
        {thumbsIcons(comment)}

        {comment.children.length > 0 && commentReplies(comment.children)}
      </div>
    </div>
  );
}

export default ItemComment;
