import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  DropdownButton,
  NavDropdown,
  Dropdown,
  Button,
  Card,
  Form,
  Spinner,
  Tab,
  Modal,
  Badge,
} from "react-bootstrap";
// import { useParams } from "react-router-dom";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  get_marksofclass_service,
  get_marksofstudent_service,
  update_marks,
  getMarksLecture,
  addMarksReg,
  deleteMarksReg,
  updateMarksReg,
} from "../../services/marksService";
import InputMark from "./InputMark";
import { useLocation } from "react-router-dom";
import { ExportCSV } from "../ExportCSV";
export default function TeachClass(props) {
  const init_state = {
    isAddDGTX1: false,
    isEditDGTX1: false,
    isDeleteDGTX1: false,
    isAddGK1: false,
    isEditGK1: false,
    isAddCK1: false,
    isEditCK1: false,

    isAddDGTX2: false,
    isEditDGTX: false,
    isAddGK2: false,
    isEditGK2: false,
    isAddCK2: false,
    isEditCK2: false,
  };
  const location = useLocation();
  const [listMarks, setlistMarks] = useState([]);
  const [isShowInput, setisShowInput] = useState(false);
  const [marksType, setmarksType] = useState({});
  const [enableInput, setenableInput] = useState(true);
  const [isUpdating, setisUpdating] = useState(false);

  const [listMarksReg, setListMarksReg] = useState([]);
  const [marksState, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case "ADD_DGTX1":
        return {
          ...init_state,
          isAddDGTX1: true,
        };
      case "EDIT_DGTX1":
        return {
          ...init_state,
          isEditDGTX1: true,
        };
      case "DELETE_DGTX1":
        return {
          ...init_state,
          isDeleteDGTX1: true,
        };
      case "ADD_DGTX2":
        return {
          ...init_state,
          isAddDGTX2: true,
        };
      case "EDIT_DGTX2":
        return {
          ...init_state,
          isEditDGTX2: true,
        };
      case "ADD_GK1":
        return {
          ...init_state,
          isAddGK1: true,
        };
      case "EDIT_GK1":
        return {
          ...init_state,
          isEditGK1: true,
        };
      case "ADD_CK1":
        return {
          ...init_state,
          isAddCK1: true,
        };
      case "EDIT_CK1":
        return {
          ...init_state,
          isEditCK1: true,
        };
      case "ADD_GK2":
        return {
          ...init_state,
          isAddGK2: true,
        };
      case "EDIT_GK2":
        return {
          ...init_state,
          isEditGK2: true,
        };
      case "ADD_CK2":
        return {
          ...init_state,
          isAddCK2: true,
        };
      case "EDIT_CK2":
        return {
          ...init_state,
          isEditCK2: true,
        };
      default:
        return {
          ...init_state,
        };
    }
  }, init_state);

  const getlistMarks = async () => {
    try {
      setisUpdating(true);
      const lectureId = location.state;
      const rs = await getMarksLecture(lectureId);

      if (rs.count > 0) {
        const results = rs.results;
        setlistMarks(results);
      }
    } catch (ex) {
    } finally {
      setisUpdating(false);
    }
  };

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
  const updateMarksReg = (values) => {
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
        st_due_input={item.st_due_input}
        nd_due_input={item.nd_due_input}
        enableInput={enableInput}
        updateFieldChanged={updateFieldChanged}
        updateMarksReg={updateMarksReg}
      />
    );
  });

  const onBack = () => {
    setisShowInput(true);
  };

  const setenableInput2 = () => {
    if (enableInput) {
      setenableInput(false);
      return;
    }
    if (!enableInput) {
      setenableInput(true);
      return;
    }
  };

  const updateManyMarks = async (data) => {
    const allRespone = data.map((item) => {
      const rs = update_marks(item);
      return rs;
    });
    return Promise.all(allRespone);
  };

  const onupdateMarks = async (event) => {
    event.preventDefault();
    setisUpdating(true);
    const rs = await updateManyMarks(listMarks);
    rs.map((item, index) => {
      if (!item.id) {
        alert("err");
      }
    });
    console.log(rs);
    setisUpdating(false);
  };

  const addManyMarksReg = async (data) => {
    const allNewMarks = data.map((item) => {
      // let new_marksReg = {
      //   marks_ref: item.id,
      //   semester: 1,
      // };
      const rs = addMarksReg(item);
      return rs;
    });
    return Promise.all(allNewMarks);
  };

  const showId = async () => {
    setisUpdating(true);
    const rs = await addManyMarksReg(listMarksReg);
    rs.map((item, index) => {
      if (!item.id) {
        alert("err");
      }
    });
    console.log(rs);
    setisUpdating(false);
  };

  const onAddMarksReg = async () => {
    // setisUpdating(true);
    // const rs = await addManyMarksReg(listMarks);
    // rs.map((item, index) => {
    //   if (!item.id) {
    //     alert("err");
    //   }
    // });
    // console.log(rs);
    // setisUpdating(false);
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

  const updateMarksRegulary = async (data) => {};

  useEffect(() => {
    getlistMarks();
  }, []);

  if (isShowInput == true && marksType !== null) {
    return (
      <Container fluid>
        <InputMark
          list_marks={listMarks}
          on_back={onBack}
          marktype={marksType}
        ></InputMark>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Card.Title>
                ĐIỂM CHI TIẾT MÔN GÌ, NĂM HỌC GÌ{" "}
                {isUpdating ? (
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
                    enableInput={setenableInput2}
                    addMarks={dispatch}
                  />
                  <tbody>{showStudentsMarks}</tbody>
                </Table>
                <Button type="submit">Lưu điểm</Button>
                <Button type="reset">Reset</Button>{" "}
                <Button onClick={showId}>Show Thu</Button>{" "}
                <ExportCSV csvData={listMarks} fileName={"namexcel"} />
                <Row></Row>
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
        <th rowSpan="3">Năm học</th>
        <th rowSpan="3">Học sinh</th>
        <th colSpan={4}>Học kỳ 1</th>
        <th colSpan={4}>Học kỳ 2</th>
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
          </DropdownButton>
        </th>
        <th>
          <DropdownButton id="dropdown-basic-button" size="sm" title="...">
            <Dropdown.Item
              onClick={() => {
                onAddMarksGK1();
              }}
            >
              Nhập điểm giữa kỳ 1
            </Dropdown.Item>
          </DropdownButton>{" "}
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
          {" "}
          <DropdownButton id="dropdown-basic-button" size="sm" title="...">
            <Dropdown.Item
              onClick={() => {
                onAddMarksCK1();
              }}
            >
              Nhập điểm cuối kỳ 1
            </Dropdown.Item>
          </DropdownButton>{" "}
        </th>
        <th>TB Kỳ</th>
        <th colSpan={1}>
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
          </DropdownButton>{" "}
        </th>
        <th>
          {" "}
          <DropdownButton id="dropdown-basic-button" size="sm" title="...">
            <Dropdown.Item
              onClick={() => {
                onAddMarksGK2();
              }}
            >
              Nhập điểm giữa kỳ 2
            </Dropdown.Item>
          </DropdownButton>{" "}
        </th>
        <th>
          {" "}
          <DropdownButton id="dropdown-basic-button" size="sm" title="...">
            <Dropdown.Item
              onClick={() => {
                onAddMarksCK2();
              }}
            >
              Nhập điểm cuối kỳ 2
            </Dropdown.Item>
          </DropdownButton>{" "}
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
  const [listMarksReg1, setListMarksReg1] = useState(markRegular1);
  const [listMarksReg2, setListMarksReg2] = useState(markRegular2);

  //THEM DIEM DANH GIA THUONG XUYEN
  //Lay gia tri input diem danh gia thuong xuyen 1
  const onChangeNewMarksReg = (event) => {
    const { name, value } = event.target;
    let obj = {
      marks_ref: props.idx,
      point: value,
    };
    props.updateMarksReg(obj);
  };

  const showInputMarksReg = () => {
    if (props.marksState.isAddDGTX1) {
      return (
        <Form.Control
          readonly
          style={{ width: 65 }}
          size="sm"
          type="text"
          placeholder="DGTX"
          defaultValue={""}
          disabled={false}
          onChange={onChangeNewMarksReg}
        />
      );
    }
  };
  //CAP NHAT DIEM
  const setEditMarksReg = () => {
    setIsEdit(true);
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
      const rs = await updateManyMarksReg(standartList);
      // console.log(rs);
    } catch (ex) {
    } finally {
      setIsEdit(false);
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

  //XOA DIEM DANH GIA THUONG XUYEN
  const onDelMarksReg1 = async (markReg) => {
    let newList = listMarksReg1.filter((item) => item.id != markReg.id);
    setListMarksReg1(newList);
    const rs = await deleteMarksReg(markReg.id);
  };

  //HIEN THI DIEM DANH GIA THUONG XUYEN 1
  const showMark1 = listMarksReg1.map((item, index) => (
    <div
      onDoubleClick={() => {
        setEditMarksReg();
      }}
    >
      {" "}
      <Form.Control
        readonly
        style={{ width: 65 }}
        size="sm"
        type="text"
        placeholder="DGTX"
        defaultValue={item.point}
        disabled={!isEdit}
        onChange={(e) => handleInputMarksReg(item, e)}
      />
      {props.marksState.isDeleteDGTX1 == true ? (
        <Badge pill variant="danger" onClick={() => onDelMarksReg1(item)}>
          X
        </Badge>
      ) : (
        ""
      )}
    </div>
  ));
  // HIEN THI DIEM DANH GIA THUONG XUYEN 2
  const showMark2 = listMarksReg2.map((item, index) => (
    <span>
      {" "}
      <Form.Control
        readonly
        style={{ width: 65 }}
        size="sm"
        type="text"
        placeholder="DGTX"
        defaultValue={item.point}
        disabled={false}
      />
    </span>
  ));

  return (
    <tr>
      <td>{props.stt}</td>
      <td>2018-2019</td>
      <td>{props.student.username}</td>
      <td>
        <Form.Row>
          {showMark1}
          {isEdit ? (
            <Button
              variant="success"
              size="sm"
              onClick={() => {
                onUpdateMarksReg();
              }}
            >
              Lưu
            </Button>
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
          placeholder="Điểm giữa kỳ"
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
          placeholder="Cuối kỳ 1"
          defaultValue={props.end_st_semester_point}
          onChange={handleInput}
          disabled={!props.marksState.isAddCK1}
        />
      </td>
      <td>{props.gpa_st_semester_point}</td>
      <td>
        <Form.Row>{showMark2}</Form.Row>
      </td>
      <td>
        <Form.Control
          name="mid_nd_semester_point"
          style={{ width: 65 }}
          mb-2
          size="sm"
          type="text"
          placeholder="Cuối kỳ 1"
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
          placeholder="Cuối kỳ 2"
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
