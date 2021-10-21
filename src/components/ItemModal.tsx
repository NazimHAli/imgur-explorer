import Modal from "react-modal";

import ItemModalComments from "./ItemModalComments";

// Bind modal to appElement for accessibility
Modal.setAppElement("#root");

function ItemModal(props: { selectedItemComments: any }) {
  const { selectedItemComments } = props;

  function closeModal() {
    // setSelectedCard(undefined);
  }

  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={selectedItemComments.length > 0}
      onRequestClose={closeModal}
      preventScroll={true}
    >
      <>
        <ItemModalComments comments={selectedItemComments} />
      </>
    </Modal>
  );
}

export default ItemModal;
