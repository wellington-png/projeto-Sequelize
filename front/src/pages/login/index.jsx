// Login.js
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { login } from '../../services/AuthService';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [cookies, setCookie] = useCookies(['jwt']);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    senha: '',
  });

  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(loginData);

      setCookie('jwt', data.accessToken, { path: '/' });
      navigate('/alunos');

    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Erro ao fazer login, verifique suas credenciais.');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <Card>
            <CardBody>
              <CardTitle tag="h2">Login</CardTitle>
              {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
              <Form onSubmit={handleLogin}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input type="text" name="email" id="email" onChange={handleChange} value={loginData.email} />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Senha</Label>
                  <Input type="password" name="senha" id="password" onChange={handleChange} value={loginData.senha} />
                </FormGroup>
                <Button color="primary" type="submit">
                  Login
                </Button>
              </Form>
              <br />
              <CardText>
                <Link to="/register" className="btn btn-link">
                  Faça seu cadastro
                </Link>
              </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
