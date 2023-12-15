import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import ModalForm from '../../Components/Modals/ModalCurso';
import DataTable from '../../Components/Tables/DataTableCurso';
import { CSVLink } from 'react-csv';
import Template from '../template';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';


const notify = (mensagem, tipo) => {
  switch (tipo) {
    case 'sucesso':
      toast.success(mensagem);
      break;
    case 'erro':
      toast.error(mensagem);
      break;
    case 'aviso':
      toast(mensagem);
      break;
    default:
      break;
  }
}

function Cursos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  const getItems = () => {
    fetch('http://localhost:8000/cursos',
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.jwt}`,
        },
      })
      .then(response => response.json())
      .then(items => {
        setItems(items);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching cursos:', err);
        setLoading(false);
      });
  };

  const addItemToState = item => {
    setItems([...items, item]);
    notify('Curso adicionado com sucesso', 'sucesso');
  };

  const updateState = item => {
    const itemIndex = items.findIndex(data => data.id === item.id);
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)];
    setItems(newArray);
    notify('Curso atualizado com sucesso', 'sucesso');
  };

  const deleteItemFromState = id => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
    notify('Curso deletado com sucesso', 'sucesso');
  };

  useEffect(() => {
    getItems();
    console.log('useEffect')
    notify('Bem vindo a pagina de cursos', 'sucesso');
  }, []);

  return (
    <Template pageTitle="CRUD Cursos">
      {loading ? (
        <p>Loading cursos...</p>
      ) : (
        <>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: '',
              duration: 5000,
              style: {
                background: '#363636',
                color: '#fff',
              },

              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: 'green',
                  secondary: 'black',
                },
              },
            }}
          />
          <Row>
            <Col>
              <DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
            </Col>
          </Row>
          <Row>
            <Col>
              <CSVLink
                filename={'db.csv'}
                color="primary"
                style={{ float: 'left', marginRight: '10px' }}
                className="btn btn-primary"
                data={items}>
                Download CSV
              </CSVLink>
              <ModalForm buttonLabel="Add Item" addItemToState={addItemToState} />
            </Col>
          </Row>
        </>
      )}
    </Template>
  );
}

export default Cursos;
