import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const DeleteConfirmationModal = ({ isOpen, toggle, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Confirmação</ModalHeader>
      <ModalBody>
        Tem certeza que deseja excluir este item permanentemente?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancelar
        </Button>
        <Button color="danger" onClick={onConfirm}>
          Confirmar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmationModal;
