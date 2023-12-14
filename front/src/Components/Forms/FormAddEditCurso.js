import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useCookies } from 'react-cookie';

function AddEditFormCurso(props) {
  const [form, setValues] = useState({
    id: 0,
    curso: '',
  });

  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
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

  const submitFormAdd = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/cursos', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.jwt}`,
      },
      body: JSON.stringify({
        curso: form.curso,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (item.curso) {
          props.addItemToState(item);
          props.toggle();
          showMessage('Curso adicionado com sucesso.', 'success');
        } else {
          console.log('failure');
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        showMessage('Erro ao adicionar curso. Verifique os dados e tente novamente.', 'danger');
      });
  };

  const submitFormEdit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/cursos/${form.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.jwt}`,
      },
      body: JSON.stringify({
        curso: form.curso,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (item.curso) {
          const { id, curso } = item;
          props.updateState({ id, curso });
          props.toggle();
          showMessage('Curso atualizado com sucesso.', 'success');
        } else {
          console.log('failure');
          // window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        showMessage('Erro ao atualizar curso. Verifique os dados e tente novamente.', 'danger');
      });
  };

  useEffect(() => {
    if (props.item) {
      const { id, curso } = props.item;
      setValues({ id, curso });
    }
  }, [props.item]);

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      {message && (
        <Alert color={message.color} onClick={clearMessage} style={{ cursor: 'pointer' }}>
          {message.msg}
        </Alert>
      )}
      <FormGroup>
        <Label for="first">Nome</Label>
        <Input type="text" name="curso" id="first" onChange={onChange} value={form.curso === null ? '' : form.curso} />
      </FormGroup>
      <Button>Salvar</Button>
    </Form>
  );
}

export default AddEditFormCurso;
