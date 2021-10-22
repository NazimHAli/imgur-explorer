import { Item, SelectedComments } from "@/types";
import { useEffect } from "react";
import Modal from "react-modal";

import ItemModalComments from "./ItemModalComments";

// Bind modal to appElement for accessibility
Modal.setAppElement("#root");

function ItemModal(props: {
  isOpen;
  setIsOpen;
  selectedItem?: Item;
  selectedItemComments: SelectedComments;
}) {
  const { isOpen, setIsOpen, selectedItem, selectedItemComments } = props;

  function closeModal(e) {
    setIsOpen(false);
    e.preventDefault();
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (selectedItemComments.length > 0) {
      openModal();
    }
  }, [selectedItem, selectedItemComments]);

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
