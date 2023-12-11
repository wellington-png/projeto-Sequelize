import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useCookies } from 'react-cookie';


function AddEditForm(props) {
  const [form, setValues] = useState({
    id: 0,
    nome: '',
    email: '',
    createdAt: '',
    updatedAt: '',
    cur_id: '',
  });

  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);


  const [emailInputColor, setEmailInputColor] = useState(''); // State for email input color

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitFormAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/alunos', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.jwt}`
        },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          createdAt: form.createdAt,
          updatedAt: form.updatedAt,
          cur_id: form.cur_id,
        }),
      });

      const item = await response.json();

      if (item && item.Message && item.Message === 'Email already exists') {
        // Display an alert
        alert('Email already exists. Please use a different email.');

        // Change the color of the email input
        setEmailInputColor('red'); // Set the color to red or any other color you prefer
      } else if (Array.isArray(item)) {
        props.addItemToState(item[0]);
        props.toggle();
      } else {
        console.log('failure');
        window.location.reload();

      }
    } catch (err) {
      console.log(err);
    }
  };

  const submitFormEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/alunos/${form.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.jwt}`
        },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          cur_id: form.cur_id,
        }),
      });

      const item = await response.json();

      if (item && item.Message && item.Message === 'Email already exists') {
        // Display an alert
        alert('Email already exists. Please use a different email.');

        // Change the color of the email input
        setEmailInputColor('red'); // Set the color to red or any other color you prefer
      } else if (Array.isArray(item)) {
        props.updateState(item[0]);
        props.toggle();
      } else {
        console.log('failure');
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.item) {
      const { id, nome, email, createdAt, updatedAt, cur_id } = props.item;
      setValues({ id, nome, email, createdAt, updatedAt, cur_id });
    }
  }, [props.item]);

  const [cursos, setCursos] = useState([]);

  const getCursos = () => {
    fetch('http://localhost:8000/cursos',
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.jwt}`
        }
      },)
      .then((response) => response.json())
      .then((items) => setCursos(items))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCursos();
  }, []);

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="first">Nome</Label>
        <Input type="text" name="nome" id="first" onChange={onChange} value={form.nome === null ? '' : form.nome} />
      </FormGroup>
      <FormGroup>
        <Label for="last">Email</Label>
        <Input
          type="text"
          name="email"
          id="last"
          onChange={onChange}
          value={form.email === null ? '' : form.email}
          style={{ borderColor: emailInputColor }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="cursoSelect">Select Curso</Label>
        <Input type="select" name="cur_id" id="cursoSelect" onChange={onChange} value={form.cur_id === null ? '' : form.cur_id}>
          <option value="">Select a Curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.curso}
            </option>
          ))}
        </Input>
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  );
}

export default AddEditForm;
