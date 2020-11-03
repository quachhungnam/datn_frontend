import React, { useState } from "react";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import validator from "validator";
import { change_password_api } from "../api/auth_api";
export default function ChangePassword(props) {
  const init_password = {
    old_password: "",
    new_password: "",
    confirmpassword: "",
  };
  const [password, set_password] = useState(init_password);
  const [isLoading, setisLoading] = useState(false);
  const handle_input = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    set_password({ ...password, [name]: value });
  };

  const action_change_pass = async (event) => {
    event.preventDefault();

    if (password.old_password === "" || password.new_password === "") {
      alert("Vui lòng nhập đầy đủ các trường!");
      return;
    }

    const is_same_pass = validator.equals(
      password.new_password,
      password.confirmpassword
    );
    if (!is_same_pass) {
      alert("Xác nhận mật khẩu ko đúng!");
      return;
    }
    setisLoading(true);
    // props.change_password(password);
    let rs = await change_password_api(password);
    setisLoading(false);
    if (rs.status === "success") {
      alert("Đổi mật khẩu thành công");
      set_password(init_password);
      return;
    }
    alert("Thất bại!");
  };
  const clean_pass = (event) => {
    set_password(init_password);
    // event.preventDefault();
    // const { name, value } = event.target;
    // set_password({ ...password, [name]: value });
  };
  return (
    <Form onSubmit={action_change_pass}>
      <Form.Group as={Row}>
        <Form.Label column sm={2}>
          <b>Mật khẩu cũ</b>
        </Form.Label>
        <Col sm={5}>
          <Form.Control
            //   disabled={userState.isloading}
            name="old_password"
            type="password"
            placeholder="Mật khẩu cũ"
            onChange={handle_input}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          <b>Mật khẩu mới</b>
        </Form.Label>
        <Col sm={5}>
          <Form.Control
            //   disabled={userState.isloading}
            name="new_password"
            type="password"
            placeholder="Mật khẩu mới"
            onChange={handle_input}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="formHorizontalPassword">
        <Form.Label column sm={2}>
          <b>Xác nhận mật khẩu</b>
        </Form.Label>
        <Col sm={5}>
          <Form.Control
            //   disabled={userState.isloading}
            name="confirmpassword"
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            onChange={handle_input}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          {/* <Button type="submit" disabled={userState.isloading}>
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
        </Button> */}
          <Button type="submit">Đổi mật khẩu</Button>
          &nbsp;
          <Button onClick={clean_pass} type="reset" className="bg-info">
            Xóa
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
        </Col>
      </Form.Group>
    </Form>
  );
}
