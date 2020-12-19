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
  FormControl,
} from "react-bootstrap";
import { get_schoolyear_service } from "../../services/schoolYearService";
import { get_teacher_class } from "../../services/classesService";
import { AuthContext } from "../../context/AuthContext";
import {
  getStudentLecture,
  getStudentConduct,
  postStudentConduct,
  patchStudentConduct,
} from "../../services/studentService";
import { ExportData } from "../../utils/exportData";
import { getMarksByYear, getMarksClass } from "../../services/marksService";
import { standardDate } from "../../utils/standardDate";
import { sumMarks, standardExport } from "../../utils/marksUtils";
export default function MyClass() {
  const initState = {
    showListStudent: true,
    showMarkStudent: false,
    showConduct: false,
  };
  const [userState] = React.useContext(AuthContext);
  const [listYear, setlistYear] = useState([]);
  const [currentYear, setcurrentYear] = useState(0);
  const [listClass, setlistClass] = useState([]);
  const [listStudent, setlistStudent] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [showDiem, setShowDiem] = useState(false);
  const [studentDetail, setStudentDetail] = useState(null);
  const [desc, setDesc] = useState(-1);
  const [keyword, setKeyword] = useState("");
  const [listConduct, setListConduct] = useState([]);
  const [showConduct, setShowConduct] = useState(false);
  //neu la nam hoc hien tai thi lay danh sach khac

  const [state, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case "SHOW_STUDENT":
        return initState;
      case "SHOW_MARKS":
        return { ...initState, showListStudent: false, showMarkStudent: true };
      case "SHOW_CONDUCT":
        return { ...initState, showListStudent: false, showConduct: true };
      default:
        return initState;
    }
  }, initState);
  const getListStudent = async (classId, yearId) => {
    const rs = await getStudentLecture(classId, yearId);
    if (rs.results !== "") {
      const arrStudent = rs.results;
      setlistStudent(arrStudent);
    } else {
    }
  };

  const getListConduct = async (classId) => {
    try {
      const rs = await getStudentConduct(classId);
      if (rs.error) {
        return;
      }
      if (rs.results !== "") {
        const arrConduct = rs.results;
        setListConduct(arrConduct);
      } else {
      }
    } catch (ex) {}
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
    <ClassInfor
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
        dispatch={dispatch}
      />
    );
  };
  const handlerSearch = (event) => {
    const { name, value } = event.target;
    setKeyword(value);
  };

  const sortStudent = (name) => {
    const newList = listStudent;
    if (name === "username") {
      newList.sort((a, b) => {
        if (a.user.username > b.user.username) return desc;
        if (a.user.username < b.user.username) return -desc;
        return 0;
      });
      setDesc(-desc);
    }
    if (name === "name") {
      newList.sort((a, b) => {
        if (a.user.first_name > b.user.first_name) return desc;
        if (a.user.first_name < b.user.first_name) return -desc;
        return 0;
      });
      setDesc(-desc);
    }
    if (name === "gender") {
      newList.sort((a, b) => {
        if (a.user.gender > b.user.gender) return desc;
        if (a.user.gender < b.user.gender) return -desc;
        return 0;
      });
      setDesc(-desc);
    }
    if (name === "birthday") {
      newList.sort((a, b) => {
        if (a.user.birthday > b.user.birthday) return desc;
        if (a.user.birthday < b.user.birthday) return -desc;
        return 0;
      });
      setDesc(-desc);
    }
  };

  const onShowConduct = () => {
    setShowConduct(!showConduct);
  };

  const showListConduct = () => {
    const classes = listClass.length > 0 ? listClass[0] : null;
    return (
      <ListConduct
        classes={classes}
        setShowConduct={setShowConduct}
        currentYear={currentYear}
        dispatch={dispatch}
      />
    );
  };

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
              <Col md={3}>{showDiem ? "" : listselectYear()}</Col>
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

          {state.showMarkStudent ? xemBangDiemHocSinh() : ""}
          {state.showListStudent ? (
            <>
              <Row>
                <Col md={{ span: 4 }}>
                  <FormControl
                    type="text"
                    placeholder="Tìm kiếm học sinh"
                    className=" mr-sm-2"
                    onChange={(e) => {
                      handlerSearch(e);
                    }}
                  />
                </Col>
              </Row>
              <ListStudent
                listStudent={listStudent}
                exportMarksStudent={exportMarksStudent}
                sortStudent={sortStudent}
                keyword={keyword}
                showBangDiem={showBangDiem}
                dispatch={dispatch}
              />
              <hr />
              <Form.Row>
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
                <Button
                  variant="success"
                  onClick={() => {
                    dispatch({ type: "SHOW_CONDUCT" });
                  }}
                >
                  Xét hạnh kiểm
                </Button>
              </Form.Row>
            </>
          ) : (
            ""
          )}

          {state.showConduct == true ? showListConduct() : ""}
        </Card.Body>
      </Card>
    </Container>
  );
}

const setGender = (data) => {
  if (data == null) {
    return "-";
  } else {
    if (data === true || data === "1") {
      return "Nam";
    }
    if (data === false || data === "0") {
      return "Nữ";
    }
  }
  return "-";
};

//Thong tin lop chu nhiem
function ClassInfor(props) {
  const showGradesClass = () => {
    const grades = parseInt(props.school_year) - parseInt(props.course_year);
    //nam hoc se luon luon lop hon khoa hoc
    return 10 + grades;
  };
  const showSchoolYear = () => {
    return props.school_year + "-" + parseInt(props.school_year + 1);
  };
  const showCourseYear = () => {
    return props.course_year;
  };

  return (
    <Alert variant="success">
      <Row>
        <Col md={2}>
          {" "}
          <b>Lớp:</b>
        </Col>
        <Col>
          <b className="text-uppercase">
            {showGradesClass() + props.class_name}
          </b>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          {" "}
          <b>Khóa:</b>
        </Col>
        <Col>
          <b className="text-uppercase">{showCourseYear()}</b>
        </Col>
      </Row>
      <Row>
        <Col md={2}>
          {" "}
          <b>Năm học:</b>
        </Col>
        <Col>
          <b className="text-uppercase">{showSchoolYear()}</b>
        </Col>
      </Row>
    </Alert>
  );
}

//Danh sach hoc sinh
function ListStudent(props) {
  const showListStudent = () => {
    let keyt = props.keyword.toLowerCase();
    const list = props.listStudent.filter(
      (item) =>
        item.user.username.toLowerCase().indexOf(keyt) !== -1 ||
        item.user.last_name.toLowerCase().indexOf(keyt) !== -1 ||
        item.user.first_name.toLowerCase().indexOf(keyt) !== -1
    );
    return list;
  };

  const eleStudent = showListStudent().map((item, idx) => {
    return (
      <StudentItem
        key={idx}
        stt={idx + 1}
        user={item.user}
        exportMarksStudent={props.exportMarksStudent}
        showBangDiem={props.showBangDiem}
        dispatch={props.dispatch}
      />
    );
  });

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Số TT</th>
          <th>
            <span
              className="sort-desc"
              onClick={() => {
                props.sortStudent("username");
              }}
            >
              Mã HS
            </span>
          </th>
          <th>
            <span
              className="sort-desc"
              onClick={() => {
                props.sortStudent("name");
              }}
            >
              Họ và tên
            </span>
          </th>
          <th>
            <span
              className="sort-desc"
              onClick={() => {
                props.sortStudent("birthday");
              }}
            >
              Năm sinh
            </span>{" "}
          </th>
          <th>
            <span
              className="sort-desc"
              onClick={() => {
                props.sortStudent("gender");
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
      <tbody>{eleStudent}</tbody>
    </Table>
  );
}

//item Student Infor
function StudentItem(props) {
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
              props.dispatch({ type: "SHOW_MARKS" });
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
  useEffect(() => {
    getAllMarkByYear();
  }, []);

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
            // props.setShowDiem(false);
            props.dispatch({ type: "SHOW_STUDENT" });
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

function ListConduct(props) {
  const [listConduct, setListConduct] = useState([]);
  const [listHK, setListHK] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getListConduct = async () => {
    try {
      const rs = await getStudentConduct(props.classes.id);
      if (rs.error) {
        return;
      }
      if (rs.results !== "") {
        const arrConduct = rs.results;
        setListConduct(arrConduct);
      } else {
      }
    } catch (ex) {}
  };

  const filConduct = (list, yearId) => {
    const newList = list.filter((item) => item.school_year.id == yearId);
    return newList;
  };

  const onSelectConduct = (newItem) => {
    const filList = listHK.filter((item) => item.student === newItem.student);
    //neu co thi sua
    if (filList.length >= 1) {
      const newList = listHK.map((item, idx) => {
        if (item.student === newItem.student) {
          return newItem;
        } else {
          return item;
        }
      });
      setListHK(newList);
      return;
    }
    if (filList.length < 1) {
      setListHK([...listHK, newItem]);
    }
  };

  //Xet hanh kiem
  const postManyConduct = async (data) => {
    const allResponse = data.map((item) => {
      const rs = postStudentConduct(item);
      return rs;
    });
    return Promise.all(allResponse);
  };
  const patchManyConduct = async (data) => {
    const allResponse = data.map((item) => {
      const rs = patchStudentConduct(item);
      return rs;
    });
    return Promise.all(allResponse);
  };

  const actionSetConduct = async () => {
    try {
      const newList = listHK.filter((item) => {
        if (!item.id) {
          return item;
        }
      });
      const oldList = listHK.filter((item) => {
        if (item.id) {
          return item;
        }
      });
      setIsLoading(true);
      const postRs = await postManyConduct(newList);
      const patchRs = await patchManyConduct(oldList);
      setIsLoading(false);
    } catch (ex) {}
  };
  // const showListConduct = () => {};
  const eleConduct = listConduct.map((item, idx) => {
    const conduct = filConduct(item.learningoutcomes, props.currentYear);
    const cond =
      conduct.length > 0
        ? conduct[0]
        : { st_semester_conduct: null, nd_semester_conduct: null };
    return (
      <ConductItem
        key={idx}
        stt={idx + 1}
        user={item.user}
        currentYear={props.currentYear}
        conduct={cond} //1list co the rong
        onSelectConduct={onSelectConduct}
        listHK={listHK}
      />
    );
  });
  useEffect(() => {
    getListConduct();
  }, [isLoading]);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th rowSpan={2}>Số TT</th>
          <th rowSpan={2}>Mã HS</th>
          <th rowSpan={2}>Họ và tên</th>
          <th>Hạnh kiểm HK1</th>
          <th>Hạnh kiểm HK2</th>
          <th rowSpan={2}>Hạnh kiểm cả năm</th>
        </tr>
        <tr>
          <th>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                actionSetConduct();
              }}
            >
              Lưu
            </Button>
          </th>
          <th>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                actionSetConduct();
              }}
            >
              Lưu
            </Button>
          </th>
        </tr>
      </thead>
      <tbody>{eleConduct}</tbody>
      <hr />
      <Button
        variant="danger"
        onClick={() => {
          props.dispatch({ type: "SHOW_STUDENT" });
        }}
      >
        Quay lại
      </Button>
    </Table>
  );
}

function ConductItem(props) {
  const [conduct, setConduct] = useState(props.conduct);
  const [choiceConduct, setChoiceConduct] = useState([
    { id: null, value: "-" },
    { id: 1, value: "Yếu" },
    { id: 2, value: "Trung bình" },
    { id: 3, value: "Khá" },
    { id: 4, value: "Tốt" },
  ]);

  const getConduct = () => {
    if (props.conduct.length > 0) {
      setConduct(props.conduct[0]);
    }
  };
  const rateConduct = (data) => {
    const tb =
      (parseInt(data.st_semester_conduct) +
        parseInt(data.nd_semester_conduct) * 2) /
      3;
    console.log(typeof tb);
    if (isNaN(tb)) {
      return "-";
    }
    if (1 <= tb && tb < 1.5) {
      return "Yếu";
    }
    if (1.5 <= tb && tb < 2.5) {
      return "Trung bình";
    }
    if (2.5 < tb && tb < 3.5) {
      return "Khá";
    }
    if (3.5 < tb) {
      return "Tốt";
    }
    return "-";
  };
  const onChangeConduct1 = (event) => {
    const { name, value } = event.target;
    setConduct({ ...conduct, st_semester_conduct: value });
    const obj = conduct;
    obj.st_semester_conduct = value;
    obj.student = props.user.id;
    obj.school_year = props.currentYear;
    props.onSelectConduct(obj);
    console.log(props.listHK);
  };
  const onChangeConduct2 = (event) => {
    const { name, value } = event.target;
    const obj = conduct;
    obj.nd_semester_conduct = value;
    obj.student = props.user.id;
    obj.school_year = props.currentYear;
    props.onSelectConduct(obj);
  };

  const listselectConduct1 = () => {
    return (
      <Form.Control
        size="sm"
        as="select"
        value={conduct.st_semester_conduct}
        onChange={onChangeConduct1}
      >
        {choiceConduct.map((item, idx) => (
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
        value={conduct.nd_semester_conduct}
        onChange={onChangeConduct2}
      >
        {choiceConduct.map((item, idx) => (
          <option className="dropdown-item" value={item.id} key={idx}>
            {item.value}
          </option>
        ))}
      </Form.Control>
    );
  };
  useEffect(() => {
    getConduct();
  }, []);
  return (
    <tr>
      <td>{props.stt}</td>
      <td>{props.user.username}</td>
      <td>{props.user.last_name + " " + props.user.first_name}</td>
      <td>{listselectConduct1()}</td>
      <td>{listselectConduct2()}</td>
      <td>{rateConduct(props.conduct)}</td>
    </tr>
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
      <tbody></tbody>
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
