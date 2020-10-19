import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  DropdownButton,
  NavDropdown,
  Dropdown, Button, ButtonGroup
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MarkContext } from '../../context/MarkContext'
export default function TeachClass() {
  const [numOfDGTX, set_numOfDGTX] = useState(3);
  return (
    <Container fluid>
      <Row>
        <Col>
          <h5>ĐIỂM CHI TIẾT</h5>
          <Table striped bordered hover size="sm">
            <HeadTable numofdgtx={numOfDGTX} />
            <tbody>
              <RowTable numofdgtx={numOfDGTX} />
            </tbody>
          </Table>
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
          <DropMark marktype={1} />
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

      <Dropdown as={ButtonGroup}>
        <Button variant="success">Split Button</Button>

        <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" onClick={()=>{
            getMark()
          }}>Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <DropdownButton size="sm" title="+" id="collasible-nav-dropdown">

        <NavLink to="/inputmark" className="dropdown-item" onclick={() => {
          getMark()
        }}>
          Nhập điểm + {props.marktype}
        </NavLink>
        <NavDropdown.Divider />
        <NavLink to="/inputmark" className="dropdown-item">
          Sửa điểm + {props.marktype}
        </NavLink>
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
      <td>Nguyễn Văn Nam</td>
      {list()}
      <td >10</td>
      <td>8</td>
      <td>8</td>
      <td>10</td>
      <td>10</td>
      <td>8</td>
      <td>8</td>
      <td>8.9</td>
    </tr>
  );
}
