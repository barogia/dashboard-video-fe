import { Button, Center, Modal, Text } from "@mantine/core";
import { useState } from "react";

export function DeleteButton({
  onFunction,
  isDelete,
}: {
  onFunction: () => void;
  isDelete: boolean;
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    onFunction();
    setModalOpen(false);
  };

  const handleModal = () => {
    if (isDelete) {
      setModalOpen(true);
    } else {
      onFunction();
    }
  };

  return (
    <>
      <Button
        variant="outline"
        color={isDelete ? "red" : "blue"}
        onClick={() => handleModal()}
      >
        {isDelete ? "Delete" : "View"}
      </Button>
      {isDelete ? (
        <Modal
          opened={isModalOpen}
          onClose={() => setModalOpen(false)}
          size="xs"
          title={isDelete ? "Delete Confirmation" : "Edit Confirmation"}
          withCloseButton
          centered
        >
          <Text size="sm">
            {isDelete
              ? "Are you sure you want to delete this item?"
              : "Edit this item"}
          </Text>
          <Button
            variant="filled"
            color={isDelete ? "red" : "blue"}
            onClick={handleDelete}
            style={{ marginTop: "16px" }}
          >
            Confirm Delete
          </Button>
        </Modal>
      ) : null}
    </>
  );
}
