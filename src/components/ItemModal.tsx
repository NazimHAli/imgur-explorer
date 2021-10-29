import { ItemModalComments } from "@/components/ItemModalComments";
import { useGlobalContext } from "@/state/GlobalContext";
import { truncateText } from "@/utils/dataUtils";
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
}): JSX.Element {
  const { isOpen, setIsOpen } = props;
  const { setState, state } = useGlobalContext();

  function closeModal(
    event: MouseEvent<Element, globalThis.MouseEvent> | KeyboardEvent<Element>
  ): void {
    setIsOpen(false);
    setState((currentState: any) => {
      return { ...currentState, selectedItem: {}, selectedItemComments: [] };
    });
    event.preventDefault();
  }

  function openModal(): void {
    setIsOpen(true);
  }

  useEffect(() => {
    if (state.selectedItemComments.length > 0) {
      openModal();
    }
  }, [state.selectedItem, state.selectedItemComments]);

  return (
    <Modal
      contentLabel="Image Modal"
      className="myModal__Content"
      overlayClassName="myModal__Overlay"
      isOpen={isOpen}
      onRequestClose={closeModal}
      preventScroll={true}
    >
      {state.selectedItem?.images && (
        <div className="item-modal">
          <h3 className="item-modal__title">
            Title: {truncateText(state.selectedItem?.title, 100)}
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
              alt={state.selectedItem?.title}
              width={state.selectedItem?.images[0].width}
              height={state.selectedItem?.images[0].height}
              srcSet={state.selectedItem?.images[0].link}
              loading="lazy"
            />
          </div>

          <div className="card-info__icons">
            {iconWithDataBadge(state.selectedItem?.ups, ThumbsUp)}
            {iconWithDataBadge(
              state.selectedItem?.comment_count,
              MessageSquare
            )}
            {iconWithDataBadge(state.selectedItem?.views, Eye)}
          </div>
        </div>
      )}

      <ItemModalComments comments={state.selectedItemComments} />
    </Modal>
  );
}

ItemModal.defaultProps = {
  selectedItem: {},
};

export default ItemModal;
