// alunos.jsx
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';
import Template from '../template';
import ModalForm from '../../Components/Modals/Modal';
import DataTable from '../../Components/Tables/DataTable';
import { useCookies } from 'react-cookie';

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
  };

  const updateState = (item) => {
    const itemIndex = items.findIndex((data) => data.id === item.id);
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)];
    setItems(newArray);
  };

  const deleteItemFromState = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  useEffect(() => {
    getItems();
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
