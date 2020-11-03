import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import { get_classes_api } from "../../api/classes_api";
export default function MyClass() {
  const init_class = {
    id: null,
    school_year: null,
    form_teacher: null,
    class_name: null,
  };
  const [classes, set_classes] = useState(init_class);
  const [isLoading, setisLoading] = useState(false);
  const get_classes = async () => {
    try {
      setisLoading(true);
      let rs = await get_classes_api(1);
      setisLoading(false);
      set_classes(rs);
      //get list of class
    } catch (e) {}
  };

  const show_class = () => {
    alert(JSON.stringify(classes));
  };

  useEffect(() => {
    get_classes();
  }, []);

  return (
    <Container>
      <br></br>
      <Card>
        <Card.Header>
          <Card.Title>
            Lớp chủ nhiệm
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
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col>
              <p>Lớp chủ nhiệm: {classes.class_name}</p>
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
                    <th>Số TT</th>
                    <th>Họ và tên</th>
                    <th>Giới tính</th>
                    <th>Năm sinh</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
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
        </Card.Body>
      </Card>
      <button onClick={show_class}>Show</button>
    </Container>
  );
}
