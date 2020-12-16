import React, { useState, useEffect } from "react";
import { Container, Card, Nav, Badge } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import parse from "html-react-parser";
import { getNotice } from "../services/noticeService";

export default function Home() {
  const [listNotice, setListNotice] = useState([]);
  const [message, setMessage] = useState(null);

  const getAllNotice = async () => {
    try {
      const rs = await getNotice();
      if (rs.error) {
        setMessage("Không thể kết nối đến Server!");
        return;
      } else {
        setListNotice(rs);
      }
    } catch (ex) {
    } finally {
    }
  };

  const standarDate = (data) => {
    if (data.length >= 10) {
      let d = data.slice(8, 10);
      let m = data.slice(5, 7);
      let y = data.slice(0, 4);
      return d + "-" + m + "-" + y;
    }
    return data;
  };

  const showListNotice = () => {
    if (listNotice.length !== 0) {
      const ListNotice = listNotice.map((item) => (
        <>
          <Card>
            <Card.Body>
              <span className="text-danger">
                <b>
                  {standarDate(item.post_date)}
                  {":"}
                </b>{" "}
              </span>
              <span className="text-primary">
                {" "}
                <b>{item.title}</b>{" "}
              </span>
              <hr />
              {parse(item.content)}
            </Card.Body>
          </Card>
          <br/>
        </>

      ));
      return ListNotice;
    }
    return "";
  };

  const showMessage = () => {
    if (message != null) {
      return (
        <h5>
          <Badge variant="danger">{message}</Badge>
        </h5>
      );
    }
    return "";
  };

  useEffect(() => {
    getAllNotice();
  }, listNotice);

  return (
    <Container>
      <Card>
        <Card.Header>
          <Nav variant="tabs" defaultActiveKey="#1">
            <Nav.Item>
              <Nav.Link href="#1">
                <b>Thông báo</b>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>

        <Card.Body>
          {showListNotice()}
          {showMessage()}
        </Card.Body>
        {/* <Card.Footer>
          <Pagination>
            <Pagination.Item>1</Pagination.Item>
            <Pagination.Item>1</Pagination.Item>
            <Pagination.Item>1</Pagination.Item>
            <Pagination.Item>1</Pagination.Item>
            <Pagination.Item>1</Pagination.Item>
          </Pagination>
        </Card.Footer> */}
      </Card>
    </Container>
  );
}
