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
  Row,
  Alert,
  Badge,
} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import {
  getUserService,
  updateUserService,
  getStudentService,
} from "../services/userService";
// import { changePassword } from "../services/authService";
import ChangePassword from "./ChangePassword";
import { AuthContext } from "../context/AuthContext";
import validator from "validator";
import { standarDate } from '../utils/standardDate'


function Infor() {
  let initUser = {
    id: null,
    username: "",
    first_name: "",
    last_name: "",
    gender: -1,
    birthday: null,
    email: "",
    phone_number: "",
    address: "",
    avatar: "",
  };
  const [userState, dispatch] = useContext(AuthContext);
  const [user, setUser] = useState(initUser);
  const [moreInfor, setMoreInfor] = useState(null);
  const [showInfor, setShowInfor] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const getUserInfor = async () => {
    try {
      setisLoading(true);
      let rs = await getUserService(userState.user.user_id);
      if (rs.error) {
        setMessage("Không thể kết nối đến Server!")
        setisLoading(false);
        return
      }
      if (userState.user.is_teacher === false) {
        const rsMoreInfor = await getStudentService(userState.user.user_id);
        setMoreInfor(rsMoreInfor);
      }
      setisLoading(false);
      setUser(rs);
    } catch (e) { }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const onUpdateUser = async (event) => {
    event.preventDefault();
    setisLoading(true);
    const is_phone_number = validator.isMobilePhone(user.phone_number);
    const is_email = validator.isEmail(user.email);
    if (!is_phone_number || !is_email) {
      setMessage("Kiểm tra lại số điện thoại và Email!");
      setisLoading(false);
      return;
    }
    const newInfor = {
      id: user.id,
      email: user.email,
      phone_number: user.phone_number,
      address: user.address,
    };
    const rs = await updateUserService(newInfor);
    if (rs.id) {
      setMessage("Đổi thông tin thành công!");
    }
    setisLoading(false);
  };

  const onShowInformation = (event) => {
    event.preventDefault();
    setShowInfor(true);
  };

  const onShowChangePassword = (event) => {
    event.preventDefault();
    setShowInfor(false);
  };

  const showMessage = () => {
    if (message != null) {
      return (
        <h5>
          <Badge variant="danger">{message}</Badge>
        </h5>
      );
    }
  };

  const showStudentInfor = () => {
    if (moreInfor != null && userState.user.is_teacher === false) {
      return (
        <>
          <Alert variant="white">
            <Row>
              <Col md={2}>Khóa:</Col>
              <Col>
                <b className="text-uppercase">{moreInfor.course_year}</b>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={2}>Trạng thái:</Col>
              <Col>
                <b className="text-uppercase">
                  {moreInfor.is_graduate === true
                    ? "Đã tốt nghiệp"
                    : "Chưa tốt nghiệp"}
                </b>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={2}>Lớp:</Col>
              <Col>
                <b className="text-uppercase">
                  {moreInfor.classes != null
                    ? moreInfor.classes.class_name +
                    "- Khóa: " +
                    moreInfor.classes.course_year
                    : "Chưa phân lớp"}
                </b>
              </Col>
            </Row>
          </Alert>
          <hr />
        </>
      );
    }

    if (moreInfor != null && userState.user.is_teacher === true) {
      return (
        <>
          <Alert variant="white">
            <Row>
              <Col md={2}>Bộ môn:</Col>
              <Col>
                <b className="text-uppercase">
                  {moreInfor.department.department_name}
                </b>
              </Col>
            </Row>
          </Alert>
          <hr />
        </>
      );
    }
    return "";
  };

  useEffect(() => {
    getUserInfor();
  }, []);

  return (
    <Container>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#1">
            <Nav.Item>
              <Nav.Link onClick={onShowInformation} href="#1">
                <b>Thông tin cá nhân</b>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={onShowChangePassword} href="#2">
                <b>Mật khẩu</b>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          {showInfor === true ? (
            <Form method="POST" onSubmit={onUpdateUser}>
              <Form.Row>
                <Col sm={2}>
                  {/* AVATAR */}
                  <Figure>
                    <Figure.Image
                      width={171}
                      height={180}
                      alt="171x180"
                      src={user.avatar}
                    />
                  </Figure>
                </Col>
                {/* BASIC INFOR */}
                <Col>
                  <Alert variant="success">
                    <Row>
                      <Col md={2}>
                        {userState.user.is_teacher === false
                          ? "Mã học sinh:"
                          : "Mã giáo viên:"}
                      </Col>
                      <Col>
                        <b className="text-uppercase">{user.username}</b>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={2}>Họ và tên:</Col>
                      <Col>
                        <b className="text-uppercase">
                          {user.last_name + " " + user.first_name}
                        </b>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={2}>Giới tính:</Col>
                      <Col>
                        <b>
                          {" "}
                          {user.gender === 1
                            ? "Nam"
                            : user.gender === 0
                              ? "Nữ"
                              : "Khác"}
                        </b>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={2}>Năm sinh:</Col>
                      <Col>
                        <b>{standarDate(user.birthday)}</b>
                      </Col>
                    </Row>
                  </Alert>
                </Col>
              </Form.Row>
              <hr />
              {/* MORE INFOR */}
              {showStudentInfor()}
              {/* DOI THONG TIN CA NHAN */}
              <Alert variant="white">
                <Row>
                  <Col>
                    <Form.Group as={Row}>
                      <Form.Label column md={2}>
                        <b>Email</b>
                      </Form.Label>
                      <Col>
                        <Form.Control
                          type="email"
                          placeholder="Nhập email"
                          defaultValue={user.email}
                          name="email"
                          onChange={handleInput}
                        />
                      </Col>
                    </Form.Group>
                  </Col>

                  <Col md={{ offset: 1 }}>
                    <Form.Group as={Row}>
                      <Form.Label column md={2}>
                        <b>Số ĐT</b>
                      </Form.Label>
                      <Col>
                        <Form.Control
                          placeholder="Nhập số điện thoại"
                          defaultValue={user.phone_number}
                          name="phone_number"
                          onChange={handleInput}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <hr />
                <Form.Group as={Row}>
                  <Form.Label column md={1}>
                    <b>Địa chỉ</b>
                  </Form.Label>
                  <Col>
                    <Form.Control
                      placeholder="Nhập địa chỉ"
                      defaultValue={user.address}
                      name="address"
                      onChange={handleInput}
                    />
                  </Col>
                </Form.Group>
              </Alert>
              <hr />
              <Row>
                <Col md={3}>
                  <Button variant="success" type="submit">
                    Lưu thông tin
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
                <Col>{showMessage()}</Col>
              </Row>
            </Form>
          ) : (
              <ChangePassword
              // changePassword={onChangePassword}
              // message={message}
              ></ChangePassword>
            )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Infor;
