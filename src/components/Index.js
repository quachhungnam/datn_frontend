import React, { useState } from "react";
import { Card, Carousel, Container } from "react-bootstrap";

export default function Index() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

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
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
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
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
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
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Card.Header>

        <Card.Body>

          <p><h3>Hệ thống quản lý thông tin học sinh Trung học phổ thông</h3> </p>

        </Card.Body>
      </Card>
    </Container>
  );
}
