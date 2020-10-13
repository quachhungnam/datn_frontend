/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Form,
  Nav,
  NavDropdown,
  FormControl,
  Button,
  Table,
  Col,
  Container,
  Row,
  InputGroup,
  Figure,
} from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function Infor() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <Container>
      <br></br>
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
          <Col>Nguyễn Văn Anh</Col>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="lastname">
            <Form.Label>Họ</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập họ và tên đệm"
              defaultValue="Nguyễn Văn Nam"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="firstname">
            <Form.Label>Tên</Form.Label>
            <Form.Control type="text" placeholder="Nhập tên" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>Giới tính</Form.Label>
            <Form.Control as="select" defaultValue="Choose...">
              <option>---</option>
              <option>Nam</option>
              <option>Nữ</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="firstname">
            <Form.Label>Năm sinh</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Nhập email" />
          </Form.Group>
          <Form.Group as={Col} controlId="phonenumber">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control placeholder="Nhập số điện thoại" />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="formGridAddress1">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control placeholder="Nhập địa chỉ" />
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
    </Container>
  );
}

export default Infor;
