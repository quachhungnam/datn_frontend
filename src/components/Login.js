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
  Alert,
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

  if (userState.user !== "") {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Container fluid>
        <Card>
          <Card.Body>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <Card>
                  <Card.Body>
                    <Alert variant="success">
                      <h4 className="text-center"> ĐĂNG NHẬP</h4>
                    </Alert>
                    <hr />
                    <Form onSubmit={handleLogin}>
                      <Row>
                        <Col md={3} className="font-weight-bold">
                          Tài Khoản:
                        </Col>
                        <Col>
                          <Form.Control
                            disabled={userState.isloading}
                            name="username"
                            type="username"
                            placeholder="Tài khoản"
                            onChange={handleInput}
                          />
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col md={3} className="font-weight-bold">
                          Mật khẩu:
                        </Col>
                        <Col>
                          {" "}
                          <Form.Control
                            disabled={userState.isloading}
                            name="password"
                            type="password"
                            placeholder="Mật khẩu"
                            onChange={handleInput}
                          />
                        </Col>
                      </Row>
                      <hr />
                      <Row>
                        <Col md={{ offset: 3 }}>
                          <Button
                            variant="success"
                            type="submit"
                            disabled={userState.isloading}
                          >
                            Đăng nhập
                          </Button>
                        </Col>
                        <Col>
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
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={{ offset: 3 }}>
                          {userState.errorMessage != null ? (
                            <h5>
                              <Badge pill variant="danger">
                                {userState.errorMessage}
                              </Badge>
                            </h5>
                          ) : (
                              ""
                            )}
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <br></br>
      <Footer />
    </>
  );
}
