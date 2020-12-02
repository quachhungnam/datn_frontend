import React, { useState, useEffect } from "react";
import { Container, Card, Nav } from "react-bootstrap";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import parse from "html-react-parser";
import { getNotice } from "../services/noticeService";
export default function Home() {
  const [listNotice, setListNotice] = useState([]);

  const getAllNotice = async () => {
    try {
      const rs = await getNotice();
      setListNotice(rs);
    } catch (ex) {
    } finally {
    }
  };

  const showListNotice = () => {
    if (listNotice.length !==0) {
      const ListNotice = listNotice.map((item) => (
        <Card>
          <Card.Header>
            <span className="text-danger">
              <b>
                {item.post_date}
                {":"}
              </b>{" "}
            </span>
            <span className="text-primary">
              {" "}
              <b>{item.title}</b>{" "}
            </span>
          </Card.Header>
          <Card.Body> {parse(item.content)}</Card.Body>
        </Card>
      ));
      return ListNotice;
    }
    return "";
  };

  // const showListNotice = listNotice.map((item) => (
  //   <Card>
  //     <Card.Header>
  //       <span className="text-danger">
  //         <b>
  //           {item.post_date}
  //           {":"}
  //         </b>{" "}
  //       </span>
  //       <span className="text-primary">
  //         {" "}
  //         <b>{item.title}</b>{" "}
  //       </span>
  //     </Card.Header>
  //     <Card.Body> {parse(item.content)}</Card.Body>
  //   </Card>
  // ));

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

        <Card.Body>{showListNotice()}</Card.Body>
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
