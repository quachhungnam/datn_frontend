import React, { useState } from "react";
import { Container, Row, Col, Table, Button, InputGroup, FormControl } from 'react-bootstrap'

export default function TeachClass() {
  return (
    <Container>
      <Row>
        <Col>
          <h5>ĐIỂM CHI TIẾT</h5>
          <Table striped bordered hover size="sm">
            <HeadTable />
            <tbody>
              <RowTable />
              <RowTable />
              <RowTable />
              <RowTable />
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container >

  )
}

function HeadTable() {
  return (
    <thead>
      <tr>
        <th rowSpan="2">STT</th>
        <th rowSpan="2">Năm học</th>
        <th rowSpan="2">Học sinh</th>
        <th colSpan="4">Học kỳ 1</th>
        <th colSpan="4">Học kỳ 2</th>
        <th rowSpan="2">Cả năm</th>
      </tr>
      <tr>
        <th>Điểm ĐGTX </th>
        <th>Giữa kỳ</th>
        <th>Cuối kỳ</th>
        <th>Trung bình môn</th>
        <th>Điểm ĐGTX</th>
        <th>Giữa kỳ</th>
        <th>Cuối kỳ</th>
        <th>Trung bình môn</th>
      </tr>
      <tr>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
    </thead>
  )
}

function RowTable() {
  return (
    <tr>
      <td>1</td>
      <td>2018-2019</td>
      <td>Nguyễn Văn Nam</td>
      <td>
        in Row
      </td>
      <td>10</td>
      <td>8</td>
      <td>8</td>
      <td>10</td>
      <td>10</td>
      <td>8</td>
      <td>8</td>
      <td>8.9</td>
    </tr>
  )

}