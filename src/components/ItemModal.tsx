import ItemModalComments from "@/components/ItemModalComments";
import { truncateText } from "@/utils/dataUtils";
import { Item, SelectedComments } from "@/utils/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import { KeyboardEvent, MouseEvent } from "react";
import { ThumbsUp, MessageSquare, Eye, Icon } from "react-feather";
import Modal from "react-modal";

// Bind modal to appElement for accessibility
Modal.setAppElement("#root");

function iconWithDataBadge(dataCount: number, TheIcon: Icon): JSX.Element {
  return (
    <span className="data-badge" data-count={dataCount?.toLocaleString()}>
      <TheIcon width="20" height="20" />
    </span>
  );
}

function ItemModal(props: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedItem?: Item;
  selectedItemComments: SelectedComments;
}): JSX.Element {
  const { isOpen, setIsOpen, selectedItem, selectedItemComments } = props;

  function closeModal(
    event: MouseEvent<Element, globalThis.MouseEvent> | KeyboardEvent<Element>
  ): void {
    setIsOpen(false);
    event.preventDefault();
  }

  function openModal(): void {
    setIsOpen(true);
  }

  useEffect(() => {
    if (selectedItemComments.length > 0) {
      openModal();
    }
  }, [selectedItem, selectedItemComments]);

  return (
    <Modal
      contentLabel="Image Modal"
      className="myModal__Content"
      overlayClassName="myModal__Overlay"
      isOpen={isOpen}
      onRequestClose={closeModal}
      preventScroll={true}
    >
      {selectedItem?.images && (
        <div className="item-modal">
          <h3 className="item-modal__title">
            Title: {truncateText(selectedItem?.title, 100)}
          </h3>

          <div className="item-modal__image">
            <img
              alt={selectedItem?.title}
              width={selectedItem?.images[0].width}
              height={selectedItem?.images[0].height}
              srcSet={selectedItem?.images[0].link}
              loading="lazy"
            />
          </div>
          <div className="card-info__icons">
            {iconWithDataBadge(selectedItem?.ups, ThumbsUp)}
            {iconWithDataBadge(selectedItem?.comment_count, MessageSquare)}
            {iconWithDataBadge(selectedItem?.views, Eye)}
          </div>
        </div>
      )}
      <ItemModalComments comments={selectedItemComments} />
    </Modal>
  );
}

ItemModal.defaultProps = {
  selectedItem: {},
};

export default ItemModal;
