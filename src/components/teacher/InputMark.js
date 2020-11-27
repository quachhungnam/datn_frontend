import React, { useState } from "react";
import { Container, Table, Button, Form, Card, Modal } from "react-bootstrap";
import {  useLocation } from "react-router-dom";
export default function InputMark(props) {
  let location = useLocation();
  console.log(location);

  // const [numOfDGTX, set_numOfDGTX] = useState(3);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [diemGK, set_diemGK] = useState([]);
  const [alldiem, setalldiem] = useState(props.list_marks);
  const post_diem = (p) => {
    // alert('oook')
    alert(JSON.stringify(p));
  };

  const save_marks = (newItem) => {
    setalldiem(
      alldiem.map((item, index) => (item.id === newItem.id ? newItem : item))
    );
  };
  const updateFieldChanged = (values) => {
    let newArr = alldiem.map((item, i) => {
      if (item.id===values.id) {
        return values;
        // return { ...item, value: values.v };
      } else {
        return item;
      }
    });
    setalldiem(newArr);
  };

  const list_student = props.list_marks.map((item, index) => (
    <RowTable
      marktype={props.marktype}
      item_value={item}
      key={index}
      // numofdgtx={numOfDGTX}
      id={item.id}
      student_name={item.student.user.username}
      lecture={item.lecture}
      mid_first_semester={item.mid_first_semester}
      end_first_semester={item.end_first_semester}
      gpa_first_semester={item.gpa_first_semester}
      mid_second_semester={item.mid_second_semester}
      end_second_semester={item.end_second_semester}
      gpa_second_semester={item.gpa_second_semester}
      gpa_year={item.gpa_year}
      post_d={post_diem}
      save_marks={save_marks}
      updateFieldChanged={updateFieldChanged}
    />
  ));

  const delete_all = () => {
    handleShow();
  };

  const go_back = () => {
    // props.on_back();
  };

  const falldiem = () => {
    alert(JSON.stringify(alldiem));
    alert(JSON.stringify(props.marktype));
  };

  return (
    <Container>
      <ShowAlert
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      ></ShowAlert>
      <Card>
        <Card.Header>
          <Card.Title>Nhập điểm {props.marktype.name}</Card.Title>
        </Card.Header>

        <Card.Body>
          <Table striped bordered hover size="sm">
            <HeadTable  />
            <tbody>
              {list_student}
              {/* <RowTable
                                numofdgtx={numOfDGTX}
                            />
                            <RowTable
                                numofdgtx={numOfDGTX}
                            /> */}
            </tbody>
          </Table>
          <span>
            <Button className="bg-success">Lưu điểm</Button>{" "}
            <Button onClick={falldiem}>Hiện điểm</Button>
          </span>
          <span className="float-md-right">
            <Button className="bg-danger" onClick={delete_all}>
              Xóa giá trị
            </Button>{" "}
            <Button className="bg-danger" onClick={go_back}>
              Quay lại
            </Button>{" "}
          </span>
        </Card.Body>
      </Card>
    </Container>
  );
}

function HeadTable(props) {
  // const [markState, dispathMark] = React.useContext(MarkContext);
  // let colSpan = props.numofdgtx;
  return (
    <thead>
      <tr>
        <th>STT</th>
        <th>Họ và tên </th>
        <th>Lớp</th>
        <th>Môn</th>
        <th>Điểm gì đó</th>
      </tr>
    </thead>
  );
}

function RowTable(props) {
  const [diem, setdiem] = useState(props.item_value);
  // const [diemGK, set_diemGK] = useState([]);

  const update_mark = () => {
    props.post_d(diem);
  };
  // const list = () => {
  //   let ele = [];
  //   for (let i = 0; i < props.numofdgtx; i++) {
  //     ele.push(<td>1</td>);
  //   }
  //   return ele;
  // };

  // const handleChange = (e) => {
  //   setPerson({
  //     ...person,
  //     [e.target.name]: e.target.value
  //   });
  // };
  // truyen xuong 1 loat cac gia tri la id cua ma diem
  const handle_input = (event) => {
    const { name, value } = event.target;
    let obj = diem;
    diem[`${name}`] = value;
    setdiem({ ...diem, [name]: value });
    props.updateFieldChanged(obj);
    // alert(JSON.stringify(obj));
    //ham thay doi diem

    // alert(JSON.stringify(obj))
    // ob={}

    // setdiem(obj);
    // props.save_marks(diem)

    // set_diemGK([...diemGK].map(object => {
    //   if(object.id === diemGK.name) {
    //     return {
    //       ...object,
    //       diemgk: value,
    //       // someNewRandomAttribute: 'X'
    //     }
    //   }
    //   else return object;
    // }))
  };

  // const updateFieldChanged = (name, index) => (event) => {
  //   let newArr = datas.map((item, i) => {
  //     if (index===i) {
  //       return { ...item, [name]: event.target.value };
  //     } else {
  //       return item;
  //     }
  //   });
  //   setDatas(newArr);
  // };

  const marks_name = () => {
    let name_value = "";
    if (props.marktype.type===1 && props.marktype.code_semester===1) {
    }
    if (props.marktype.type===2 && props.marktype.code_semester===1) {
      name_value = "mid_first_semester";
    }
    if (props.marktype.type===3 && props.marktype.code_semester===1) {
      name_value = "end_first_semester";
    }
    if (props.marktype.type===1 && props.marktype.code_semester===2) {
    }
    if (props.marktype.type===2 && props.marktype.code_semester===2) {
      name_value = "mid_second_semester";
    }
    if (props.marktype.type===3 && props.marktype.code_semester===2) {
      name_value = "end_second_semester";
    }
    return name_value;
  };

  const marks_value = () => {
    let value = 0;

    if (props.marktype.type===1 && props.marktype.code_semester===1) {
    }
    if (props.marktype.type===2 && props.marktype.code_semester===1) {
      value = props.mid_first_semester;
    }
    if (props.marktype.type===3 && props.marktype.code_semester===1) {
      value = props.end_first_semester;
    }
    if (props.marktype.type===1 && props.marktype.code_semester===2) {
    }
    if (props.marktype.type===2 && props.marktype.code_semester===2) {
      value = props.mid_second_semester;
    }
    if (props.marktype.type===3 && props.marktype.code_semester===2) {
      value = props.end_second_semester;
    }
    return value;
  };

  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.student_name}</td>
      <td>{props.lecture.classes.class_name}</td>
      <td>{props.lecture.subject.subject_name}</td>
      <td>
        <Form.Control
          name={marks_name()}
          size="sm"
          type="text"
          placeholder="Điểm"
          onChange={handle_input}
          defaultValue={marks_value()}
        />
        <button onClick={update_mark}>hien</button>
      </td>
    </tr>
  );
}

function ShowAlert(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa điểm</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa tất cả điểm!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Lưu điểm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
