import React, { useState } from 'react';
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/ModalCurso';
import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal';
import { useCookies } from 'react-cookie';

function DataTable(props) {
  const [cookies, , removeCookie] = useCookies(['jwt']);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const toggleDeleteModal = () => {
    setDeleteModalOpen(!isDeleteModalOpen);
  };

  const confirmDeleteItem = () => {
    if (deleteItemId) {
      fetch(`http://localhost:8000/cursos/${deleteItemId}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.jwt}`,
        },
      })
        .then((response) => response.json())
        .then((item) => {
          props.deleteItemFromState(deleteItemId);
          setDeleteItemId(null);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          toggleDeleteModal();
        });
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteItemId(id);
    toggleDeleteModal();
  };

  const items = props.items.map((item) => (
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>{item.curso}</td>
      <td>
        <div className="d-flex">
          <ModalForm buttonLabel="Editar" item={item} updateState={props.updateState} />
          <Button color="danger" onClick={() => handleDeleteClick(item.id)} className="ml-2">
            Delete
          </Button>
        </div>
      </td>
    </tr>
  ));

  return (
    <Table responsive hover striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>{items}</tbody>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        toggle={toggleDeleteModal}
        onConfirm={confirmDeleteItem}
      />
    </Table>
  );
}

export default DataTable;
