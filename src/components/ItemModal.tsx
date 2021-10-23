import ItemModalComments from "@/components/ItemModalComments";
import { Item, SelectedComments } from "@/utils/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import Modal from "react-modal";

// Bind modal to appElement for accessibility
Modal.setAppElement("#root");

function ItemModal(props: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  selectedItem?: Item;
  selectedItemComments: SelectedComments;
}): JSX.Element {
  const { isOpen, setIsOpen, selectedItem, selectedItemComments } = props;

  function closeModal(
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
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
      isOpen={isOpen}
      onRequestClose={closeModal}
      preventScroll={true}
    >
      <ItemModalComments comments={selectedItemComments} />
    </Modal>
  );
}

export default ItemModal;
