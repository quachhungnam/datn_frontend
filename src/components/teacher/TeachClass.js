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
  Alert,
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
  // validateMarksReg,
} from "../../utils/validateMarksReg";
import {standarDate} from '../../utils/standardDate'
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
  const [message, setMessage] = useState(null);
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
      if (item.id === values.id) {
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
  // HIEN THI DANH SACH DIEM
  const sumMarks = (dataMarks) => {
    const listReg = dataMarks.marksregulary;
    const listReg1 = listReg.filter((itemReg) => itemReg.semester === 1);
    const listReg2 = listReg.filter((itemReg) => itemReg.semester === 2);
    let sumReg1 = 0;
    let sumReg2 = 0;
    for (let reg1 of listReg1) {
      sumReg1 = sumReg1 + parseFloat(reg1.point);
    }
    for (let reg2 of listReg2) {
      sumReg2 = sumReg2 + parseFloat(reg2.point);
    }
    const GK1 = parseFloat(dataMarks.mid_st_semester_point);
    const CK1 = parseFloat(dataMarks.end_st_semester_point);
    const GK2 = parseFloat(dataMarks.mid_nd_semester_point);
    const CK2 = parseFloat(dataMarks.end_nd_semester_point);
    // console.log(dataMarks.mid_st_semester_point);
    // if (dataMarks.mid_st_semester_point == null) {
    //   console.log("null");
    // }

    const TB_HK1 = (sumReg1 + GK1 * 2 + CK1 * 3) / (5 + listReg1.length);
    const TB_HK2 = (sumReg2 + GK2 * 2 + CK2 * 3) / (5 + listReg2.length);

    const TB_HK_1 = TB_HK1.toFixed(1);
    const TB_HK_2 = TB_HK2.toFixed(1);

    const TB_NAM = (
      (parseFloat(TB_HK_1) + parseFloat(TB_HK_2) * 2) /
      3
    ).toFixed(1);

    return [TB_HK_1, TB_HK_2, TB_NAM];
  };
  const showStudentsMarks = listMarks.map((item, index) => {
    const [sum1, sum2, sum3] = sumMarks(item);
    return (
      <RowTable
        key={index}
        stt={index + 1}
        item_value={item}
        marksState={marksState}
        idx={item.id}
        student={item.student.user}
        mid_st_semester_point={item.mid_st_semester_point}
        end_st_semester_point={item.end_st_semester_point}
        gpa_st_semester_point={sum1}
        mid_nd_semester_point={item.mid_nd_semester_point}
        end_nd_semester_point={item.end_nd_semester_point}
        gpa_nd_semester_point={sum2}
        gpa_year_point={sum3}
        marksregulary={item.marksregulary}
        is_public={item.is_public}
        is_locked={item.is_locked}
        limitDateInput={limitDateInput}
        updateFieldChanged={updateFieldChanged}
        updateMarksRegState={updateMarksRegState}
        updateMarksRegState2={updateMarksRegState2}
        delMarksReg={delMarksReg}
        updateReg={updateReg}
        setMessage={setMessage}
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
    if (validateListMarksGK2(listGK2) == false) {
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
  const standardExport = (data, semester) => {
    // let dataStandard = [];
    const dataStandard = data.map((item, index) => {
      const [sum1, sum2, sum3] = sumMarks(item);
      let DGTX1 = "=";
      let DGTX2 = "=";

      const markRegular1 = item.marksregulary.filter(
        (item) => item.semester === 1
      );
      for (let i = 0; i < markRegular1.length; i++) {
        DGTX1 = DGTX1 + "+" + markRegular1[i].point;
      }

      const markRegular2 = item.marksregulary.filter(
        (item) => item.semester === 2
      );
      for (let i = 0; i < markRegular2.length; i++) {
        DGTX2 = DGTX2 + "+" + markRegular2[i].point;
      }
      let newItem = {
        STT: index + 1,
        TaiKhoan: item.student.user.username,
        Ho: item.student.user.last_name,
        Ten: item.student.user.first_name,
        Mon: lecture.subject.subject_name,
        DGTX_HK1: DGTX1,
        GK1: item.mid_st_semester_point,
        CK1: item.end_st_semester_point,
        TB_HK1: sum1,
        DGTX_HK2: DGTX2,
        GK2: item.mid_nd_semester_point,
        CK2: item.end_nd_semester_point,
        TB_HK2: sum2,
        TB_Nam: sum3,
      };
      if (semester === 1) {
        delete newItem.DGTX_HK2;
        delete newItem.GK2;
        delete newItem.CK2;
        delete newItem.TB_HK2;
        delete newItem.TB_Nam;
      }
      if (semester === 2) {
        delete newItem.DGTX_HK1;
        delete newItem.GK1;
        delete newItem.CK1;
        delete newItem.TB_HK1;
        delete newItem.TB_Nam;
      }
      return newItem;
      // dataStandard.push(newItem);
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
      return (
        <Alert variant="success">
          <Row>
            <Col md={2}> Năm học:</Col>
            <Col>
              {" "}
              <b>{lecture.school_year.from_year}</b>
            </Col>
          </Row>
          <Row>
            <Col md={2}> Lớp:</Col>
            <Col>
              <b>{lecture.classes.class_name}</b>{" "}
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
                    onUpdateMarksGK1={onUpdateMarksGK1}
                    onUpdateMarksGK2={onUpdateMarksGK2}
                    onUpdateMarksCK1={onUpdateMarksCK1}
                    onUpdateMarksCK2={onUpdateMarksCK2}
                  />
                  <tbody>{showStudentsMarks}</tbody>
                </Table>
                <hr />
                <Form.Row>
                  {/* <Button variant="success" type="submit">
                    Lưu điểm
                  </Button> */}
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

  const showDropDGTX1 = () => {
    return props.limitDateInput(1) === true ? (
      <Form.Row>
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          size="sm"
          title="..."
        >
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
    );
  };
  const showDropGK1 = () => {
    return props.limitDateInput(1) === true ? (
      <Form.Row>
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          size="sm"
          title="..."
        >
          <Dropdown.Item
            onClick={() => {
              onAddMarksGK1();
            }}
          >
            Nhập điểm giữa kỳ 1
          </Dropdown.Item>
        </DropdownButton>
        {props.marksState.isAddGK1 ? (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                props.onUpdateMarksGK1();
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
    );
  };

  const showDropCK1 = () => {
    return props.limitDateInput(1) === true ? (
      <Form.Row>
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          size="sm"
          title="..."
        >
          <Dropdown.Item
            onClick={() => {
              onAddMarksCK1();
            }}
          >
            Nhập điểm cuối kỳ 1
          </Dropdown.Item>
        </DropdownButton>
        {props.marksState.isAddCK1 ? (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                props.onUpdateMarksCK1();
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
    );
  };

  const showDropDGTX2 = () => {
    return props.limitDateInput(2) === true ? (
      <Form.Row>
        {" "}
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          size="sm"
          title="..."
        >
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
    );
  };
  const showDropGK2 = () => {
    return props.limitDateInput(2) === true ? (
      <Form.Row>
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          size="sm"
          title="..."
        >
          <Dropdown.Item
            onClick={() => {
              onAddMarksGK2();
            }}
          >
            Nhập điểm giữa kỳ 2
          </Dropdown.Item>
        </DropdownButton>
        {props.marksState.isAddGK2 ? (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                props.onUpdateMarksGK2();
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
    );
  };
  const showDropCK2 = () => {
    return props.limitDateInput(2) ? (
      <Form.Row>
        <DropdownButton
          id="dropdown-basic-button"
          variant="success"
          size="sm"
          title="..."
        >
          <Dropdown.Item
            onClick={() => {
              onAddMarksCK2();
            }}
          >
            Nhập điểm cuối kỳ 2
          </Dropdown.Item>
        </DropdownButton>
        {props.marksState.isAddCK2 ? (
          <>
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                props.onUpdateMarksCK2();
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
    );
  };
  return (
    <thead>
      <tr>
        <th rowSpan="3">STT</th>
        <th rowSpan="3">Mã HS </th>
        <th rowSpan="3">Họ Tên</th>
        <th colSpan={4}>Học kỳ 1 (Hạn nhập điểm: {standarDate(props.limitInput1)}) </th>
        <th colSpan={4}>Học kỳ 2 (Hạn nhập điểm: {standarDate(props.limitInput2)})</th>
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
        <th colSpan={1}>{showDropDGTX1()}</th>
        <th>{showDropGK1()}</th>
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
        <th>{showDropCK1()}</th>
        <th>TB Kỳ</th>
        <th colSpan={1}>{showDropDGTX2()}</th>
        <th> {showDropGK2()}</th>
        <th>{showDropCK2()}</th>
        <th>TB Kỳ</th>
      </tr>
    </thead>
  );
}

function RowTable(props) {
  const [marks, setmarks] = useState(props.item_value);
  const markRegular1 = props.marksregulary.filter(
    (item) => item.semester === 1
  );
  const markRegular2 = props.marksregulary.filter(
    (item) => item.semester === 2
  );
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
    const { value } = event.target;
    let obj = {
      marks_ref: props.idx,
      point: value,
    };
    props.updateMarksRegState(obj);
  };

  const onChangeNewMarksReg2 = (event) => {
    const { value } = event.target;
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
          type="number"
          step="0.1"
          min="0"
          max="10"
          style={{ width: 60 }}
          size="sm"
          // type="text"
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
          type="number"
          step="0.1"
          min="0"
          max="10"
          style={{ width: 60 }}
          size="sm"
          // type="text"
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
    if (semester === 1) {
      setIsEdit(true);
    }
    if (semester === 2) {
      setIsEdit2(true);
    }
  };
  const cancelUpdate = (semester) => {
    if (semester === 1) {
      setIsEdit(false);
    }
    if (semester === 2) {
      setIsEdit2(false);
    }
  };

  const onUpdateMarksReg = async () => {
    try {
      const valid = validateListMarksReg(listMarksReg1);
      if (valid === false) {
        props.setMessage("Nhập điểm không hợp lệ!");
        return;
      }

      const standartList = listMarksReg1.map((item) => {
        if (item.is_public === "Fasle") {
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
        if (item.is_public === "Fasle") {
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
    const { value } = event.target;
    let newList = listMarksReg1.map((item) => {
      if (item.id === data.id) {
        return { ...item, point: value };
      } else {
        return item;
      }
    });
    setListMarksReg1(newList);
  };
  const handleInputMarksReg2 = (data, event) => {
    const { value } = event.target;
    let newList = listMarksReg2.map((item) => {
      if (item.id === data.id) {
        return { ...item, point: value };
      } else {
        return item;
      }
    });
    setListMarksReg2(newList);
  };

  //XOA DIEM DANH GIA THUONG XUYEN 1
  const onDelMarksReg = async (markReg, semester) => {
    if (semester === 1) {
      const newList = listMarksReg1.filter((item) => item.id !== markReg.id);
      setListMarksReg1(newList);
    }
    if (semester === 2) {
      const newList = listMarksReg2.filter((item) => item.id !== markReg.id);
      setListMarksReg2(newList);
    }
    props.delMarksReg(markReg.id);
    // const rs = await deleteMarksReg(markReg.id);
  };
  // const selectMarks = (item, semester, event) => {
  //   if (event.target.checked == true) {
  //     console.log("chọn rồi, chuẩn bị xóa");
  //     console.log(item);
  //   }
  // };

  //HIEN THI DIEM DANH GIA THUONG XUYEN 1
  const showMark1 = listMarksReg1.map((item, index) => (
    <div
      onDoubleClick={() => {
        if (props.limitDateInput(1) === true) {
          setEditMarksReg(1);
        }
      }}
    >
      {" "}
      <Form.Control
        readonly
        type="number"
        step="0.1"
        min="0"
        max="10"
        style={{ width: 60 }}
        size="sm"
        // type="text"
        placeholder="DGTX"
        defaultValue={item.point}
        disabled={!isEdit}
        onChange={(e) => handleInputMarksReg(item, e)}
      />
      {props.marksState.isDeleteDGTX1 === true ? (
        <>
          {/* <Form.Check onChange={(e) => selectMarks(item, 1, e)} /> */}
          <Badge pill variant="danger" onClick={() => onDelMarksReg(item, 1)}>
            X
          </Badge>
        </>
      ) : (
        ""
      )}
    </div>
  ));
  // HIEN THI DIEM DANH GIA THUONG XUYEN 2
  const showMark2 = listMarksReg2.map((item, index) => (
    <div
      onDoubleClick={() => {
        if (props.limitDateInput(2) === true) {
          setEditMarksReg(2);
        }
      }}
    >
      {" "}
      <Form.Control
        type="number"
        step="0.1"
        min="0"
        max="10"
        readonly
        style={{ width: 60 }}
        size="sm"
        // type="text"
        placeholder="DGTX"
        defaultValue={item.point}
        disabled={!isEdit2}
        onChange={(e) => handleInputMarksReg2(item, e)}
      />
      {props.marksState.isDeleteDGTX2 === true ? (
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
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="mid_st_semester_point"
          style={{ width: 65 }}
          size="sm"
          // type="text"
          placeholder="GK 1"
          defaultValue={props.mid_st_semester_point}
          disabled={!props.marksState.isAddGK1}
          onChange={handleInput}
        />
      </td>
      <td>
        <Form.Control
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="end_st_semester_point"
          style={{ width: 65 }}
          size="sm"
          // type="text"
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
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="mid_nd_semester_point"
          style={{ width: 65 }}
          mb-2
          size="sm"
          // type="text"
          placeholder="GK 2"
          defaultValue={props.mid_nd_semester_point}
          onChange={handleInput}
          disabled={!props.marksState.isAddGK2}
        />
      </td>
      <td>
        <Form.Control
          type="number"
          step="0.1"
          min="0"
          max="10"
          name="end_nd_semester_point"
          style={{ width: 65 }}
          size="sm"
          // type="text"
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

