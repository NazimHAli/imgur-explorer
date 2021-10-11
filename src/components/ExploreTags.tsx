import { State } from "@/state";

function ExploreTags(props: { tagObject: State["tagObject"] }) {
  const { tagObject } = props;
  return (
    <div className="test">
      {Array.from(tagObject?.galleries ? tagObject.galleries : []).map(
        (gallery: any) => (
          <p key={gallery?.id}>{gallery?.description}</p>
        )
      )}
    </div>
  );
}

export default ExploreTags;
