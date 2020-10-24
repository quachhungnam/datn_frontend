import React, { useState, useContext } from "react";
import { Form, Button, Col, Row, Container, Spinner, Badge, Card } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { login_action } from '../actions/auth_action'
import { AuthContext } from '../context/AuthContext'
export default function Login() {
  const [userState, dispatch] = useContext(AuthContext);
  const init_user = { username: null, password: null };
  const [user, set_user] = useState(init_user);

  const handle_input = (event) => {
    const { name, value } = event.target;
    set_user({ ...user, [name]: value });
  };

  async function handleLogin(event) {
    event.preventDefault();
    login_action(dispatch, user)

  }


  if (userState.user !== "") {
    return <Redirect to="/" />;
  }

  return (
  
      <Container>
        {/* className="justify-content-center" */}
        <br></br>
        <Card>
          <Card.Header>
            <Card.Title>Thông tin đăng nhập

          {
                userState.errorMessage != null
                  ?
                  <Badge pill variant="danger">
                    {userState.errorMessage}
                  </Badge>
                  : ""
              }
            </Card.Title>
          </Card.Header>
          <Card.Body >
            <Form onSubmit={handleLogin} >
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  <b>Tài khoản</b>
                </Form.Label>
                <Col sm={5}>
                  <Form.Control
                    disabled={userState.isloading}
                    name="username"
                    type="username"
                    placeholder="Tài khoản"
                    onChange={handle_input}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={2}>
                  <b>Mật khẩu</b>
                </Form.Label>
                <Col sm={5}>
                  <Form.Control
                    disabled={userState.isloading}
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={handle_input}
                  />
                </Col>
              </Form.Group>

              {/* <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Lưu mật khẩu" />
          </Col>
        </Form.Group> */}

              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button type="submit" disabled={userState.isloading}>
                    {userState.isloading ?
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      : ""
                    }
              Đăng nhập
              </Button>
              &nbsp;
                <Button type="reset" className="bg-info">
                    Xóa
                </Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
          <br></br>
        </Card>
      </Container >
    

  );
}
