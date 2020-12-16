import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  DropdownButton,
  Dropdown,
  Form,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Badge,
  Alert,
} from "react-bootstrap";
import { get_schoolyear_service } from "../../services/schoolYearService";
import { get_teacher_class } from "../../services/classesService";
import { AuthContext } from "../../context/AuthContext";
import { getStudentLecture } from "../../services/studentService";
import { ExportData } from "../../utils/exportData";
import { getMarksByYear, getMarksClass } from "../../services/marksService";
import { standardDate } from "../../utils/standardDate";
import { sumMarks, standardExport } from "../../utils/marksUtils";
export default function MyClass() {
  const [userState] = React.useContext(AuthContext);
  const [listYear, setlistYear] = useState([]);
  const [currentYear, setcurrentYear] = useState(0);
  const [listClass, setlistClass] = useState([]);
  const [listStudent, setlistStudent] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [showDiem, setShowDiem] = useState(false);
  const [studentDetail, setStudentDetail] = useState(null);
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
      if (rs[i].from_year === current_year) {
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

  const showBangDiem = (user) => {
    setStudentDetail(user);
    setShowDiem(true);
  };

  const xemBangDiemHocSinh = () => {
    return (
      <BangDiemHocSinh
        setShowDiem={setShowDiem}
        studentDetail={studentDetail != null ? studentDetail : null}
        currentYear={currentYear}
        exportMarksStudent={exportMarksStudent}
      />
    );
  };

  const showListStudent = listStudent.map((item, index) => (
    <StudentDetail
      key={index}
      stt={index + 1}
      user={item.user}
      exportMarksStudent={exportMarksStudent}
      showBangDiem={showBangDiem}
    />
  ));

  useEffect(() => {
    getlistFirst();
  }, []);

  return (
    <Container fluid>
      <Card>
        <Card.Body>
          <Alert variant="success">
            <h5 className="txt-upcase">Lớp chủ nhiệm</h5>
          </Alert>
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
          {showListClass}
          {/* 
          <Table striped bordered hover>
            <tbody>{showListClass}</tbody>
          </Table> */}

          {showDiem ? (
            xemBangDiemHocSinh()
          ) : (
            <>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Số TT</th>
                    <th>
                      <span
                        className="sort-desc"
                        onClick={() => {
                          // sortMarks("gk2");
                        }}
                      >
                        Mã HS
                      </span>
                    </th>
                    <th>
                      <span
                        className="sort-desc"
                        onClick={() => {
                          // sortMarks("gk2");
                        }}
                      >
                        Họ và tên
                      </span>
                    </th>
                    <th>
                      <span
                        className="sort-desc"
                        onClick={() => {
                          // sortMarks("gk2");
                        }}
                      >
                        Năm sinh
                      </span>{" "}
                    </th>
                    <th>
                      <span
                        className="sort-desc"
                        onClick={() => {
                          // sortMarks("gk2");
                        }}
                      >
                        Giới tính
                      </span>
                    </th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>{showListStudent}</tbody>
              </Table>
              {/* {<ConductTable />} */}
              <hr />
              <DropdownButton
                id="dropdown-basic-button"
                variant="success"
                title="Xuất điểm"
              >
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
              &nbsp;
              {/* <Button variant="success">Xét Hạnh Kiểm</Button> */}
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

const setGender = (data) => {
  if (data == null) {
    return "Khác";
  } else {
    if (data === 1 || data === "1") {
      return "Nam";
    }
    if (data === 0 || data === "0") {
      return "Nữ";
    }
  }
  return "Khác";
};

function StudentDetail(props) {
  const showBangDiem = (user) => {
    props.showBangDiem(user);
  };
  return (
    <tr>
      <td>{props.stt}</td>
      <td>{props.user.username}</td>
      <td>{props.user.last_name + " " + props.user.first_name}</td>
      <td>{standardDate(props.user.birthday)}</td>
      <td>{setGender(props.user.gender)}</td>
      <td>{props.user.email}</td>
      <td>{props.user.phone_number}</td>
      <td>
        <DropdownButton
          id="dropdown-basic-button"
          size="sm"
          title="..."
          variant="success"
        >
          <Dropdown.Item
            onClick={() => {
              showBangDiem(props.user);
              // props.exportMarksStudent(props.user, 1);
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
    <Alert variant="success">
      <Row>
        <Col md={2}>
          {" "}
          <b>Lớp:</b>
        </Col>
        <Col>
          <b className="text-uppercase">{props.class_name}</b>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          {" "}
          <b>Khóa:</b>
        </Col>
        <Col>
          <b className="text-uppercase">{props.course_year}</b>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          {" "}
          <b>Năm học:</b>
        </Col>
        <Col>
          <b className="text-uppercase">{props.school_year}</b>
        </Col>
      </Row>
    </Alert>
  );
}

function ListStudent(props) {
  const showListStudent = () => {
    const list = props.listStudent;
    return list;
  };

  const eleStudent = showListStudent().map((item) => {
    return <StudentItem />;
  });
}
function StudentItem(props) {}

function BangDiemHocSinh(props) {
  const [listMarks, setListMarks] = useState([]);
  const getAllMarkByYear = async () => {
    try {
      const rs = await getMarksByYear(
        props.studentDetail.id,
        props.currentYear
      );
      if (rs.count > 0) {
        setListMarks(rs.results);
      }
    } catch (ex) {}
  };

  useEffect(() => {
    getAllMarkByYear();
  }, []);

  const showRowSubject = listMarks.map((item, idx) => {
    const [sum1, sum2, sum3] = sumMarks(item);
    const markRegular1 = item.marksregulary.filter(
      (item) => item.semester === 1
    );
    const markRegular2 = item.marksregulary.filter(
      (item) => item.semester === 2
    );
    const showMark1 = markRegular1.map((item, index) => (
      <span>
        {" "}
        <Badge variant="light">{item.point}</Badge>
      </span>
    ));
    const showMark2 = markRegular2.map((item, index) => (
      <span>
        <Badge variant="light">{item.point}</Badge>
      </span>
    ));
    return (
      <tr>
        <td>{idx + 1}</td>
        <td>{item.lecture.subject.subject_name}</td>

        <td>{showMark1}</td>
        <td>{item.mid_st_semester_point}</td>
        <td>{item.end_st_semester_point}</td>
        <td>{sum1}</td>

        <td>{showMark2}</td>
        <td>{item.mid_nd_semester_point}</td>
        <td>{item.end_nd_semester_point}</td>
        <td>{sum2}</td>
        <td>{sum3}</td>
      </tr>
    );
  });

  return (
    <>
      <Alert variant="info">
        <Row>
          <Col md={2}>
            {" "}
            <b>Mã học sinh:</b>
          </Col>
          <Col>
            <b className="text-uppercase">{props.studentDetail.username}</b>
          </Col>
        </Row>
        <Row>
          <Col md={2}>
            {" "}
            <b>Họ tên:</b>
          </Col>
          <Col>
            <b className="text-uppercase">
              {props.studentDetail.last_name +
                " " +
                props.studentDetail.first_name}
            </b>
          </Col>
        </Row>
      </Alert>
      <Table bordered size="sm">
        <thead>
          <tr>
            <th rowSpan="2">STT</th>
            {/* <th rowSpan="2">Năm học </th> */}
            <th rowSpan="2">Môn học</th>
            <th colSpan="4">Học kỳ 1</th>
            <th colSpan="4">Học kỳ 2</th>
            <th rowSpan="2">Cả năm</th>
          </tr>
          <tr>
            <th>Điểm ĐGTX</th>
            <th>Giữa kỳ</th>
            <th>Cuối kỳ</th>
            <th>Trung bình môn</th>
            <th>Điểm ĐGTX</th>
            <th>Giữa kỳ</th>
            <th>Cuối kỳ</th>
            <th>Trung bình môn</th>
          </tr>
        </thead>
        <tbody>{showRowSubject}</tbody>
      </Table>
      <hr />
      <Form.Row>
        <Button
          variant="danger"
          onClick={() => {
            props.setShowDiem(false);
          }}
        >
          Quay lại
        </Button>
        &nbsp;
        <DropdownButton
          id="dropdown-basic-button"
          title="Xuất bảng điểm"
          variant="success"
        >
          <Dropdown.Item
            onClick={() => {
              props.exportMarksStudent(props.studentDetail, 1);
            }}
          >
            Xuất điểm học kỳ 1
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.exportMarksStudent(props.studentDetail, 2);
            }}
          >
            Xuất điểm học kỳ 2
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              props.exportMarksStudent(props.studentDetail, 3);
            }}
          >
            Xuất điểm cả năm
          </Dropdown.Item>
        </DropdownButton>
      </Form.Row>
    </>
  );
}

function ConductTable() {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Số TT</th>
          <th>Mã HS</th>
          <th>Họ và tên</th>
          <th>Hạnh kiểm HK1</th>
          <th>Hạnh kiểm HK2</th>
          <th>Hạnh kiểm cả năm</th>
        </tr>
      </thead>
      <tbody>{<ConductRow />}</tbody>
    </Table>
  );
}

function ConductRow() {
  const [listConduct, setlistConduct] = useState([
    { id: 0, value: "Chưa xét" },
    { id: 1, value: "Yếu" },
    { id: 2, value: "Trung bình" },
    { id: 3, value: "Khá" },
    { id: 4, value: "Tốt" },
  ]);

  const [currentConduct1, setcurrentConduct1] = useState(0);
  const [currentConduct2, setcurrentConduct2] = useState(0);

  const onselectConduct1 = (event) => {
    const conductSelect = event.target.value;
    setcurrentConduct1(conductSelect);
    console.log(event.target.value);
    // setcurrentYear(yearSelect);
    // getlistLecture(userState.user.user_id, yearSelect);
  };
  const onselectConduct2 = (event) => {
    const conductSelect = event.target.value;
    setcurrentConduct2(conductSelect);
    console.log(event.target.value);
    // setcurrentYear(yearSelect);
    // getlistLecture(userState.user.user_id, yearSelect);
  };

  const listselectConduct1 = () => {
    return (
      <Form.Control
        size="sm"
        as="select"
        value={currentConduct1}
        onChange={onselectConduct1}
      >
        {listConduct.map((item, idx) => (
          <option className="dropdown-item" value={item.id} key={idx}>
            {item.value}
          </option>
        ))}
      </Form.Control>
    );
  };

  const listselectConduct2 = () => {
    return (
      <Form.Control
        size="sm"
        as="select"
        value={currentConduct2}
        onChange={onselectConduct2}
      >
        {listConduct.map((item, idx) => (
          <option className="dropdown-item" value={item.id} key={idx}>
            {item.value}
          </option>
        ))}
      </Form.Control>
    );
  };

  return (
    <tr>
      <td>
        1{" "}
        <Button
          onClick={() => {
            alert(JSON.stringify(currentConduct1));
            alert(JSON.stringify(currentConduct2));
          }}
        >
          ok
        </Button>
      </td>
      <td>1f1sd1132</td>
      <td>Họ tên</td>
      <td>{listselectConduct1()}</td>
      <td>{listselectConduct2()}</td>
      <td></td>
    </tr>
  );
}
