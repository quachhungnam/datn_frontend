import React from "react";
import {
  Container,
  Card,
  Nav,
  Pagination,
} from "react-bootstrap";

export default function Home() {
  return (
    <Container>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#1">
            <Nav.Item>
              {/* <Button>Thông tin</Button> */}
              <Nav.Link href="#1">
                <b>Thông báo</b>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#2">
                <b>Đội đoàn</b>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>

        <Card.Body>
          <Card>
            <Card.Header>
              <span className="text-danger">
                <b>25/10/2020:</b>{" "}
              </span>
              <span className="text-primary">
                {" "}
                <b>
                  Thông báo đến học sinh Toàn trường
                </b>{" "}
              </span>
            </Card.Header>
            <Card.Body>Thông báo số 1</Card.Body>
          </Card>


        </Card.Body>
        <Card.Footer>
          <Pagination>
            <Pagination.Item>1</Pagination.Item>
            <Pagination.Item>1</Pagination.Item>
            <Pagination.Item>1</Pagination.Item>
            <Pagination.Item>1</Pagination.Item>
            <Pagination.Item>1</Pagination.Item>
          </Pagination>
        </Card.Footer>
      </Card>
    </Container>
  );
}
