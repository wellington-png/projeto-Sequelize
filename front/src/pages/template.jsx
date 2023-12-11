// Template.jsx
import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useCookies } from 'react-cookie';

const Template = ({ pageTitle, children }) => {
  const [cookies, setCookie,removeCookie] = useCookies(['jwt']);

    const handleLogout = () => {
        removeCookie('jwt', { path: '/' });
    };
    return (
        <Container className="App">
            <Row>
                <Col>
                    <h1 style={{ margin: "20px 0" }}>{pageTitle}</h1>
                    <button className='btn' onClick={handleLogout}>Logout </button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Col>{children}</Col>
                </Col>
            </Row>
        </Container>
    );
};

export default Template;