import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import ModalForm from '../../Components/Modals/ModalCurso';
import DataTable from '../../Components/Tables/DataTableCurso';
import { CSVLink } from 'react-csv';
import Template from '../template';
import { useCookies } from 'react-cookie';

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
  };

  const updateState = item => {
    const itemIndex = items.findIndex(data => data.id === item.id);
    const newArray = [...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1)];
    setItems(newArray);
  };

  const deleteItemFromState = id => {
    const updatedItems = items.filter(item => item.id !== id);
    setItems(updatedItems);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <Template pageTitle="CRUD Cursos">
      {loading ? (
        <p>Loading cursos...</p>
      ) : (
        <>
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
