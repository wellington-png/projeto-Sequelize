import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useCookies } from 'react-cookie';


function AddEditFormCurso(props) {
  const [form, setValues] = useState({
    id: 0,
    curso: '',
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);


  const submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:8000/cursos', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.jwt}`
      },
      body: JSON.stringify({
        curso: form.curso,
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          props.addItemToState(item[0])
          props.toggle()
        } else {
          console.log('failure')
          window.location.reload()

        }
      })
      .catch(err => console.log(err))
  }

  const submitFormEdit = e => {
    e.preventDefault()
    fetch(`http://localhost:8000/cursos/${form.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookies.jwt}`
      },
      body: JSON.stringify({
        curso: form.curso,
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          // console.log(item[0])
          props.updateState(item[0])
          props.toggle()
        } else {
          window.location.reload()
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (props.item) {
      const { id, curso } = props.item
      setValues({ id, curso })
    }
  }, false)

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="first">Nome</Label>
        <Input type="text" name="curso" id="first" onChange={onChange} value={form.curso === null ? '' : form.curso} />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
  )
}

export default AddEditFormCurso