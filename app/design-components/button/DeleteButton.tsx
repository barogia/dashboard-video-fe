import { Button, Center, Modal, Text } from "@mantine/core";
import { useState } from "react";

export function DeleteButton({ onDelete }: { onDelete: () => void }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setModalOpen(false);
  };

  return (
    <>
      <Button variant="outline" color="red" onClick={() => setModalOpen(true)}>
        Delete
      </Button>
      <Modal
        opened={isModalOpen}
        onClose={() => setModalOpen(false)}
        size="xs"
        title="Delete Confirmation"
        withCloseButton
        centered
      >
        <Text size="sm">Are you sure you want to delete this item?</Text>
        <Button
          variant="filled"
          color="red"
          onClick={handleDelete}
          style={{ marginTop: "16px" }}
        >
          Confirm Delete
        </Button>
      </Modal>
    </>
  );
}
