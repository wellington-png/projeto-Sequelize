// alunos.jsx
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import Template from '../template';
import ModalForm from '../../Components/Modals/Modal';
import DataTable from '../../Components/Tables/DataTable';
import { useCookies } from 'react-cookie';
import toast, { Toaster } from 'react-hot-toast';


const notify = (mensagem, tipo) => {
  console.log('notify', mensagem, tipo);
  switch (tipo) {
    case 'sucesso':
      console.log('sucesso');
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

function Alunos() {
  const [items, setItems] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const getItems = () => {
    fetch('http://localhost:8000/alunos', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.jwt}`,
      },
    })
      .then((response) => response.json())
      .then((items) => setItems(items))
      .catch((err) => console.log(err));
  };

  const addItemToState = (item) => {
    setItems([...items, item]);
    notify('Aluno adicionado com sucesso', 'sucesso');
  };

  const updateState = (item) => {
    const itemIndex = items.findIndex((data) => data.id === item.id);
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)];
    setItems(newArray);
    notify('Aluno atualizado com sucesso', 'sucesso');
  };

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    notify('Aluno deletado com sucesso', 'sucesso');
  };

  useEffect(() => {
    getItems();
    console.log('Alunos');
    notify('Bem vindo a pagina de alunos', 'sucesso');

  }, []);



  useEffect(() => {
    if (!cookies.jwt) {
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }
  }, [cookies.jwt]);
  if (!cookies.jwt) {

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">Acesso negado!</h4>
              <p>Você precisa estar logado para acessar esta página.</p>
              <hr />
              <p className="mb-0">Você será redirecionado para a página de login.</p>
            </div>
          </div>
        </div>
      </div>
    );
  } else {

    return (
      <Template pageTitle="CRUD Alunos">
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
              data={items}
              onClick={() => {
                notify('Download CSV', 'sucesso');
              }
              }
            >
              Download CSV
            </CSVLink>
            <ModalForm buttonLabel="Add Item" addItemToState={addItemToState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Link to="/cursos">Go to Cursos</Link>
          </Col>
        </Row>
      </Template>
    );
  }
}

export default Alunos;
