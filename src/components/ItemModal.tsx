import { ItemModalComments } from "@/components/ItemModalComments";
import { useStore } from "@/state/ZuState";
import { dispatchClearSelectedItem } from "@/state/dispatchHelpers";
import { truncateText } from "@/utils/dataUtils";
import { Dispatch, SetStateAction, useEffect } from "react";
import { KeyboardEvent, MouseEvent } from "react";
import { ThumbsUp, MessageSquare, Eye, Icon } from "react-feather";
import Modal from "react-modal";
import shallow from "zustand/shallow";

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
}): JSX.Element {
  const { isOpen, setIsOpen } = props;
  const { selectedItem, selectedItemComments } = useStore(
    (state) => ({
      selectedItem: state.selectedItem,
      selectedItemComments: state.selectedItemComments,
    }),
    shallow
  );

  function closeModal(
    event: MouseEvent<Element, globalThis.MouseEvent> | KeyboardEvent<Element>
  ): void {
    setIsOpen(false);
    dispatchClearSelectedItem();
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

          <button
            className="item-modal--button__close"
            onClick={closeModal}
            type="button"
          >
            <svg
              xmlns="https://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

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

export default ItemModal;
