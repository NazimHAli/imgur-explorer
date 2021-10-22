import { BaseComment, Comments } from "@/types";
import { getDateString } from "@/utils/dataUtils";
import { ThumbsUp, ThumbsDown } from "react-feather";

function thumbsUpDown(comment) {
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
            <div className="flex-shrink-0 mr-3">
              <img
                className="mt-3 rounded-full w-6 h-6 sm:w-8 sm:h-8"
                src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                alt=""
              />
            </div>
            <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
              <strong>{childComment.author}</strong>
              <span className="text-xs text-gray-400">
                {getDateString(childComment?.datetime)}
              </span>
              <p className="text-xs sm:text-sm">{childComment.comment}</p>
              {thumbsUpDown(childComment)}
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
      <div className="flex-shrink-0 mr-3">
        <img
          className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
          src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
          alt=""
        />
      </div>
      <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
        <strong>{comment?.author} </strong>
        <span className="text-xs text-gray-400">
          {getDateString(comment?.datetime)}
        </span>
        <p className="text-sm">{comment?.comment}</p>
        {thumbsUpDown(comment)}
        {comment.children.length > 0 && commentReplies(comment.children)}
      </div>
    </div>
  );
}

export default ItemComment;
