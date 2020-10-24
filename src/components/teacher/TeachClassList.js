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
import { get_schoolyear_service } from "../../services/schoolyear_service";
import { get_lecture_teacher_service } from "../../services/lecture_service";
export default function TeachClassList() {
  const [schoolyear, set_schoolyear] = useState([]);
  const [subject, set_subject] = useState();
  const [current, set_current] = useState(0);
  const [list_class, set_list_class] = useState([]);

  const get_all_list_class = async () => {
    const rs = await get_lecture_teacher_service(2, current);
    if (rs.results != "") {
      let arr_class = rs.results;
      alert(JSON.stringify(arr_class));
      set_list_class(arr_class);
    } else {
      alert("ddd");
    }
  };

  const get_all_schoolyear = async () => {
    const rs = await get_schoolyear_service();
    set_schoolyear(rs);
    let today = new Date();
    let schoolyear_id = 0;
    let current_year = today.getFullYear();
    if (0 <= today.getMonth() && today.getMonth() <= 7) {
      current_year = current_year - 1;
    }
    for (let i = 0; i < rs.length; i++) {
      if (rs[i].from_year.slice(0, 4) == current_year) {
        schoolyear_id = rs[i].id;
        set_current(rs[i].id);
      }
    }

    const rs2 = await get_lecture_teacher_service(2, schoolyear_id);
    if (rs2.results != "") {
      let arr_class = rs2.results;
      // alert(JSON.stringify(arr_class))
      set_list_class(arr_class);
    } else {
      alert("Hong co lop nao");
    }
  };

  const get_all_class = async () => {
    let today = new Date();
    let current_year = today.getFullYear();
    if (8 <= today.getMonth() && today.getMonth() <= 11) {
      alert(current_year + "-" + current_year + 1);
    }
    if (0 <= today.getMonth() && today.getMonth() <= 7) {
      alert(current_year - 1 + "-" + current_year);
    }

    // alert(today)
    // alert(current_year)
    // alert(today.getMonth())
    // alert(current)
    // alert(schoolyear[0].from_year)
  };

  const handleInputChange = (event) => {
    // neu thang hien tai nam trong khoang tu 8-11, thi schoolyear la nam hien tai -  nam sau
    // neu thang hien tai nam trong khoang tu 0-7, thi nam hoc hien tai la tu nam truoc-nam sau

    // const { name, value } = event.target
    // setTask({ ...task, [name]: value })
    set_current(event.target.value);
  };

  useEffect(() => {
    get_all_schoolyear();
    // get_all_list_class()
  }, []);
  // const { name, value } = event.target
  // setTask({ ...task, [name]: value })

  const listSelect = () => {
    return (
      <Form.Control
        size="sm"
        as="select"
        value={current}
        onChange={handleInputChange}
      >
        {schoolyear.map((item) => (
          <option className="dropdown-item" value={item.id} key={item.id}>
            {item.from_year.slice(0, 4)} - {item.to_year.slice(0, 4)}
          </option>
        ))}
      </Form.Control>
    );
  };

  const listItems = schoolyear.map((item) => (
    <option className="dropdown-item" value={item.id} key={item.id}>
      {item.from_year.slice(0, 4)} - {item.to_year.slice(0, 4)}
    </option>
  ));

  const listClass = list_class.map((item, id) => (
    <RowTable
      key={id}
      index={id+1}
      class_name={item.classes.class_name}
      subject_name={item.subject.subject_name}
      from_year={item.classes.school_year.from_year}
      to_year={item.classes.school_year.to_year}
    />
  ));

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
              <Col md={3}>
                {/* <Form.Control size="sm" as="select" >
              {listItems}
            </Form.Control> */}
                {listSelect()}
              </Col>
            </Row>
          </Form.Group>

          <br></br>
          <Table striped bordered hover>
            <HeadTable></HeadTable>
            <tbody>
              {listClass}
              {/* <RowTable
            data="4"
          />
          <RowTable
            data="5"
          /> */}
            </tbody>
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
        <NavLink to="/input">{props.class_name}</NavLink>
      </td>
      <td>{props.subject_name}</td>
      <td>{props.from_year}</td>
    </tr>
  );
}
