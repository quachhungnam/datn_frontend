import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Button,
  Card,
  Form,
  Spinner,
  Badge,
  Alert,
  FormControl,
} from "react-bootstrap";
import {
  update_marks,
  getMarksLecture,
  addMarksReg,
  deleteMarksReg,
  updateMarksReg,
} from "../../services/marksService";
import { getLectureDetail } from "../../services/lectureService";
import { useLocation } from "react-router-dom";
import {
  validateListMarksReg,
  validateListMarksGK1,
  validateListMarksCK1,
  validateListMarksGK2,
  validateListMarksCK2,
} from "../../utils/validateMarksReg";
import { ExportData } from "../../utils/exportData";
import { standardExportLecture, sumMarks } from "../../utils/marksUtils";
import MarksList from "./MarksList";
import ChartTron from "./ChartMarks";

export default function TeachClass(props) {
  const location = useLocation();
  const lectureId = location.state;
  const [listMarks, setlistMarks] = useState([]);
  const [lecture, setLecture] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [listMarksReg, setListMarksReg] = useState([]);
  const [listMarksReg2, setListMarksReg2] = useState([]);
  const [message, setMessage] = useState(null);
  const today = new Date();
  const standardDay = today.toISOString().slice(0, 10);
  const [showChart, setShowChart] = useState(false);
  const [desc, setDesc] = useState(-1);
  // const [count, setCount] = useState(0);
  const [keyword, setKeyword] = useState("");
  // LAY DANH SACH DIEM TU DATABASE
  const getLecture = async () => {
    try {
      const rs = await getLectureDetail(lectureId);
      if (rs.id) {
        setLecture(rs);
      }
    } catch (ex) {
    } finally {
    }
  };
  const getlistMarks = async () => {
    try {
      setisLoading(true);
      const rs = await getMarksLecture(lectureId);
      if (rs.count > 0) {
        const results = rs.results;
        setlistMarks(results);
      }
    } catch (ex) {
    } finally {
      setisLoading(false);
    }
  };
  // LAY GIA TRI TU INPUT CAC COT DIEM KHAC
  const updateFieldChanged = (data) => {
    let newArr = listMarks.map((item, idx) => {
      if (item.id === data.id) {
        return { ...item, [Object.keys(data)[1]]: Object.values(data)[1] };
      } else {
        return item;
      }
    });
    setlistMarks(newArr);
  };

  const onChangeMarksReg = (marks_reg) => {
    let newArr = listMarks.map((item, idx) => {
      if (item.id === marks_reg.marks_ref) {
        const newlistReg = item.marksregulary.map((itemReg) => {
          if (itemReg.id === marks_reg.id) {
            return { ...itemReg, point: marks_reg.point };
          } else {
            return itemReg;
          }
        });
        return { ...item, marksregulary: newlistReg };
      } else {
        return item;
      }
    });
    setlistMarks(newArr);
  };
  // CAP NHAT DIEM DGTX1 VAO STATE
  const updateMarksRegState = (values) => {
    let newArr = listMarksReg.map((item, idx) => {
      if (item.marks_ref === values.marks_ref) {
        // return values;
        return { ...item, point: values.point };
      } else {
        return item;
      }
    });
    setListMarksReg(newArr);
  };
  // CAP NHAT DIEM DANH GIA THUONG XUYEN 2 VAO STATE
  const updateMarksRegState2 = (values) => {
    let newArr = listMarksReg2.map((item, idx) => {
      if (item.marks_ref === values.marks_ref) {
        return { ...item, point: values.point };
      } else {
        return item;
      }
    });
    setListMarksReg2(newArr);
  };
  // HAN NHAP DIEM
  const limitDateInput = (semester) => {
    if (lecture != null) {
      if (semester === 1) {
        return lecture.st_due_input >= standardDay;
      }
      if (semester === 2) {
        return lecture.nd_due_input >= standardDay;
      }
    }
    return false;
  };

  // XOA DGTX
  const delMarksReg = async (markRegId) => {
    setisUpdate(true);
    await deleteMarksReg(markRegId);
    setisUpdate(false);
  };

  // CAP NHAT DIEM DGTX
  const updateManyMarksReg = async (data) => {
    const allRespone = data.map((item) => {
      const rs = updateMarksReg(item);
      return rs;
    });
    return Promise.all(allRespone);
  };
  const updateReg = async (data) => {
    setisUpdate(true);
    await updateManyMarksReg(data);
    setisUpdate(false);
  };

  // CAP NHAT CAC COT DIEM KHAC VAO DATABASE
  const updateManyMarks = async (data) => {
    const allRespone = data.map((item) => {
      const rs = update_marks(item);
      return rs;
    });
    return Promise.all(allRespone);
  };
  // CAP NHAT CAC COT DIEM KHAC

  // CHUAN HOA DU LIEU

  const onupdateMarks = async (event) => {
    event.preventDefault();
    setisUpdate(true);
    await updateManyMarks(listMarks);
    setisUpdate(false);
  };

  const onUpdateMarksGK1 = async () => {
    // event.preventDefault();
    //lay ra diem giua ky, sau do cap nhap
    const listGK1 = listMarks.map((item) => {
      const newItem = {
        id: item.id,
        mid_st_semester_point: item.mid_st_semester_point,
      };
      return newItem;
    });
    if (validateListMarksGK1(listGK1) === false) {
      setMessage("Điểm không hợp lệ!");
      return;
    }
    setMessage("Vui lòng đợi...");
    await updateManyMarks(listGK1);
    setMessage("Cập nhật điểm giữa kỳ thành công.");
  };
  const onUpdateMarksGK2 = async () => {
    // event.preventDefault();
    //lay ra diem giua ky, sau do cap nhap
    const listGK2 = listMarks.map((item) => {
      const newItem = {
        id: item.id,
        mid_nd_semester_point: item.mid_nd_semester_point,
      };
      return newItem;
    });
    if (validateListMarksGK2(listGK2) === false) {
      setMessage("Điểm không hợp lệ!");
      return;
    }
    setMessage("Vui lòng đợi...");
    await updateManyMarks(listGK2);
    setMessage("Cập nhật điểm giữa kỳ thành công.");
  };

  const onUpdateMarksCK1 = async () => {
    // event.preventDefault();
    //lay ra diem giua ky, sau do cap nhap
    const listCK1 = listMarks.map((item) => {
      const newItem = {
        id: item.id,
        end_st_semester_point: item.end_st_semester_point,
      };
      return newItem;
    });
    if (validateListMarksCK1(listCK1) === false) {
      setMessage("Điểm không hợp lệ!");
      return;
    }
    setMessage("Vui lòng đợi...");
    await updateManyMarks(listCK1);
    setMessage("Cập nhật điểm cuối kỳ thành công.");
  };
  const onUpdateMarksCK2 = async () => {
    // event.preventDefault();
    //lay ra diem giua ky, sau do cap nhap
    const listCK2 = listMarks.map((item) => {
      const newItem = {
        id: item.id,
        end_nd_semester_point: item.end_nd_semester_point,
      };
      return newItem;
    });
    if (validateListMarksCK2(listCK2) === false) {
      setMessage("Điểm không hợp lệ!");
      return;
    }
    setMessage("Vui lòng đợi...");
    await updateManyMarks(listCK2);
    setMessage("Cập nhật điểm cuối kỳ thành công.");
  };

  const addManyMarksReg = async (data) => {
    const allNewMarks = data.map((item) => {
      const rs = addMarksReg(item);
      return rs;
    });
    return Promise.all(allNewMarks);
  };
  // THEM DIEM DGTX1 VAO DATABASE
  const addNewMarksReg = async () => {
    const valid = validateListMarksReg(listMarksReg);
    if (!valid) {
      setMessage("Điểm không hợp lệ!");
      return;
    }
    setisUpdate(true);
    setMessage("Vui lòng đợi...");

    await addManyMarksReg(listMarksReg);
    // const kq = rs.map((item, index) => {
    //   if (!item.id) {
    //     setMessage('Lỗi điểm')
    //   }
    // });
    setisUpdate(false);
    setMessage("Lưu điểm thành công!");
  };
  // THEM DIEM DGTX2 VAO DATABASE
  const addNewMarksReg2 = async () => {
    const valid = validateListMarksReg(listMarksReg2);
    if (!valid) {
      setMessage("Nhập điểm không hợp lệ");
      return;
    }
    setisUpdate(true);
    setMessage("Vui lòng đợi!");
    await addManyMarksReg(listMarksReg2);
    // rs.map((item, index) => {
    //   if (!item.id) {
    //     alert("err");
    //   }
    // });
    // console.log(rs);
    setMessage("Lưu điểm thành công.");
    setisUpdate(false);
  };
  // THEM DIEM DGTX1
  const onAddMarksReg = async () => {
    const newList = listMarks.map((item, idx) => {
      let newItem = {
        marks_ref: item.id,
        semester: 1,
        point: null,
      };
      return newItem;
    });
    console.log(JSON.stringify(newList));
    setListMarksReg(newList);
  };

  // CHUAN HOA DIEM TRUOC KHI XUAT

  // XUAT DIEM CUA 1 LECTURE
  const exportMarksClass = async (semester) => {
    try {
      const kq = standardExportLecture(listMarks, semester, lecture);
      ExportData(kq, "marks");
    } catch (ex) {
    } finally {
    }
  };
  // THEM DIEM DGTX2
  const onAddMarksReg2 = async () => {
    const newList = listMarks.map((item, idx) => {
      let newItem = {
        marks_ref: item.id,
        semester: 2,
        point: null,
      };
      return newItem;
    });

    setListMarksReg2(newList);
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
  const showLecture = () => {
    if (lecture != null) {
      const showSchoolYear = () => {
        return (
          lecture.school_year.from_year +
          "-" +
          parseInt(lecture.school_year.from_year + 1)
        );
      };
      const showGradesClass = () => {
        const grades =
          parseInt(lecture.school_year.from_year) -
          parseInt(lecture.classes.course_year);
        return 10 + grades;
      };
      return (
        <Alert variant="success">
          <Row>
            <Col md={2}> Năm học:</Col>
            <Col>
              {" "}
              <b>{showSchoolYear()}</b>
            </Col>
          </Row>
          <Row>
            <Col md={2}> Lớp:</Col>
            <Col>
              <b>{showGradesClass() + lecture.classes.class_name}</b>{" "}
            </Col>
          </Row>
          <Row>
            <Col md={2}> Khóa:</Col>
            <Col>
              <b>{lecture.classes.course_year}</b>{" "}
            </Col>
          </Row>
          <Row>
            <Col md={2}> Môn:</Col>
            <Col>
              {" "}
              <b> {lecture.subject.subject_name}</b>
            </Col>
          </Row>
        </Alert>
      );
    }
  };

  const sortMarks = (name) => {
    const newList = listMarks;
    if (name === "username") {
      newList.sort((a, b) => {
        if (a.student.user.username > b.student.user.username) return desc;
        if (a.student.user.username < b.student.user.username) return -desc;
        return 0;
      });
      setDesc(-desc);
    }
    if (name === "name") {
      newList.sort((a, b) => {
        if (a.student.user.first_name > b.student.user.first_name) return desc;
        if (a.student.user.first_name < b.student.user.first_name) return -desc;
        return 0;
      });
      setDesc(-desc);
    }
    if (name === "gk1") {
      newList.sort((a, b) => {
        if (
          parseFloat(a.mid_st_semester_point) >
          parseFloat(b.mid_st_semester_point)
        )
          return desc;
        if (
          parseFloat(a.mid_st_semester_point) <
          parseFloat(b.mid_st_semester_point)
        )
          return -desc;
        return 0;
      });
      setDesc(-desc);
    }
    if (name === "ck1") {
      newList.sort((a, b) => {
        if (
          parseFloat(a.end_st_semester_point) >
          parseFloat(b.end_st_semester_point)
        )
          return desc;
        if (
          parseFloat(a.end_st_semester_point) <
          parseFloat(b.end_st_semester_point)
        )
          return -desc;
        return 0;
      });
      setDesc(-desc);
    }
    //hoc ky 2
    if (name === "gk2") {
      console.log("gk2");
      newList.sort((a, b) => {
        if (
          parseFloat(a.mid_nd_semester_point) >
          parseFloat(b.mid_nd_semester_point)
        )
          return desc;
        if (
          parseFloat(a.mid_nd_semester_point) <
          parseFloat(b.mid_nd_semester_point)
        )
          return -desc;
        return 0;
      });
      setDesc(-desc);
    }
    if (name === "ck2") {
      newList.sort((a, b) => {
        if (
          parseFloat(a.end_nd_semester_point) >
          parseFloat(b.end_nd_semester_point)
        )
          return desc;
        if (
          parseFloat(a.end_nd_semester_point) <
          parseFloat(b.end_nd_semester_point)
        )
          return -desc;
        return 0;
      });
      setDesc(-desc);
    }
    if (name === "tbk1") {
      newList.sort((a, b) => {
        const [sum1a, ,] = sumMarks(a);
        const [sum1b, ,] = sumMarks(b);
        if (parseFloat(sum1a) > parseFloat(sum1b)) return desc;
        if (parseFloat(sum1a) < parseFloat(sum1b)) return -desc;
        return 0;
      });
      setDesc(-desc);
    }
    if (name === "tbk2") {
      newList.sort((a, b) => {
        const [, sum1a] = sumMarks(a);
        const [, sum1b] = sumMarks(b);
        if (parseFloat(sum1a) > parseFloat(sum1b)) return desc;
        if (parseFloat(sum1a) < parseFloat(sum1b)) return -desc;
        return 0;
      });
      setDesc(-desc);
    }
    if (name === "tbnam") {
      newList.sort((a, b) => {
        const [, , sum1a] = sumMarks(a);
        const [, , sum1b] = sumMarks(b);
        if (parseFloat(sum1a) > parseFloat(sum1b)) return desc;
        if (parseFloat(sum1a) < parseFloat(sum1b)) return -desc;
        return 0;
      });
      setDesc(-desc);
    }

    // setCount((count) => count + 1);
  };

  const handlerSearch = (event) => {
    const { value } = event.target;
    setKeyword(value);
  };

  useEffect(() => {
    getLecture();
  }, []);

  useEffect(() => {
    getlistMarks();
  }, [isUpdate]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Form method="POST" onSubmit={onupdateMarks}>
              <Card.Body>
                {showLecture()}
                <Row>
                  <Col md={9}>{showMessage()}</Col>
                  <Col>
                    {isLoading ? (
                      <Button
                        variant="primary"
                        size="sm"
                        disabled
                        className="float-md-right"
                      >
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
                </Row>
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

                <MarksList
                  listMarks={listMarks}
                  limitInput1={lecture !== null ? lecture.st_due_input : null}
                  limitInput2={lecture !== null ? lecture.nd_due_input : null}
                  limitDateInput={limitDateInput}
                  updateFieldChanged={updateFieldChanged}
                  onChangeMarksReg={onChangeMarksReg}
                  onAddMarksReg={onAddMarksReg}
                  onAddMarksReg2={onAddMarksReg2}
                  onUpdateMarksGK1={onUpdateMarksGK1}
                  onUpdateMarksGK2={onUpdateMarksGK2}
                  onUpdateMarksCK1={onUpdateMarksCK1}
                  onUpdateMarksCK2={onUpdateMarksCK2}
                  delMarksReg={delMarksReg}
                  updateMarksRegState={updateMarksRegState}
                  updateMarksRegState2={updateMarksRegState2}
                  addNewMarksReg={addNewMarksReg}
                  addNewMarksReg2={addNewMarksReg2}
                  updateReg={updateReg}
                  sortMarks={sortMarks}
                  keyword={keyword}
                  setMessage={setMessage}
                />

                <hr />
                <Form.Row>
                  &nbsp;
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Xuất điểm"
                    variant="success"
                  >
                    <Dropdown.Item
                      onClick={() => {
                        exportMarksClass(1);
                      }}
                    >
                      Xuất điểm Học kỳ 1
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => {
                        exportMarksClass(2);
                      }}
                    >
                      Xuất điểm Học kỳ 2
                    </Dropdown.Item>

                    <Dropdown.Item
                      onClick={() => {
                        exportMarksClass(3);
                      }}
                    >
                      Xuất điểm cả năm
                    </Dropdown.Item>
                  </DropdownButton>
                  &nbsp;
                  <Button
                    variant="success"
                    onClick={() => {
                      setShowChart(!showChart);
                    }}
                  >
                    Thống kê
                  </Button>
                </Form.Row>
                <hr />
                {showChart ? (
                  <>
                    <Row>
                      <Col>
                        <ChartTron listMarks={listMarks} types={1} />
                      </Col>
                      <Col>
                        <ChartTron listMarks={listMarks} types={2} />
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col md={{ offset: 3, span: 6 }}>
                        <ChartTron listMarks={listMarks} types={3} />
                      </Col>
                    </Row>
                  </>
                ) : (
                  ""
                )}
              </Card.Body>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
