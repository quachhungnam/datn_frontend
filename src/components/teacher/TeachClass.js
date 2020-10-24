import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  DropdownButton,
  NavDropdown,
  Dropdown, Button, ButtonGroup, Card
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MarkContext } from '../../context/MarkContext'
import { get_list_student_sevice } from '../../services/student_service'
import { get_marksofclass_service } from '../../services/marks_services'
import InputMark from './InputMark'
// export const markContext = React.useContext(null)

export default function TeachClass() {
  const [numOfDGTX, set_numOfDGTX] = useState(3);
  const [list_marks, set_list_marks] = useState([])
  const [inputMark, setinputMark] = useState(false)
  const [markState, dispatchMark] = useContext(MarkContext)


  const get_all_marks = async () => {
    let lecture_id = 2
    const rs = await get_marksofclass_service(lecture_id)
    set_list_marks(rs.results)
  }


  const list_student = list_marks.map((item) => (
    <RowTable
      numofdgtx={numOfDGTX}
      student_name={item.student.user.username}
      lecture={item.lecture}
      mid_first_semester={item.mid_first_semester}
      end_first_semester={item.end_first_semester}
      gpa_first_semester={item.gpa_first_semester}
      mid_second_semester={item.mid_second_semester}
      end_second_semester={item.end_second_semester}
      gpa_second_semester={item.gpa_second_semester}
      gpa_year={item.gpa_year}
    />
  ))
  useEffect(() => {
    get_all_marks()
  }, [])

  const nhapdiem = () => {
    if (inputMark) {
      setinputMark(false)
      return
    }

    if (!inputMark) {
      setinputMark(true)
      return
    }
  }



  if (inputMark == true) {
    return (
      <Container fluid>
        <InputMark
          list_marks={list_marks}

        ></InputMark>
        <Button onClick={nhapdiem}>ffff</Button>
      </Container>
    )
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <Card.Header><Card.Title>ĐIỂM CHI TIẾT MÔN GÌ, NĂM HỌC GÌ</Card.Title></Card.Header>
            <Card.Body>

              <Table striped bordered hover size="sm">
                <HeadTable
                  numofdgtx={numOfDGTX}
                  nhapdiem={nhapdiem}

                />
                <tbody>
                  {/* <RowTable numofdgtx={numOfDGTX} /> */}
                  {list_student}
                </tbody>
              </Table>
            </Card.Body>
          </Card>


        </Col>
      </Row>
    </Container>
  );
}



function HeadTable(props) {
  let colSpan = props.numofdgtx;

  return (
    <thead>
      <tr>
        <th rowSpan="3">STT</th>
        <th rowSpan="3">Năm học</th>
        <th rowSpan="3">Học sinh</th>
        <th colSpan={colSpan + 3}>Học kỳ 1</th>
        <th colSpan="4">Học kỳ 2</th>
        <th rowSpan="3">Cả năm</th>
      </tr>
      <tr>
        <th colSpan={props.numofdgtx}>Điểm ĐGTX </th>
        <th>Giữa kỳ</th>
        <th>Cuối kỳ</th>
        <th>Trung bình môn</th>
        <th>Điểm ĐGTX</th>
        <th>Giữa kỳ</th>
        <th>Cuối kỳ</th>
        <th>Trung bình môn</th>
      </tr>
      <tr>
        <th colSpan={props.numofdgtx}>
          <DropMark
            nhapdiem={props.nhapdiem}

            marktype={1} />
        </th>
        <th>
          {" "}
          <DropMark marktype={2} />
        </th>
        <th>
          {" "}
          <DropMark marktype={3} />
        </th>
        <th>Trung bình môn</th>
        <th>
          {" "}
          <DropMark />
        </th>
        <th>
          {" "}
          <DropMark />
        </th>
        <th>
          {" "}
          <DropMark />
        </th>
        <th>Trung bình môn</th>
      </tr>
    </thead>
  );
}

function DropMark(props) {
  const [markState, dispatchMark] = React.useContext(MarkContext)
  // React.useEffect(() => {
  //   dispatchMark({ type: "GET_MARK_TYPE", marktype: "Toan gettetettee" })
  // }, [])
  const getMark = (e) => {
    alert('ddd')
    dispatchMark({ type: "GET_MARK_TYPE", marktype: "Toan gettetettee" })
  }
  return (
    <>
      {/* <Dropdown as={ButtonGroup}>
        <Button variant="success">Split Button</Button>

        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onClick={() => {
            getMark()
          }}>Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
      <DropdownButton size="sm" title="+" id="collasible-nav-dropdown">
        <Button onClick={props.nhapdiem}>Nhập điểm</Button>
        {/* <NavLink to={{
          pathname: '/inputmark"',
          data: { 'nam': 19 }
        }}
          className="dropdown-item" onClick={() => {
            getMark()
          }}>
          Nhập điểm + {props.marktype}
        </NavLink> */}
        <NavDropdown.Divider />
        {/* <NavLink to="/inputmark" className="dropdown-item">
          Sửa điểm + {props.marktype}
        </NavLink> */}
        <Button onClick={props.nhapdiem}>Sửa điểm</Button>
      </DropdownButton>
    </>

  );
}

function RowTable(props) {
  const list = () => {
    let ele = [];
    for (let i = 0; i < props.numofdgtx; i++) {
      ele.push(<td>1</td>);
    }
    return ele;
  };

  return (
    <tr>
      <td>1</td>
      <td>2018-2019</td>
      <td>{props.student_name}</td>
      {list()}
      <td >{props.mid_first_semester}</td>
      <td>{props.end_first_semester}</td>
      <td>{props.gpa_first_semester}</td>
      <td>10</td>
      <td>{props.mid_second_semester}</td>
      <td>{props.end_second_semester}</td>
      <td>{props.gpa_second_semester}</td>
      <td>{props.gpa_year}</td>
    </tr>
  );
}
