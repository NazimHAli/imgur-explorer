import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
} from "react";
import Modal from "react-modal";

// Bind modal to appElement for accessibility
Modal.setAppElement("#root");

function ItemModal(props: {
  contentElement;
  setSelectedCard:
    | Dispatch<
        SetStateAction<
          ReactElement<any, string | JSXElementConstructor<any>> | undefined
        >
      >
    | Dispatch<SetStateAction<undefined>>;
}) {
  const { contentElement, setSelectedCard } = props;

  function closeModal() {
    setSelectedCard(undefined);
  }

  return (
    <Modal
      contentElement={() => contentElement}
      contentLabel="Example Modal"
      isOpen={contentElement !== undefined}
      onRequestClose={closeModal}
      preventScroll={true}
    />
  );
}

export default ItemModal;
