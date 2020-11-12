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
  Nav,
  Spinner,
} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { get_user_api, update_user_api } from "../api/user_api";
import { change_password_api } from "../api/auth_api";
import ChangePassword from "./ChangePassword";
import { AuthContext } from "../context/AuthContext";
import validator from "validator";

function Infor() {
  let init_user = {
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
  const [show_infor, set_show_infor] = useState(true);
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    get_user();
  }, []);

  const get_user = async () => {
    try {
      setisLoading(true)
      let rs = await get_user_api(userState.user.user_id);
      setisLoading(false)
      set_user(rs);

    } catch (e) { }
  };

  const handle_input = (event) => {
    const { name, value } = event.target;
    set_user({ ...user, [name]: value });
  };

  const on_update_user = async (event) => {
    event.preventDefault();
    setisLoading(true);
    const is_phone_number = validator.isMobilePhone(user.phone_number);
    const is_email = validator.isEmail(user.email);
    if (!is_phone_number || !is_email) {
      alert("Kiểm tra lại thông tin");
      setisLoading(false);
      return;
    }
    let rs = await update_user_api(user);
    if (rs.id) {
      alert("Sửa thông tin thành công");
    }
    setisLoading(false);
  };
  const show_information = (event) => {
    event.preventDefault();
    set_show_infor(true);
  };
  const show_changepassword = (event) => {
    event.preventDefault();
    set_show_infor(false);
  };

  const change_password = async (password) => {
    let rs = await change_password_api(password);
    if (rs.status === "success") {
      alert("Đổi mật khẩu thành công");
      return;
    }
    alert("Thất bại!");
  };

  return (
    <Container>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#1">
            <Nav.Item>
              {/* <Button>Thông tin</Button> */}
              <Nav.Link onClick={show_information} href="#1">
                <b>Thông tin cá nhân</b>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={show_changepassword} href="#2">
                <b>Mật khẩu</b>
              </Nav.Link>
            </Nav.Item>
          </Nav>

        </Card.Header>
        <Card.Body>
          {show_infor === true ? (
            <Form method="POST" onSubmit={on_update_user}>
              <Form.Row>
                <Col sm={2}>
                  <Figure>
                    <Figure.Image
                      width={171}
                      height={180}
                      alt="171x180"
                      src="data:image/jpeg;base64,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"
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
                    defaultValue={user.gender === true ? 1 : 0}
                    disabled
                  >
                    <option value={-1}>---</option>
                    <option value={1}>Nam</option>
                    <option value={0}>Nữ</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="firstname">
                  <Form.Label>Năm sinh</Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={user.birthday}
                    disabled
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email"
                    defaultValue={user.email}
                    name="email"
                    onChange={handle_input}
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="phonenumber">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    placeholder="Nhập số điện thoại"
                    defaultValue={user.phone_number}
                    name="phone_number"
                    onChange={handle_input}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formGridAddress1">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  placeholder="Nhập địa chỉ"
                  defaultValue={user.address}
                  name="address"
                  onChange={handle_input}
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
                Cancel
              </Button>
              {isLoading ? (
                <Button variant="primary" size="sm" disabled>
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
            </Form>
          ) : (
              <ChangePassword change_password={change_password}></ChangePassword>
            )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Infor;
