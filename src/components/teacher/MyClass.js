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
  Link,
  // BrowserRouter as Router,
  NavLink,
} from "react-router-dom";
import { get_schoolyear_service } from "../../services/schoolYearService";
import { get_teacher_class } from "../../services/classesService";
import { AuthContext } from "../../context/AuthContext";
import { getStudentLecture } from "../../services/studentService";
import { ExportData } from "../../utils/exportData";
import { getMarksByYear, getMarksClass } from "../../services/marksService";

export default function MyClass() {
  const [userState, dispatch] = React.useContext(AuthContext);
  const [listYear, setlistYear] = useState([]);
  const [currentYear, setcurrentYear] = useState(0);
  const [listClass, setlistClass] = useState([]);
  const [listStudent, setlistStudent] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  //neu la nam hoc hien tai thi lay danh sach khac

  const getListStudent = async (classId, yearId) => {
    const rs = await getStudentLecture(classId, yearId);
    if (rs.results !== "") {
      const arrStudent = rs.results;
      setlistStudent(arrStudent);
    } else {
    }
  };

  const getTeacherClass = async (teacherId, yearId) => {
    setisLoading(true);
    const rs = await get_teacher_class(teacherId, yearId);
    if (rs.count) {
      const arrTeacherClass = rs.results;
      getListStudent(arrTeacherClass[0].classes.id, yearId);
      setlistClass(arrTeacherClass);
    } else {
      setlistClass([]);
      setlistStudent([]);
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
      if (rs[i].from_year == current_year) {
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
            {item.from_year} - {item.to_year}
          </option>
        ))}
      </Form.Control>
    );
  };

  const showListClass = listClass.map((item, index) => (
    <RowTable
      key={index}
      class_name={item.classes.class_name}
      course_year={item.classes.course_year}
      school_year={item.school_year.from_year}
    />
  ));

  const standardExport = (data, semester) => {
    let dataStandard = [];
    data.map((item, index) => {
      let DGTX1 = "=";
      let DGTX2 = "=";

      const markRegular1 = item.marksregulary.filter(
        (item) => item.semester == 1
      );
      for (let i = 0; i < markRegular1.length; i++) {
        DGTX1 = DGTX1 + "+" + markRegular1[i].point;
      }

      const markRegular2 = item.marksregulary.filter(
        (item) => item.semester == 2
      );
      for (let i = 0; i < markRegular2.length; i++) {
        DGTX2 = DGTX2 + "+" + markRegular2[i].point;
      }
      let newItem = {
        STT: index + 1,
        TaiKhoan: item.student.user.username,
        Ho: item.student.user.last_name,
        Ten: item.student.user.first_name,
        Mon: item.lecture.subject.subject_name,
        DGTX_HK1: DGTX1,
        GK1: item.mid_st_semester_point,
        CK1: item.end_st_semester_point,
        TB_HK1: item.gpa_st_semester_point,
        DGTX_HK2: DGTX2,
        GK2: item.mid_nd_semester_point,
        CK2: item.end_nd_semester_point,
        TB_HK2: item.gpa_nd_semester_point,
        TB_Nam: item.gpa_year_point,
      };
      if (semester == 1) {
        delete newItem.DGTX_HK2;
        delete newItem.GK2;
        delete newItem.CK2;
        delete newItem.TB_HK2;
        delete newItem.TB_Nam;
      }
      if (semester == 2) {
        delete newItem.DGTX_HK1;
        delete newItem.GK1;
        delete newItem.CK1;
        delete newItem.TB_HK1;
        delete newItem.TB_Nam;
      }

      dataStandard.push(newItem);
    });
    return dataStandard;
  };

  const exportMarksStudent = async (user, semester) => {
    try {
      setisLoading(true);
      const rs = await getMarksByYear(user.id, currentYear);
      const kq = standardExport(rs.results, semester);
      ExportData(kq, "marks" + user.username);
    } catch (ex) {
    } finally {
      setisLoading(false);
    }
  };
  //Xuat diem cua 1 lop chu nhiem
  const exportMarksClass = async (semester) => {
    try {
      setisLoading(true);
      const classes = listClass.length > 0 ? listClass[0] : null;
      if (classes) {
        const rs = await getMarksClass(classes.id, currentYear);
        const kq = standardExport(rs.results, semester);
        ExportData(kq, "marks");
      }
    } catch (ex) {
    } finally {
      setisLoading(false);
    }
  };
  const showListStudent = listStudent.map((item, index) => (
    <StudentDetail
      key={index}
      stt={index + 1}
      user={item.user}
      exportMarksStudent={exportMarksStudent}
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
            <tbody>{showListClass}</tbody>
          </Table>

          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Số TT</th>
                <th>Họ và tên</th>
                <th>Năm sinh</th>
                <th>Giới tính</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>{showListStudent}</tbody>
          </Table>
          <DropdownButton id="dropdown-basic-button" title="Export">
            <Dropdown.Item
              onClick={() => {
                exportMarksClass(1);
              }}
            >
              Học kỳ 1
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                exportMarksClass(2);
              }}
            >
              Học kỳ 2
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                exportMarksClass(3);
              }}
            >
              Cả năm
            </Dropdown.Item>
          </DropdownButton>
        </Card.Body>
      </Card>
    </Container>
  );
}

function StudentDetail(props) {
  return (
    <tr>
      <td>{props.stt}</td>
      <td>{props.user.last_name + " " + props.user.first_name}</td>
      <td>{props.user.birthday}</td>
      <td>{props.user.gender ? "Nam" : "Nữ"}</td>
      <td>{props.user.email}</td>
      <td>{props.user.phone_number}</td>
      <td>
        <DropdownButton id="dropdown-basic-button" size="sm" title="Action">
          <Dropdown.Item
            onClick={() => {
              props.exportMarksStudent(props.user, 1);
            }}
          >
            Xem bảng điểm
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              props.exportMarksStudent(props.user, 1);
            }}
          >
            Xuất điểm học kỳ 1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.exportMarksStudent(props.user, 2);
            }}
          >
            Xuất điểm học kỳ 2
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.exportMarksStudent(props.user, 3);
            }}
          >
            Xuất điểm cả năm
          </Dropdown.Item>
        </DropdownButton>
      </td>
    </tr>
  );
}

function RowTable(props) {
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.class_name}</td>
      <td>{props.course_year}</td>
      <td>{props.school_year}</td>
    </tr>
  );
}
