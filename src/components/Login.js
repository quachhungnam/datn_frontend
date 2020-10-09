import React, { useState, useContext } from "react";
import { Form, Button, Col, Row, Container, InputGroup } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import { AuthContexts } from '../actions/auth';
import { login } from '../services/auth_service'
// import { action_login2 } from '../reducer/auth_reducer'
export default function Login() {
  const [state, dispatch] = useContext(AuthContexts);
  const init_user = { username: null, password: null };
  const [user, set_user] = useState(init_user);

  const handle_input = (event) => {
    const { name, value } = event.target;
    set_user({ ...user, [name]: value });
  };

  const action_login = async (user) => {
    try {
      const res = await login(user);
      if (res.access) {
        localStorage.setItem("user", JSON.stringify(res));
        dispatch({ type: "LOG_IN", token: res.access });
      } else {
        alert("Sai tai khoan hoac mat khau");
      }
    } catch (e) {
      console.log(e);
    }
  };


  async function handleSubmit(event) {
    event.preventDefault();
    action_login(user)
  }

  if (state.accessToken != null) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Tài khoản
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              name="username"
              type="username"
              placeholder="Tài khoản"
              onChange={handle_input}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Mật khẩu
          </Form.Label>
          <Col sm={5}>
            <Form.Control
              name="password"
              type="password"
              placeholder="Mật khẩu"
              onChange={handle_input}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Lưu mật khẩu" />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Đăng nhập</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
}
