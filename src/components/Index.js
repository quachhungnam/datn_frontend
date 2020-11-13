import React, { useState } from "react";
import { Card, Carousel, Container, Form, Button, Spinner } from "react-bootstrap";

import { uploadFile } from '../api/student_api'
export default function Index() {
  const [index, setIndex] = useState(0);
  const [files, setfiles] = useState()
  const [isLoading, setisLoading] = useState(false)
  // const [formData, setformData] = useState(new FormData())
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleFilesChosen = async (event) => {
    let f = event.target.files[0]
    console.log(f)


    await setfiles(f)
    // alert(JSON.stringify(event.target.files))
    // this.setState({
    //   files: event.target.files
    // });
  }

  const onSendFile = async (event) => {
    event.preventDefault()
    console.log(files)
    let formData = new FormData();
    formData.append('fileanh', files);
    formData.append('name', 'name222');
    console.log(formData)
    setisLoading(true)
    await uploadFile(formData)
    setisLoading(false)
  }
  return (
    <Container>
      <Card>
        <Card.Header>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item >
              <img
                className="d-block w-100"
                src="https://image.thanhnien.vn/660/uploaded/thuyhang/2020_10_19/137b8d10fa3f04615d2e_ffko.jpg"
                alt="First slide"
                height={250}
              />
              <Carousel.Caption>
                {/* <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p> */}
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                src="holder.js"
                alt="Second slide"
                height={250}
              />

              <Carousel.Caption>
                {/* <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img
                className="d-block w-100"
                alt="Third slide"
                src="https://image.thanhnien.vn/660/uploaded/thuyhang/2020_10_19/thukhoa4_zwey.jpg"
                // width={200}
                height={250}
                width={500}
              />

              <Carousel.Caption>
                {/* <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p> */}
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Card.Header>

        <Card.Body>

          <p><h3>Hệ thống quản lý điểm trường Trung học phổ thông</h3> </p>
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
  );
}
