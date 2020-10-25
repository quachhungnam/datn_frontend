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
import { getuser_service, update_user } from "../services/user_service";
import { changepass_srv } from "../services/auth_service";
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
    } catch (e) {}
  };

  const handle_input = (event) => {
    const { name, value } = event.target;
    set_user({ ...user, [name]: value });
  };

  const on_update_user = async (event) => {
    event.preventDefault();
    const is_phone_number = validator.isMobilePhone(user.phone_number);
    const is_email = validator.isEmail(user.email);
    if (!is_phone_number || !is_email) {
      alert("Kiểm tra lại thông tin");
      return;
    }
    let rs = await update_user(user);
    if (rs.id) {
      alert("Sửa thông tin thành công");
    }
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
    let rs = await changepass_srv(password);
    if (rs.status == "success") {
      alert("Đổi mật khẩu thành công");
      return;
    }
    alert("Thất bại!");
    // alert(JSON.stringify(password));
    // event.preventDefault();
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
          {show_infor == true ? (
            <Form method="POST" onSubmit={on_update_user}>
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
                Cacel
              </Button>
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
