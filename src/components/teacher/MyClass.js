import React from "react";
import { Container, Row, Col, Table, } from 'react-bootstrap'
export default function MyClass() {

  return (
    <Container>
      <br></br>
      <Row>
        <Col>
          <p>Lớp chủ nhiệm: 12a5</p>
        </Col>
        <Col>
          <p>Niên khóa: 2019-2020</p>
        </Col>
        <Col>
          <p>Sỉ số: 40</p>
        </Col>
        <Col>
          <span>Nam: 15</span>
        </Col>
        <Col>
          <span>Nữ: 25</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>Danh sách lớp:</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>
                  Số TT
                </th>
                <th>
                  Họ và tên
                </th>
                <th>
                  Giới tính
                </th>
                <th>
                  Năm sinh
                </th>
                <th>
                  Email
                </th>
                <th>
                  Số điện thoại
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Nguyễn Văn Nam</td>
                <td>Nam</td>
                <td>27.02.1993</td>
                <td>0974436947</td>
                <td>0974436947</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
