import React, { useState } from "react";
import {
  Card,
  Carousel,
  Container,
  Jumbotron,
} from "react-bootstrap";

// import { uploadFile } from "../services/studentService";
import Footer from "./Footer";
export default function Index() {
  const [index, setIndex] = useState(0);
  // const [files, setfiles] = useState();
  // const [isLoading, setisLoading] = useState(false);
  // const [formData, setformData] = useState(new FormData())
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  // const handleFilesChosen = async (event) => {
  //   let f = event.target.files[0];
  //   console.log(f);

  //   await setfiles(f);
  //   // alert(JSON.stringify(event.target.files))
  //   // this.setState({
  //   //   files: event.target.files
  //   // });
  // };

  // const onSendFile = async (event) => {
  //   event.preventDefault();
  //   console.log(files);
  //   let formData = new FormData();
  //   formData.append("fileanh", files);
  //   formData.append("name", "name222");
  //   console.log(formData);
  //   setisLoading(true);
  //   await uploadFile(formData);
  //   setisLoading(false);
  // };
  return (
    <>
      <Container fluid>
        <Card>
          <Card.Body>
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="http://127.0.0.1:8000/media/images/pct4.png/"
                  alt="First slide"
                  // width={800}
                  height={300}
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="http://127.0.0.1:8000/media/images/pct3.png/"
                  alt="Second slide"
                  // width={800}
                  height={300}
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  className="d-block w-100"
                  alt="Third slide"
                  src="http://127.0.0.1:8000/media/images/pct2.png/"
                  // width={800}
                  height={300}
                />
              </Carousel.Item>
            </Carousel>
            <hr />
            <Jumbotron>
              <h2>
                Chào mừng bạn đến với hệ thống quản lý điểm trường THPT Phan Chu Trinh
              </h2>
              <p>
                Theo thông tư 26/2020/TT-BGDĐT về việc sửa đổi Quy chế đánh giá,
                xếp loại học sinh THCS và THPT
              </p>
            </Jumbotron>
            {/* <Alert variant="success">
              <p>
                <h3>Hệ thống quản lý điểm trường Trung học phổ thông</h3>{" "}
              </p>
            </Alert> */}

            {/* <Form method="POST" onSubmit={onSendFile}>
            <Form.Group>
              <Form.File
                multiple={true}
                accept=".xls,.xlsx,.csv,.txt"
                name="file"
                id="exampleFormControlFile1"
                label="Example file input"
                onChange={handleFilesChosen}
              />
            </Form.Group>
            <Button type="submit">Send File</Button>
            {
              isLoading ?
                (<Button size="sm">
                  <Spinner variant="primary"></Spinner>
                </Button>)

                : ""
            }

          </Form> */}
          </Card.Body>
        </Card>
      </Container>
      <br></br>
      <Footer />
    </>
  );
}
