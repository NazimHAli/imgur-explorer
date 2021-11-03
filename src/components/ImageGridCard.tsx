import { dispatchRequestArgs } from "@/state/ZuState";
import { truncateText } from "@/utils/dataUtils";
import { TypeItem } from "@/utils/types";
import { memo } from "react";
import { MessageSquare, ThumbsUp, Eye } from "react-feather";

function ImageGridCard(props: {
  item: TypeItem;
  isLoading: boolean;
}): JSX.Element {
  const { item, isLoading } = props;

  const imageInfo = (
    <div className="card-info">
      <h4 className="card-info__title">
        {item?.title && truncateText(item.title, 20)}
      </h4>
      <div className="card-info__icons">
        <ThumbsUp width="15" height="15" />
        {item?.ups?.toLocaleString()}

        <MessageSquare width="15" height="15" />
        {item?.comment_count?.toLocaleString()}

        <Eye width="15" height="15" />
        <span>{item?.views?.toLocaleString()}</span>
      </div>
    </div>
  );

  const loadingSkeleton = () => (
    <div data-testid="loading-skeleton" className="loading-skeleton">
      <div className="loading-skeleton__anim">
        <div className="loading-skeleton__square" />
        <div className="loading-skeleton__bottom" />
      </div>
    </div>
  );

  const handleOnClick = (event: { preventDefault: () => void }) => {
    if (item.id.length) {
      dispatchRequestArgs({
        filter: false,
        method: "comments",
        selectedItemID: item.id,
      });
    }
    event.preventDefault();
  };

  return (
    <>
      {isLoading && loadingSkeleton()}
      {!isLoading && (
        <a href="#explore" className="card" onClick={handleOnClick}>
          <span className="card__img">
            <img
              alt={item?.title}
              width={320}
              height={320}
              srcSet={item?.images && item.images[0].link}
            />
          </span>
          {imageInfo}
        </a>
      )}
    </>
  );
}

export default memo(ImageGridCard);
