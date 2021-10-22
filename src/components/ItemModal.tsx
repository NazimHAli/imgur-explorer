import { Item, SelectedComments } from "@/types";
import Modal from "react-modal";

import ItemModalComments from "./ItemModalComments";

// Bind modal to appElement for accessibility
Modal.setAppElement("#root");

function ItemModal(props: {
  selectedItem?: Item;
  selectedItemComments: SelectedComments;
}) {
  const { selectedItemComments } = props;

  function closeModal() {
    // setSelectedCard(undefined);
    console.log("Request to close modal");
  }

  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={selectedItemComments.length > 0}
      onRequestClose={closeModal}
      preventScroll={true}
    >
      <ItemModalComments comments={selectedItemComments} />
    </Modal>
  );
}

export default ItemModal;
