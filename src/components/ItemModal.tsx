import { Item, SelectedComments } from "@/types";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import ItemModalComments from "./ItemModalComments";

// Bind modal to appElement for accessibility
Modal.setAppElement("#root");

function ItemModal(props: {
  selectedItem?: Item;
  selectedItemComments: SelectedComments;
}) {
  const { selectedItemComments } = props;
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    console.log("Request to close modal");
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (selectedItemComments.length > 0) {
      openModal();
    }
  }, [selectedItemComments]);

  return (
    <Modal
      contentLabel="Example Modal"
      isOpen={isOpen}
      onRequestClose={closeModal}
      preventScroll={true}
    >
      <ItemModalComments comments={selectedItemComments} />
    </Modal>
  );
}

export default ItemModal;
