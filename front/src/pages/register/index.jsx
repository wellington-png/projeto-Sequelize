// Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { registrar } from '../../services/AuthService';
import { useCookies } from 'react-cookie';

const Register = () => {
  const [cookies] = useCookies(['jwt']);
  const [registerData, setRegisterData] = useState({
    nome: '',
    email: '',
    senha: '',
  });

  const navigate = useNavigate();

  const [registrationError, setRegistrationError] = useState(null);

  const handleChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { nome, email, senha } = registerData;

    if (!nome || !email || !senha) {
      setRegistrationError('Todos os campos são obrigatórios');
      return false;
    }

    if (!isValidEmail(email)) {
      setRegistrationError('Email inválido');
      return false;
    }

    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const data = await registrar(registerData);

      console.log('Registration successful:', data);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      setRegistrationError('Erro ao realizar o cadastro, verifique suas credenciais.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h2">Register</CardTitle>
              {registrationError && <p style={{ color: 'red' }}>{registrationError}</p>}
              <Form onSubmit={handleRegister}>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <Input type="text" name="nome" id="name" onChange={handleChange} value={registerData.nome} />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="email" name="email" id="email" onChange={handleChange} value={registerData.email} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input type="password" name="senha" id="password" onChange={handleChange} value={registerData.senha} />
                </FormGroup>
                <Button color="success" type="submit">
                  Register
                </Button>
              </Form>
              <br />
              <CardText>
                <Link to="/" className="btn btn-link">
                  Faça login
                </Link>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
