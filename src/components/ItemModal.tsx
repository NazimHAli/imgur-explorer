import { Dispatch, ReactElement, SetStateAction } from "react";
import Modal from "react-modal";

// Bind modal to appElement for accessibility
Modal.setAppElement("#root");

function ItemModal(props: {
  contentElement;
  setSelectedCard: Dispatch<SetStateAction<ReactElement | null>>;
}) {
  const { contentElement, setSelectedCard } = props;

  function closeModal() {
    setSelectedCard(null);
  }

  return (
    <Modal
      contentElement={() => contentElement}
      contentLabel="Example Modal"
      isOpen={contentElement !== null}
      onRequestClose={closeModal}
      preventScroll={true}
    />
  );
}

export default ItemModal;
