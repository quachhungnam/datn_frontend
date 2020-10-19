import React from "react";
import {
  Container,
  Table,
  DropdownButton,
  NavDropdown
} from "react-bootstrap";
import {
  // BrowserRouter as Router,
  NavLink,
} from "react-router-dom";

export default function TeachClassList() {
  return (
    <Container>
      <br></br>
      <DropdownButton title="+" id="collasible-nav-dropdown">
        <NavLink to="/inputmark" className="dropdown-item">
          2018
      </NavLink>
        <NavDropdown.Divider />
        <NavLink to="/inputmark" className="dropdown-item">
          2019
      </NavLink>
      </DropdownButton>
      <br></br>
      <Table striped bordered hover size="sm">
        <HeadTable></HeadTable>
        <tbody>
          <RowTable
            data="4"
          />
          <RowTable
            data="5"
          />
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
        <th>Năm</th>

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