import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  DropdownButton,
  NavDropdown,
  Dropdown,
  Form,
  Row,
  Col,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import {
  // BrowserRouter as Router,
  NavLink,
} from "react-router-dom";
import { get_schoolyear_service } from "../../api/schoolyear_api";
import { get_teacher_class } from '../../api/classes_api'
import { AuthContext } from "../../context/AuthContext";

export default function MyClass() {

  const [userState, dispatch] = React.useContext(AuthContext);
  const [listYear, setlistYear] = useState([]);
  const [currentYear, setcurrentYear] = useState(0);
  const [listTeacherClass, setlistTeacherClass] = useState([]);
  const [listStudent, setlistStudent] = useState([])
  const [isLoading, setisLoading] = useState(false);

  const getTeacherClass = async (teacherId, yearId) => {
    setisLoading(true);
    const rs = await get_teacher_class(teacherId, yearId);
    if (rs.results !== "") {
      const arr_lecture = rs.results;
      setlistTeacherClass(arr_lecture);
    } else {
    }
    setisLoading(false);
  };


  const getcurrentYear = (rs) => {
    let today = new Date();
    let schoolyear_id = 0;
    let current_year = today.getFullYear();
    if (0 <= today.getMonth() && today.getMonth() <= 7) {
      current_year = current_year - 1;
    }
    for (let i = 0; i < rs.length; i++) {
      if (rs[i].from_year.slice(0, 4) == current_year) {
        schoolyear_id = rs[i].id;
        setcurrentYear(rs[i].id);
      }
    }
    return schoolyear_id;
  };

  const getlistFirst = async () => {
    const rs = await get_schoolyear_service();
    setlistYear(rs);
    const yearId = getcurrentYear(rs);
    getTeacherClass(userState.user.user_id, yearId);
  };

  const onselectYear = (event) => {
    const yearSelect = event.target.value;
    setcurrentYear(yearSelect);
    getTeacherClass(userState.user.user_id, yearSelect);
  };

  const listselectYear = () => {
    return (
      <Form.Control
        size="sm"
        as="select"
        value={currentYear}
        onChange={onselectYear}
      >
        {listYear.map((item) => (
          <option className="dropdown-item" value={item.id} key={item.id}>
            {item.from_year.slice(0, 4)} - {item.to_year.slice(0, 4)}
          </option>
        ))}
      </Form.Control>
    );
  };

  const showlistLecture = listTeacherClass.map((item, index) => (
    <RowTable
      key={index}
      class_name={item.classes.class_name}
      course_year={item.classes.course_year}
      school_year={item.school_year.from_year}
    />
  ));

  useEffect(() => {
    getlistFirst();
  }, []);

  return (
    <Container>
      <br></br>
      <Card>
        <Card.Header>
          {" "}
          <Card.Title>Lớp chủ nhiệm</Card.Title>{" "}
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Row>
              <Col md={3}>{listselectYear()}</Col>
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
            </Row>
          </Form.Group>
          <br></br>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Số TT</th>
                <th>Lớp</th>
                <th>Khóa</th>
                <th>Năm học</th>
              </tr>
            </thead>
            <tbody>{showlistLecture}</tbody>
          </Table>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Số TT</th>
                <th>Họ và tên</th>
                <th>Giới tính</th>
                <th>Năm sinh</th>
                <th>Email</th>
                <th>Số điện thoại</th>
              </tr>
            </thead>
            <tbody>
              <StudentDetail></StudentDetail>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

function StudentDetail() {
  return (
    <tr>
      <td>1</td>
      <td>Nguyễn Văn Nam</td>
      <td>Nam</td>
      <td>27.02.1993</td>
      <td>0974436947</td>
      <td>0974436947</td>
    </tr>
  )
}


function RowTable(props) {

  return (
    <tr>
      <td>{props.index}</td>
      <td>
        <NavLink
          to={{
            pathname: "/input",
            state: props.letureId,
          }}
        >
          {props.class_name}
        </NavLink>
      </td>
      <td>{props.course_year}</td>
      <td>{props.school_year}</td>
    </tr>
  );
}
