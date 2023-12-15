import React from 'react';
import { Container, Row, Col, Button, Nav, NavItem, NavLink } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Template = ({ pageTitle, children }) => {
  const [cookies, , removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('jwt', { path: '/' });
    navigate('/');
  };

  return (
    <Container fluid className="App">
      <Row>
        <Col md={2} className="sidebar bg-dark text-light" style={{ height: '100vh' }}>
          <Nav vertical className="bg-dark p-3">
            <NavItem>
              <NavLink tag={Link} to="/cursos" className="text-light">
                Cursos
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/alunos" className="text-light">
                Alunos
              </NavLink>
            </NavItem>
          </Nav>
          <Button color="danger" className="mt-3" onClick={handleLogout}>
            Sair
          </Button>
        </Col>
        <Col md={10} className="content">
          <h1 className="text-center" style={{ margin: '20px 0' }}>
            {pageTitle}
          </h1>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default Template;
