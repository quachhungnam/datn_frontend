/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  Col,
  Container,
  Figure,
  Card,
  ListGroup,
  Nav,
} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { getuser_service } from "../services/user_service";
import { AuthContext } from "../context/AuthContext";

function Infor() {
  const init_user = {
    id: 2,
    username: "",
    first_name: "",
    last_name: "",
    gender: -1,
    birthday: null,
    email: "",
    phone_number: "",
    address: "",
  };
  const [userState, dispatch] = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [user, set_user] = useState(init_user);

  useEffect(() => {
    get_user();
  }, []);

  const get_user = async () => {
    try {
      let rs = await getuser_service(
        userState.user.access,
        userState.user.user_id
      );
      set_user(rs);
    } catch (e) { }
  };
  return (

    <Container>
      <Card>
        <br></br>

        <Card.Body>
          <Form>
            <Form.Row>
              <Col sm={2}>
                <Figure>
                  <Figure.Image
                    width={171}
                    height={180}
                    alt="171x180"
                    src="https://sohanews.sohacdn.com/thumb_w/660/2018/10/1/photo1538392226601-15383922266012085392896.jpg"
                  />
                  {/* <Figure.Caption>
            Nulla vitae elit libero, a pharetra augue mollis interdum.
          </Figure.Caption> */}
                </Figure>
              </Col>
              <Col>{user.username}</Col>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="lastname">
                <Form.Label>Họ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập họ và tên đệm"
                  defaultValue={user.last_name}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} controlId="firstname">
                <Form.Label>Tên</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nhập tên"
                  defaultValue={user.first_name}
                  disabled
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Giới tính</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={user.gender == true ? 1 : 0}
                  disabled
                >
                  <option value={-1}>---</option>
                  <option value={1}>Nam</option>
                  <option value={0}>Nữ</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} controlId="firstname">
                <Form.Label>Năm sinh</Form.Label>
                <Form.Control type="date" defaultValue={user.birthday} disabled />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Nhập email"
                  defaultValue={user.email}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="phonenumber">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control
                  placeholder="Nhập số điện thoại"
                  defaultValue={user.phone_number}
                />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control
                placeholder="Nhập địa chỉ"
                defaultValue={user.address}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Lưu
          </Button>
          &nbsp;
          <Button variant="danger" type="reset">
              Reset
          </Button>
          &nbsp;
          <Button variant="danger" type="reset">
              Cacel
          </Button>
          </Form>
        </Card.Body>

      </Card>
    </Container>

  );
}

export default Infor;
