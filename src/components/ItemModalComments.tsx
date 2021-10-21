import ParentComment from "./ParentComment";

function ItemModalComments(props: { comments }) {
  const { comments } = props;

  return (
    <div className="antialiased mx-auto max-w-screen-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

      <div className="space-y-4">
        {Array.from(comments.length ? comments : []).map((comment) => (
          <ParentComment
            key={comment?.id}
            comment={comment?.comment.length ? comment : undefined}
          />
        ))}
      </div>
    </div>
  );
}

export default ItemModalComments;
