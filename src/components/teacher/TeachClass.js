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
} from "react-bootstrap";
// import { useParams } from "react-router-dom";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  get_marksofclass_service,
  get_marksofstudent_service,
  update_marks,
  getMarksLecture
} from "../../services/marksService";
import InputMark from "./InputMark";
import { useLocation } from "react-router-dom";
import { ExportCSV } from "../ExportCSV";
export default function TeachClass(props) {
  const init_state = {
    isAddDGTX1: true,
    isEditDGTX1: true,
    isAddGK1: true,
    isEditGK1: true,
    isAddCK1: true,
    isEditCK1: true,

    isAddDGTX2: true,
    isEditDGTX: true,
    isAddGK2: true,
    isEditGK2: true,
    isAddCK2: true,
    isEditCK2: true,
  };
  const location = useLocation();
  const [listMarks, setlistMarks] = useState([]);
  const [isShowInput, setisShowInput] = useState(false);
  const [marksType, setmarksType] = useState({});
  const [timesDGTX, settimesDGTX] = useState(1);
  const [timesDGTX2, settimesDGTX2] = useState(1);

  const [enableInput, setenableInput] = useState(true);
  const [isUpdating, setisUpdating] = useState(false);
  const [marksState, dispatch] = React.useReducer((prevState, action) => {
    switch (action.type) {
      case "ADD_DGTX1":
        return {
          ...init_state,
          isAddDGTX1: false,
        };
      case "EDIT_DGTX1":
        return {
          ...init_state,
          isEditDGTX1: false,
        };
      case "ADD_DGTX2":
        return {
          ...init_state,
          isAddDGTX2: false,
        };
      case "EDIT_DGTX2":
        return {
          ...init_state,
          isEditDGTX2: false,
        };
      case "ADD_GK1":
        return {
          ...init_state,
          isAddGK1: false,
        };
      case "EDIT_GK1":
        return {
          ...init_state,
          isEditGK1: false,
        };
      case "ADD_CK1":
        return {
          ...init_state,
          isAddCK1: false,
        };
      case "EDIT_CK1":
        return {
          ...init_state,
          isEditCK1: false,
        };
      case "ADD_GK2":
        return {
          ...init_state,
          isAddGK2: false,
        };
      case "EDIT_GK2":
        return {
          ...init_state,
          isEditGK2: false,
        };
      case "ADD_CK2":
        return {
          ...init_state,
          isAddCK2: false,
        };
      case "EDIT_CK2":
        return {
          ...init_state,
          isEditCK2: false,
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
      const results = rs.results;

      setlistMarks(results);
      setisUpdating(false);
      // if (rs.results !== "") {
      //   let timesdgtx = 1;
      //   let timesdgtx2 = 1;
      //   for (let i = 0; i < results.length; i++) {
      //     let listdgtx = results[i].marks_regulary;
      //     let list1 = listdgtx.filter((item) => item.code_semester == 1);
      //     let list2 = listdgtx.filter((item) => item.code_semester == 2);

      //     if (list1.length > timesdgtx) {
      //       timesdgtx = list1.length;
      //     }
      //     if (list2.length > timesdgtx) {
      //       timesdgtx2 = list2.length;
      //     }

      //     // if (results[i].marks_regulary.length > timesdgtx) {
      //     //   timesdgtx = results[i].marks_regulary.length;
      //     // }
      //   }
      //   settimesDGTX(timesdgtx);
      //   settimesDGTX2(timesdgtx2);
      // }
    } catch (e) { }
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

  const showStudentsMarks = listMarks.map((item, index) => {

    return (
      <RowTable
        key={index}
        stt={index + 1}
        item_value={item}
        marksState={marksState}
        timesDGTX={timesDGTX}
        timesDGTX2={timesDGTX2}
        student_name={item.student.user.username}
        lecture={item.lecture}
        mid_first_semester={item.mid_st_semester_point}
        end_first_semester={item.end_st_semester_point}
        gpa_first_semester={item.gpa_st_semester_point}
        mid_second_semester={item.mid_nd_semester_point}
        end_second_semester={item.end_nd_semester_point}
        gpa_second_semester={item.gpa_nd_semester_point}
        gpa_year={item.gpa_year}
        enableInput={enableInput}
        updateFieldChanged={updateFieldChanged}
      />
    );
  });

  useEffect(() => {
    getlistMarks();
  }, []);

  const showId = () => {
    alert(JSON.stringify(listMarks));
  };

  const onShowInput = (marksObj) => {
    if (marksObj == null) {
      return;
    }
    setmarksType(marksObj);
    if (isShowInput) {
      setisShowInput(false);
      return;
    }
    if (!isShowInput) {
      setisShowInput(true);
      return;
    }
  };

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

  const addMarksRegulary = async (data) => { };
  const updateMarksRegulary = async (data) => { };

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
                    timesDGTX={timesDGTX}
                    timesDGTX2={timesDGTX2}
                    inputMarks={onShowInput}
                    enableInput={setenableInput2}
                    addMarks={dispatch}
                  />
                  <tbody>
                    {/* <RowTable numofdgtx={numOfDGTX} /> */}
                    {showStudentsMarks}
                  </tbody>
                </Table>



                <Button type="submit">Lưu điểm</Button>
                <Button type="reset">Reset</Button>
                <Button>hhhh </Button>
                <ExportCSV csvData={listMarks} fileName={"namexcel"} />
                <Row>

                </Row>



              </Card.Body>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

function HeadTable(props) {
  let timesDGTX = props.timesDGTX;
  let timesDGTX2 = props.timesDGTX2;

  return (
    <thead>
      <tr>
        <th rowSpan="3">STT</th>
        <th rowSpan="3">Năm học</th>
        <th rowSpan="3">Học sinh</th>
        <th colSpan={timesDGTX + 3}>Học kỳ 1</th>
        <th colSpan={timesDGTX + 3}>Học kỳ 2</th>
        <th rowSpan="3">Cả năm</th>
      </tr>
      <tr>
        <th colSpan={timesDGTX}>Điểm ĐGTX </th>
        <th>Giữa kỳ</th>
        <th>Cuối kỳ</th>
        <th>Trung bình môn</th>
        <th colSpan={timesDGTX2}>Điểm ĐGTX</th>
        <th>Giữa kỳ</th>
        <th>Cuối kỳ</th>
        <th>Trung bình môn</th>
      </tr>
      <tr>
        <th colSpan={timesDGTX}>
          <DropMark
            inputMarks={props.inputMarks}
            enableInput={props.enableInput}
            mark_obj={{ type: 1, name: "ĐGTX", code_semester: 1 }}
            addMarks={props.addMarks}
          />
        </th>
        <th>
          {" "}
          <DropMark
            inputMarks={props.inputMarks}
            mark_obj={{ type: 2, name: "Giữa kỳ", code_semester: 1 }}
            enableInput={props.enableInput}
            addMarks={props.addMarks}
          />
        </th>
        <th>
          {" "}
          <DropMark
            inputMarks={props.inputMarks}
            enableInput={props.enableInput}
            mark_obj={{ type: 3, name: "Cuối kỳ", code_semester: 1 }}
            addMarks={props.addMarks}
          />
        </th>
        <th>Trung bình môn</th>
        <th colSpan={timesDGTX}>
          {" "}
          <DropMark
            inputMarks={props.inputMarks}
            enableInput={props.enableInput}
            mark_obj={{ type: 1, name: "ĐGTX", code_semester: 2 }}
            addMarks={props.addMarks}
          />
        </th>
        <th>
          {" "}
          <DropMark
            inputMarks={props.inputMarks}
            enableInput={props.enableInput}
            mark_obj={{ type: 2, name: "Giữa kỳ", code_semester: 2 }}
            addMarks={props.addMarks}
          />
        </th>
        <th>
          {" "}
          <DropMark
            inputMarks={props.inputMarks}
            enableInput={props.enableInput}
            mark_obj={{ type: 3, name: "Cuối kỳ", code_semester: 2 }}
            addMarks={props.addMarks}
          />
        </th>
        <th>Trung bình môn</th>
      </tr>
    </thead>
  );
}

function DropMark(props) {
  const onInputMarks = () => {
    // props.inputMarks(props.mark_obj);
    if (props.mark_obj.code_semester == 1 && props.mark_obj.type == 1) {
      props.addMarks({ type: "ADD_DGTX1" });
    }
    if (props.mark_obj.code_semester == 1 && props.mark_obj.type == 2) {
      props.addMarks({ type: "ADD_GK1" });
    }
    if (props.mark_obj.code_semester == 1 && props.mark_obj.type == 3) {
      props.addMarks({ type: "ADD_CK1" });
    }
    if (props.mark_obj.code_semester == 2 && props.mark_obj.type == 1) {
      props.addMarks({ type: "ADD_DGTX2" });
    }
    if (props.mark_obj.code_semester == 2 && props.mark_obj.type == 2) {
      props.addMarks({ type: "ADD_GK2" });
    }
    if (props.mark_obj.code_semester == 2 && props.mark_obj.type == 3) {
      props.addMarks({ type: "ADD_CK2" });
    }
  };

  const editMarks = () => {
    props.inputMarks(props.mark_obj);
  };

  const enableInput = () => {
    // props.enableInput();
    // props.addGK1({ type: "ADD_GK1" });
  };

  return (
    <DropdownButton size="sm" title="+" id="collasible-nav-dropdown">
      <Dropdown.Item onClick={onInputMarks}>
        Nhập điểm {props.mark_obj.name}
      </Dropdown.Item>
      <NavDropdown.Divider />
      <Dropdown.Item onClick={enableInput}>
        Sửa điểm {props.mark_obj.name}
      </Dropdown.Item>
    </DropdownButton>
  );
}

function RowTable(props) {
  const [marks, setmarks] = useState(props.item_value);
  //khi them diem danh gia thuong xuyen thi hien len 1 column,n
  const filMarkSemester = (marks, semester) => {
    return marks.marksregulary.filter(
      (item) => item.semester == semester
    );
  };

  const showListDGTX2 = () => {
    if (filMarkSemester(marks, 2).length == 0) {
      return (
        <td>
          <Form.Row className="float-md-right">
            {props.marksState.isAddDGTX2 == false ? (
              <Form.Control
                readonly
                style={{ width: 80 }}
                size="sm"
                type="text"
                placeholder="DGTX"
                defaultValue={""}
                disabled={false}
              />
            ) : (
                ""
              )}
          </Form.Row>
        </td>
      );
    }

    let ele = [];
    for (let i = 0; i < filMarkSemester(marks, 2).length; i++) {
      let item;
      item = (
        <td>
          <Form.Row className="float-md-right">
            <Form.Control
              readonly
              style={{ width: 80 }}
              size="sm"
              type="text"
              placeholder="DGTX"
              defaultValue={filMarkSemester(marks, 2)[i].point}
              disabled={false}
            />
          </Form.Row>
        </td>
      );
      ele.push(item);
    }

    return ele;
  };
  const showListDGTX1 = () => {
    if (filMarkSemester(marks, 1).length == 0) {
      return (
        <td>
          <Form.Row className="float-md-right">
            {props.marksState.isAddDGTX1 == false ? (
              <Form.Control
                readonly
                style={{ width: 80 }}
                size="sm"
                type="text"
                placeholder="DGTX"
                defaultValue={""}
                disabled={false}
              />
            ) : (
                ""
              )}
          </Form.Row>
        </td>
      );
    }

    let ele = [];
    for (let i = 0; i < filMarkSemester(marks, 1).length; i++) {
      let item;
      item = (
        <td>
          <Form.Row className="float-md-right">
            <Form.Control
              readonly
              style={{ width: 80 }}
              size="sm"
              type="text"
              placeholder="DGTX"
              defaultValue={filMarkSemester(marks, 1)[i].point}
              disabled={false}
            />
          </Form.Row>
        </td>
      );
      ele.push(item);
    }

    return ele;
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    let obj = marks;
    obj[`${name}`] = value;
    setmarks({ ...marks, [name]: value });
    props.updateFieldChanged(obj);
  };

  return (
    <tr>
      <td>{props.stt}</td>
      <td>2018-2019</td>
      <td>{props.student_name}</td>
      {showListDGTX1()}
      <td>
        <Form.Control
          name="mid_first_semester"
          style={{ width: 80 }}
          size="sm"
          type="text"
          placeholder="Điểm giữa kỳ"
          defaultValue={props.mid_first_semester}
          disabled={props.marksState.isAddGK1}
          onChange={handleInput}
        />
      </td>
      <td>
        <Form.Control
          name="end_first_semester"
          style={{ width: 80 }}
          size="sm"
          type="text"
          placeholder="Cuối kỳ 1"
          defaultValue={props.end_first_semester}
          onChange={handleInput}
          disabled={props.marksState.isAddCK1}
        />
      </td>
      <td>{props.gpa_first_semester}</td>
      {showListDGTX2()}
      <td>
        <Form.Control
          name="mid_second_semester"
          style={{ width: 80 }}
          mb-2
          size="sm"
          type="text"
          placeholder="Cuối kỳ 1"
          defaultValue={props.mid_second_semester}
          onChange={handleInput}
          disabled={props.marksState.isAddGK2}
        />
      </td>
      <td>
        <Form.Control
          name="end_second_semester"
          style={{ width: 80 }}
          size="sm"
          type="text"
          placeholder="Cuối kỳ 2"
          defaultValue={props.end_second_semester}
          onChange={handleInput}
          disabled={props.marksState.isAddCK2}
        />
      </td>
      <td>{props.gpa_second_semester}</td>
      <td>{props.gpa_year}</td>
    </tr>
  );
}
