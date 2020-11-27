import React, { useState, useContext } from "react";
import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Spinner,
  Badge,
  Card,
  
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { loginAction } from "../actions/authAction";
import { AuthContext } from "../context/AuthContext";
import Footer from "./Footer";

export default function Login() {
  const [userState, dispatch] = useContext(AuthContext);
  const initUser = { username: null, password: null };
  const [user, setUser] = useState(initUser);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    loginAction(dispatch, user);
  };

  // const resetUser = () => {
  //   setUser(initUser);
  // };

  if (userState.user !== "") {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Container>
        <br></br>
        <Card>
          <Card.Header>
            <Card.Title>
        

             
              Thông tin đăng nhập
              {userState.isloading ? (
                <Button
                  className="float-md-right"
                  variant="primary"
                  size="sm"
                  disabled
                >
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                ""
              )}
            
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleLogin}>
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
                    onChange={handleInput}
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
                    onChange={handleInput}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button variant="success" type="submit" disabled={userState.isloading}>
                    Đăng nhập
                  </Button>
                  &nbsp;
                  {/* <Button onClick={resetUser} type="reset" className="bg-info">
                    Xóa
                  </Button> */}
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Col sm={{ span: 10, offset: 2 }}>
                  {" "}
                  {userState.errorMessage != null ? (
                    <Badge pill variant="danger">
                      {userState.errorMessage}
                    </Badge>
                  ) : (
                    ""
                  )}
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <br></br>
      <Footer />
    </>
  );
}
