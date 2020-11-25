import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  DropdownButton,
  Dropdown,
  Button,
  Card,
  Form,
  Spinner,
  Modal,
  Badge,
} from "react-bootstrap";
import {
  update_marks,
  getMarksLecture,
  addMarksReg,
  deleteMarksReg,
  updateMarksReg,
} from "../../services/marksService";
import { getLectureDetail } from "../../services/lectureService";
import validator from "validator";
import { useLocation } from "react-router-dom";
import { ExportCSV } from "../ExportCSV";
import { ExportData } from "../../utils/exportData";
export default function TeachClass(props) {
  const initMarksState = {
    isAddDGTX1: false,
    isEditDGTX1: false,
    isDeleteDGTX1: false,
    isAddGK1: false,
    isAddCK1: false,
    isAddDGTX2: false,
    isEditDGTX2: false,
    isDeleteDGTX2: false,
    isAddGK2: false,
    isAddCK2: false,
  };

  const location = useLocation();
  const lectureId = location.state;
  const [listMarks, setlistMarks] = useState([]);
  const [lecture, setLecture] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [listMarksReg, setListMarksReg] = useState([]);
  const [listMarksReg2, setListMarksReg2] = useState([]);
  const today = new Date();
  const standardDay = today.toISOString().slice(0, 10);
  const [marksState, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case "ADD_DGTX1":
        return {
          ...initMarksState,
          isAddDGTX1: true,
        };
      case "EDIT_DGTX1":
        return {
          ...initMarksState,
          isEditDGTX1: true,
        };
      case "DELETE_DGTX1":
        return {
          ...initMarksState,
          isDeleteDGTX1: true,
        };
      case "ADD_GK1":
        return {
          ...initMarksState,
          isAddGK1: true,
        };

      case "ADD_CK1":
        return {
          ...initMarksState,
          isAddCK1: true,
        };
      case "ADD_DGTX2":
        return {
          ...initMarksState,
          isAddDGTX2: true,
        };
      case "EDIT_DGTX2":
        return {
          ...initMarksState,
          isEditDGTX2: true,
        };
      case "DELETE_DGTX2":
        return {
          ...initMarksState,
          isDeleteDGTX2: true,
        };
      case "ADD_GK2":
        return {
          ...initMarksState,
          isAddGK2: true,
        };
      case "ADD_CK2":
        return {
          ...initMarksState,
          isAddCK2: true,
        };
      case "default":
        return {
          ...initMarksState,
        };
      default:
        return {
          ...initMarksState,
        };
    }
  }, initMarksState);
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
  const updateFieldChanged = (values) => {
    let newArr = listMarks.map((item, i) => {
      if (item.id == values.id) {
        return values;
        // return { ...item, value: values.v };
      } else {
        return item;
      }
    });
    setlistMarks(newArr);
  };
  // CAP NHAT DIEM DGTX1 VAO STATE
  const updateMarksRegState = (values) => {
    let newArr = listMarksReg.map((item, idx) => {
      if (item.marks_ref == values.marks_ref) {
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
      if (item.marks_ref == values.marks_ref) {
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
      if (semester == 1) {
        return lecture.st_due_input >= standardDay;
      }
      if (semester == 2) {
        return lecture.nd_due_input >= standardDay;
      }
    }
    return false;
  };

  // XOA DGTX
  const delMarksReg = async (markRegId) => {
    setisUpdate(true);
    const rs = await deleteMarksReg(markRegId);
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
    const rs = await updateManyMarksReg(data);
    setisUpdate(false);
  };
  // HIEN THI DANH SACH DIEM
  const showStudentsMarks = listMarks.map((item, index) => {
    return (
      <RowTable
        key={index}
        stt={index + 1}
        item_value={item}
        marksState={marksState}
        idx={item.id}
        student={item.student.user}
        lecture={item.lecture}
        mid_st_semester_point={item.mid_st_semester_point}
        end_st_semester_point={item.end_st_semester_point}
        gpa_st_semester_point={item.gpa_st_semester_point}
        mid_nd_semester_point={item.mid_nd_semester_point}
        end_nd_semester_point={item.end_nd_semester_point}
        gpa_nd_semester_point={item.gpa_nd_semester_point}
        gpa_year_point={item.gpa_year_point}
        marksregulary={item.marksregulary}
        is_public={item.is_public}
        is_locked={item.is_locked}
        limitDateInput={limitDateInput}
        updateFieldChanged={updateFieldChanged}
        updateMarksRegState={updateMarksRegState}
        updateMarksRegState2={updateMarksRegState2}
        delMarksReg={delMarksReg}
        updateReg={updateReg}
      />
    );
  });
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
    const rs = await updateManyMarks(listMarks);
    rs.map((item, index) => {
      if (!item.id) {
        alert("err");
      }
    });
    console.log(rs);
    setisUpdate(false);
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
    setisUpdate(true);
    const rs = await addManyMarksReg(listMarksReg);
    rs.map((item, index) => {
      if (!item.id) {
        alert("err");
      }
    });

    setisUpdate(false);
  };
  // THEM DIEM DGTX2 VAO DATABASE
  const addNewMarksReg2 = async () => {
    setisUpdate(true);
    const rs = await addManyMarksReg(listMarksReg2);
    rs.map((item, index) => {
      if (!item.id) {
        alert("err");
      }
    });
    console.log(rs);
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

  // TINH DIEM TRUNG BINH
  const sumarryMarks = async (semester) => {
    const standardList = listMarks.map((item, idx) => {
      const listReg = item.marksregulary;
      const listReg1 = listReg.filter((itemReg) => itemReg.semester == 1);
      const listReg2 = listReg.filter((itemReg) => itemReg.semester == 2);
      let sumReg1 = 0;
      let sumReg2 = 0;
      for (let reg1 of listReg1) {
        sumReg1 = sumReg1 + parseFloat(reg1.point);
      }
      for (let reg2 of listReg2) {
        sumReg2 = sumReg2 + parseFloat(reg2.point);
      }
      const GK1 = parseFloat(item.mid_st_semester_point);
      const CK1 = parseFloat(item.end_st_semester_point);
      const GK2 = parseFloat(item.mid_nd_semester_point);
      const CK2 = parseFloat(item.end_nd_semester_point);

      const TB_HK1 = (sumReg1 + GK1 * 2 + CK1 * 3) / (5 + listReg1.length);
      const TB_HK2 = (sumReg2 + GK2 * 2 + CK2 * 3) / (5 + listReg2.length);

      const TB_HK_1 = TB_HK1.toFixed(1);
      const TB_HK_2 = TB_HK2.toFixed(1);

      const TB_NAM = (
        (parseFloat(TB_HK_1) + parseFloat(TB_HK_2) * 2) /
        3
      ).toFixed(1);

      let newItem = {
        id: item.id,
        gpa_st_semester_point: TB_HK_1,
        gpa_nd_semester_point: TB_HK_2,
        gpa_year_point: TB_NAM,
      };
      if (semester == 1) {
        delete newItem.gpa_nd_semester_point;
        delete newItem.gpa_year_point;
      }
      if (semester == 2) {
        delete newItem.gpa_st_semester_point;
        delete newItem.gpa_year_point;
      }
      console.log(TB_HK_1);
      console.log(TB_HK_2);
      console.log(TB_NAM);
      return newItem;

      // const TB_HK2 = (sumReg2 + GK1 * 2 + CK1 * 3) / (5 + listReg1.length);
    });
    setisUpdate(true);
    const rs = await updateManyMarks(standardList);
    rs.map((item, index) => {
      if (!item.id) {
        alert("err");
      }
    });
    console.log(rs);
    setisUpdate(false);
  };

  // CHUAN HOA DIEM TRUOC KHI XUAT
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
  // XUAT DIEM CUA 1 LECTURE
  const exportMarksClass = async (semester) => {
    try {
      const kq = standardExport(listMarks, semester);
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

  const shownewMarrks = () => {
    console.log(listMarks);
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
            <Card.Header>
              <Card.Title>
                {lecture != null
                  ? "Điểm chi tiết môn: " +
                    lecture.subject.subject_name +
                    ", Lớp: " +
                    lecture.classes.class_name +
                    ", Khóa: " +
                    lecture.classes.course_year +
                    ", Năm học: " +
                    lecture.school_year.from_year +
                    "-" +
                    lecture.school_year.to_year
                  : ""}

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
              </Card.Title>
            </Card.Header>
            <Form method="POST" onSubmit={onupdateMarks}>
              <Card.Body>
                <Table striped bordered hover size="sm">
                  <HeadTable
                    onAddMarksReg={onAddMarksReg}
                    onAddMarksReg2={onAddMarksReg2}
                    addMarks={dispatch}
                    addNewMarksReg={addNewMarksReg}
                    addNewMarksReg2={addNewMarksReg2}
                    marksState={marksState}
                    limitInput1={lecture !== null ? lecture.st_due_input : null}
                    limitInput2={lecture !== null ? lecture.nd_due_input : null}
                    limitDateInput={limitDateInput}
                  />
                  <tbody>{showStudentsMarks}</tbody>
                </Table>
                <Form.Row>
                  <Button type="submit">Lưu điểm</Button>
                  &nbsp;

                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Tổng kết"
                    variant="success"
                  >
                    {limitDateInput(1) == true ? (
                      <Dropdown.Item
                        onClick={() => {
                          sumarryMarks(1);
                        }}
                      >
                        Tổng kết điểm Học kỳ 1
                      </Dropdown.Item>
                    ) : (
                      ""
                    )}

                    {limitDateInput(2) == true ? (
                      <>
                        <Dropdown.Item
                          onClick={() => {
                            sumarryMarks(2);
                          }}
                        >
                          Tổng kết điểm Học kỳ 2
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => {
                            sumarryMarks(3);
                          }}
                        >
                          Tổng kết điểm cả năm
                        </Dropdown.Item>
                      </>
                    ) : (
                      ""
                    )}
                  </DropdownButton>
                  &nbsp;
                  <DropdownButton
                    id="dropdown-basic-button"
                    title="Xuất điểm"
                    variant="info"
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
                </Form.Row>
              </Card.Body>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function HeadTable(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmAddMarksReg = () => {
    handleShow();
  };
  const actionAddMarksReg1 = () => {
    props.addMarks({ type: "ADD_DGTX1" });
    // THEM TAT CA DIEM DGTX LAN 1 VAO DB
    props.onAddMarksReg();
    handleClose();
  };

  const onAddMarksGK1 = () => {
    props.addMarks({ type: "ADD_GK1" });
  };
  const onAddMarksCK1 = () => {
    props.addMarks({ type: "ADD_CK1" });
  };
  const onAddMarksReg2 = () => {
    props.addMarks({ type: "ADD_DGTX2" });
    // THEM TAT CA DIEM DGTX LAN 1 VAO DB
    props.onAddMarksReg2();
  };
  const onAddMarksGK2 = () => {
    props.addMarks({ type: "ADD_GK2" });
  };
  const onAddMarksCK2 = () => {
    props.addMarks({ type: "ADD_CK2" });
  };

  return (
    <thead>
      <tr>
        <th rowSpan="3">STT</th>
        <th rowSpan="3">Mã HS</th>
        <th rowSpan="3">Họ Tên</th>
        <th colSpan={4}>Học kỳ 1 (Hạn nhập điểm: {props.limitInput1}) </th>
        <th colSpan={4}>Học kỳ 2 (Hạn nhập điểm: {props.limitInput2})</th>
        <th rowSpan="3">Cả năm</th>
      </tr>

      <tr>
        <th colSpan={1}>Điểm ĐGTX </th>
        <th>Giữa kỳ</th>
        <th>Cuối kỳ</th>
        <th>TB Kỳ</th>
        <th colSpan={1}>Điểm ĐGTX</th>
        <th>Giữa kỳ</th>
        <th>Cuối kỳ</th>
        <th>TB Kỳ</th>
      </tr>
      <tr>
        <th colSpan={1}>
          {props.limitDateInput(1) == true ? (
            <Form.Row>
              <DropdownButton id="dropdown-basic-button" size="sm" title="...">
                <Dropdown.Item
                  onClick={() => {
                    confirmAddMarksReg();
                  }}
                >
                  Thêm điểm ĐGTX{" "}
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    props.addMarks({ type: "EDIT_DGTX1" });
                  }}
                >
                  Sửa điểm ĐGTX
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    props.addMarks({ type: "DELETE_DGTX1" });
                  }}
                >
                  Xóa điểm ĐGTX
                </Dropdown.Item>
              </DropdownButton>{" "}
              {props.marksState.isAddDGTX1 ? (
                <>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      props.addNewMarksReg();
                    }}
                  >
                    Lưu
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      props.addMarks({ type: "EDIT_DGTX1" });
                    }}
                  >
                    Hủy
                  </Button>
                </>
              ) : (
                ""
              )}
            </Form.Row>
          ) : (
            ""
          )}
        </th>
        <th>
          {props.limitDateInput(1) == true ? (
            <DropdownButton id="dropdown-basic-button" size="sm" title="...">
              <Dropdown.Item
                onClick={() => {
                  onAddMarksGK1();
                }}
              >
                Nhập điểm giữa kỳ 1
              </Dropdown.Item>
            </DropdownButton>
          ) : (
            ""
          )}
        </th>
        <Modal size="sm" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm điểm Đánh giá thường xuyên</Modal.Title>
          </Modal.Header>
          <Modal.Body>Thêm mới</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Đóng
            </Button>
            <Button variant="primary" onClick={actionAddMarksReg1}>
              Thêm mới
            </Button>
          </Modal.Footer>
        </Modal>
        <th>
          {props.limitDateInput(1) == true ? (
            <DropdownButton id="dropdown-basic-button" size="sm" title="...">
              <Dropdown.Item
                onClick={() => {
                  onAddMarksCK1();
                }}
              >
                Nhập điểm cuối kỳ 1
              </Dropdown.Item>
            </DropdownButton>
          ) : (
            ""
          )}
        </th>
        <th>TB Kỳ</th>
        <th colSpan={1}>
          {props.limitDateInput(2) == true ? (
            <Form.Row>
              {" "}
              <DropdownButton id="dropdown-basic-button" size="sm" title="...">
                <Dropdown.Item
                  onClick={() => {
                    onAddMarksReg2();
                  }}
                >
                  Thêm điểm ĐGTX{" "}
                </Dropdown.Item>
                <Dropdown.Item>Sửa điểm ĐGTX </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    props.addMarks({ type: "DELETE_DGTX2" });
                  }}
                >
                  Xóa điểm ĐGTX{" "}
                </Dropdown.Item>
              </DropdownButton>{" "}
              {props.marksState.isAddDGTX2 ? (
                <>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      props.addNewMarksReg2();
                    }}
                  >
                    Lưu
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      props.addMarks({ type: "EDIT_DGTX1" });
                    }}
                  >
                    Hủy
                  </Button>
                </>
              ) : (
                ""
              )}
            </Form.Row>
          ) : (
            ""
          )}
        </th>
        <th>
          {" "}
          {props.limitDateInput(2) == true ? (
            <DropdownButton id="dropdown-basic-button" size="sm" title="...">
              <Dropdown.Item
                onClick={() => {
                  onAddMarksGK2();
                }}
              >
                Nhập điểm giữa kỳ 2
              </Dropdown.Item>
            </DropdownButton>
          ) : (
            ""
          )}
        </th>
        <th>
          {props.limitDateInput(2) ? (
            <DropdownButton id="dropdown-basic-button" size="sm" title="...">
              <Dropdown.Item
                onClick={() => {
                  onAddMarksCK2();
                }}
              >
                Nhập điểm cuối kỳ 2
              </Dropdown.Item>
            </DropdownButton>
          ) : (
            ""
          )}
        </th>
        <th>TB Kỳ</th>
      </tr>
    </thead>
  );
}

function RowTable(props) {
  const [marks, setmarks] = useState(props.item_value);
  const markRegular1 = props.marksregulary.filter((item) => item.semester == 1);
  const markRegular2 = props.marksregulary.filter((item) => item.semester == 2);
  const [isEdit, setIsEdit] = useState(false);
  const [isEdit2, setIsEdit2] = useState(false);
  const [listMarksReg1, setListMarksReg1] = useState(markRegular1);
  const [listMarksReg2, setListMarksReg2] = useState(markRegular2);

  //THEM DIEM DANH GIA THUONG XUYEN
  //Lay gia tri input diem danh gia thuong xuyen 1
  useEffect(() => {
    setListMarksReg1(markRegular1);
    setListMarksReg2(markRegular2);
  }, [props.marksregulary]);

  const onChangeNewMarksReg = (event) => {
    const { name, value } = event.target;
    let obj = {
      marks_ref: props.idx,
      point: value,
    };
    props.updateMarksRegState(obj);
  };

  const onChangeNewMarksReg2 = (event) => {
    const { name, value } = event.target;
    let obj = {
      marks_ref: props.idx,
      point: value,
    };
    props.updateMarksRegState2(obj);
  };

  const showInputMarksReg = () => {
    if (props.marksState.isAddDGTX1) {
      return (
        <Form.Control
          readonly
          style={{ width: 50 }}
          size="sm"
          type="text"
          placeholder="DGTX"
          defaultValue={""}
          disabled={false}
          onChange={onChangeNewMarksReg}
        />
      );
    }
    return "";
  };
  const showInputMarksReg2 = () => {
    if (props.marksState.isAddDGTX2) {
      return (
        <Form.Control
          readonly
          style={{ width: 50 }}
          size="sm"
          type="text"
          placeholder="DGTX"
          defaultValue={""}
          disabled={false}
          onChange={onChangeNewMarksReg2}
        />
      );
    }
    return "";
  };
  //CAP NHAT DIEM
  const setEditMarksReg = (semester) => {
    if (semester == 1) {
      setIsEdit(true);
    }
    if (semester == 2) {
      setIsEdit2(true);
    }
  };
  const cancelUpdate = (semester) => {
    if (semester == 1) {
      setIsEdit(false);
    }
    if (semester == 2) {
      setIsEdit2(false);
    }
  };

  //cap nhat diem ngay tai day
  const updateManyMarksReg = async (data) => {
    const allRespone = data.map((item) => {
      const rs = updateMarksReg(item);
      return rs;
    });
    return Promise.all(allRespone);
  };

  const onUpdateMarksReg = async () => {
    try {
      const standartList = listMarksReg1.map((item) => {
        if (item.is_public == "Fasle") {
          item.is_public = 0;
        } else {
          item.is_public = 1;
        }
        return item;
      });
      // const rs = await updateManyMarksReg(standartList);

      await props.updateReg(standartList);
    } catch (ex) {
    } finally {
      setIsEdit(false);
    }
  };

  const onUpdateMarksReg2 = async () => {
    try {
      const standartList = listMarksReg2.map((item) => {
        if (item.is_public == "Fasle") {
          item.is_public = 0;
        } else {
          item.is_public = 1;
        }
        return item;
      });
      // const rs = await updateManyMarksReg(standartList);
      props.updateReg(standartList);
    } catch (ex) {
    } finally {
      setIsEdit2(false);
    }
  };
  // Lay gia tri cac cot diem khac
  const handleInput = (event) => {
    const { name, value } = event.target;
    let obj = marks;
    obj[`${name}`] = value;
    setmarks({ ...marks, [name]: value });
    props.updateFieldChanged(obj);
  };
  //Lay gia tri input cap nhat diem DGTX1
  const handleInputMarksReg = (data, event) => {
    const { name, value } = event.target;
    let newList = listMarksReg1.map((item) => {
      if (item.id == data.id) {
        return { ...item, point: value };
      } else {
        return item;
      }
    });
    setListMarksReg1(newList);
  };
  const handleInputMarksReg2 = (data, event) => {
    const { name, value } = event.target;
    let newList = listMarksReg2.map((item) => {
      if (item.id == data.id) {
        return { ...item, point: value };
      } else {
        return item;
      }
    });
    setListMarksReg2(newList);
  };

  //XOA DIEM DANH GIA THUONG XUYEN 1
  const onDelMarksReg = async (markReg, semester) => {
    if (semester == 1) {
      const newList = listMarksReg1.filter((item) => item.id != markReg.id);
      setListMarksReg1(newList);
    }
    if (semester == 2) {
      const newList = listMarksReg2.filter((item) => item.id != markReg.id);
      setListMarksReg2(newList);
    }
    props.delMarksReg(markReg.id);
    // const rs = await deleteMarksReg(markReg.id);
  };

  //HIEN THI DIEM DANH GIA THUONG XUYEN 1
  const showMark1 = listMarksReg1.map((item, index) => (
    <div
      onDoubleClick={() => {
        if (props.limitDateInput(1) == true) {
          setEditMarksReg(1);
        }
      }}
    >
      {" "}
      <Form.Control
        readonly
        style={{ width: 50 }}
        size="sm"
        type="text"
        placeholder="DGTX"
        defaultValue={item.point}
        disabled={!isEdit}
        onChange={(e) => handleInputMarksReg(item, e)}
      />
      {props.marksState.isDeleteDGTX1 == true ? (
        <Badge pill variant="danger" onClick={() => onDelMarksReg(item, 1)}>
          X
        </Badge>
      ) : (
        ""
      )}
    </div>
  ));
  // HIEN THI DIEM DANH GIA THUONG XUYEN 2
  const showMark2 = listMarksReg2.map((item, index) => (
    <div
      onDoubleClick={() => {
        if (props.limitDateInput(2) == true) {
          setEditMarksReg(2);
        }
      }}
    >
      {" "}
      <Form.Control
        readonly
        style={{ width: 50 }}
        size="sm"
        type="text"
        placeholder="DGTX"
        defaultValue={item.point}
        disabled={!isEdit2}
        onChange={(e) => handleInputMarksReg2(item, e)}
      />
      {props.marksState.isDeleteDGTX2 == true ? (
        <Badge pill variant="danger" onClick={() => onDelMarksReg(item, 2)}>
          X
        </Badge>
      ) : (
        ""
      )}
    </div>
  ));

  return (
    <tr>
      <td>{props.stt}</td>
      <td>{props.student.username}</td>
      <td>{props.student.last_name + " " + props.student.first_name}</td>
      <td>
        <Form.Row>
          {showMark1}
          {isEdit ? (
            <>
              {" "}
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  onUpdateMarksReg();
                }}
              >
                Lưu
              </Button>{" "}
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  cancelUpdate(1);
                }}
              >
                Hủy
              </Button>
            </>
          ) : (
            ""
          )}{" "}
          {showInputMarksReg()}
        </Form.Row>
      </td>
      <td>
        <Form.Control
          name="mid_st_semester_point"
          style={{ width: 65 }}
          size="sm"
          type="text"
          placeholder="GK 1"
          defaultValue={props.mid_st_semester_point}
          disabled={!props.marksState.isAddGK1}
          onChange={handleInput}
        />
      </td>
      <td>
        <Form.Control
          name="end_st_semester_point"
          style={{ width: 65 }}
          size="sm"
          type="text"
          placeholder="CK 1"
          defaultValue={props.end_st_semester_point}
          onChange={handleInput}
          disabled={!props.marksState.isAddCK1}
        />
      </td>
      <td>{props.gpa_st_semester_point}</td>
      <td>
        <Form.Row>
          {" "}
          {showMark2}
          {isEdit2 ? (
            <>
              {" "}
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  onUpdateMarksReg2();
                }}
              >
                Lưu
              </Button>{" "}
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  cancelUpdate(2);
                }}
              >
                Hủy
              </Button>
            </>
          ) : (
            ""
          )}{" "}
          {showInputMarksReg2()}
        </Form.Row>
      </td>
      <td>
        <Form.Control
          name="mid_nd_semester_point"
          style={{ width: 65 }}
          mb-2
          size="sm"
          type="text"
          placeholder="GK 2"
          defaultValue={props.mid_nd_semester_point}
          onChange={handleInput}
          disabled={!props.marksState.isAddGK2}
        />
      </td>
      <td>
        <Form.Control
          name="end_nd_semester_point"
          style={{ width: 65 }}
          size="sm"
          type="text"
          placeholder="CK 2"
          defaultValue={props.end_nd_semester_point}
          onChange={handleInput}
          disabled={!props.marksState.isAddCK2}
        />
      </td>
      <td>{props.gpa_nd_semester_point}</td>
      <td>{props.gpa_year_point}</td>
    </tr>
  );
}
