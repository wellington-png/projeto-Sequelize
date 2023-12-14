import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
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
  const [emailInputColor, setEmailInputColor] = useState('');
  const [message, setMessage] = useState(null);

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearMessage = () => {
    setMessage(null);
  };

  const showMessage = (msg, color) => {
    setMessage({ msg, color });
  };

  const submitFormAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/alunos', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.jwt}`,
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
        showMessage('Email already exists. Please use a different email.', 'danger');
        setEmailInputColor('red');
      } else if (item.id) {
        props.addItemToState(item);
        props.toggle();
        showMessage('Aluno adicionado com sucesso.', 'success');
      } else {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      showMessage('Erro ao adicionar aluno. Verifique os dados e tente novamente.', 'danger');
    }
  };

  const submitFormEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/alunos/${form.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.jwt}`,
        },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          cur_id: form.cur_id,
        }),
      });

      const item = await response.json();

      if (item && item.Message && item.Message === 'Email already exists') {
        showMessage('Email already exists. Please use a different email.', 'danger');
        setEmailInputColor('red');
      } else if (item.id) {
        props.updateState(item);
        props.toggle();
        showMessage('Aluno atualizado com sucesso.', 'success');
      } else {
        console.log('failure');
        // window.location.reload();
      }
    } catch (err) {
      console.log(err);
      showMessage('Erro ao atualizar aluno. Verifique os dados e tente novamente.', 'danger');
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
    fetch('http://localhost:8000/cursos', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.jwt}`,
      },
    })
      .then((response) => response.json())
      .then((items) => setCursos(items))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCursos();
  }, []);

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      {message && (
        <Alert color={message.color} onClick={clearMessage} style={{ cursor: 'pointer' }}>
          {message.msg}
        </Alert>
      )}
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
      <Button>Salvar</Button>
    </Form>
  );
}

export default AddEditForm;
