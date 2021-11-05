import CommentFactory from "@/components/CommentFactory";
import { SelectedComments } from "@/utils/types";

function ItemModalComments(props: { comments: SelectedComments }): JSX.Element {
  const { comments } = props;

  return (
    <div className="modal-comment">
      <h3 className="modal-comment__title">Comments</h3>

      <div className="space-y-4">
        {comments?.map &&
          comments.map((comment) => (
            <CommentFactory key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
}

export default ItemModalComments;
