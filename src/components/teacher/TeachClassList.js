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
} from "react-bootstrap";
import {
  // BrowserRouter as Router,
  NavLink,
} from "react-router-dom";
import { get_schoolyear_service } from "../../api/schoolyear_api";
import { get_lecture_teacher_service } from "../../api/lecture_api";
import { AuthContext } from "../../context/AuthContext";

export default function TeachClassList() {
  const [listYear, setlistYear] = useState([]);
  const [currentYear, setcurrentYear] = useState(0);
  const [listLecture, setlistLecture] = useState([]);

  const getlistLecture = async (teacherId, yearId) => {
    const rs = await get_lecture_teacher_service(teacherId, yearId);
    if (rs.results !== "") {
      const arr_lecture = rs.results;
      setlistLecture(arr_lecture);
    } else {
    }
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
    getlistLecture(2, yearId);
  };

  const onselectYear = (event) => {
    const yearSelect = event.target.value;
    setcurrentYear(yearSelect);
    getlistLecture(2, yearSelect);
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

  const showlistLecture = listLecture.map((item, id) => (
    <RowTable
      key={id}
      letureId={item.id}
      index={id + 1}
      class_name={item.classes.class_name}
      subject_name={item.subject.subject_name}
      from_year={item.classes.school_year.from_year}
      to_year={item.classes.school_year.to_year}
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
          <Card.Title>Danh sách lớp giảng dạy</Card.Title>{" "}
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Row>
              <Col md={3}>{listselectYear()}</Col>
            </Row>
          </Form.Group>
          <br></br>
          <Table striped bordered hover>
            <HeadTable></HeadTable>
            <tbody>{showlistLecture}</tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

function HeadTable() {
  return (
    <thead>
      <tr>
        <th>Số TT</th>
        <th>Lớp</th>
        <th>Môn</th>
        <th>Năm học</th>
      </tr>
    </thead>
  );
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
      <td>{props.subject_name}</td>
      <td>{props.from_year}</td>
    </tr>
  );
}
