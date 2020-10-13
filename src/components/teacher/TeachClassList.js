import React from "react";
import {
  Container,
  Table,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

export default function TeachClassList() {
  return (
    <Container>
      <br></br>
      <DropdownButton id="dropdown-basic-button" title="Năm học">
        <Dropdown.Item href="#/action-1">2018-2019</Dropdown.Item>
        <Dropdown.Item href="#/action-2">2019-2020</Dropdown.Item>
        <Dropdown.Item href="#/action-3">2020-2021</Dropdown.Item>
      </DropdownButton>
      <br></br>
      <Table striped bordered hover size="sm">
        <HeadTable></HeadTable>
        <tbody>
          <RowTable
            data="4"
          ></RowTable>
          
        </tbody>
      </Table>
    </Container>
  );
}

function HeadTable() {
  return (
    <thead>
      <tr>
        <th>Số TT</th>
        <th>Lớp</th>
        <th>Môn</th>
        <th>Môn</th>
      </tr>
    </thead>
  )
}

function RowTable(props) {
  return (
    <tr>
      <td>{props.data}</td>
      <td>
        <NavLink to="/input">12a1</NavLink>
      </td>
      <td>Toán</td>
      <td>2019</td>
    </tr>
  )
}