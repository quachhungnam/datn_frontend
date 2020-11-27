import React from "react";
import { Container, Card} from "react-bootstrap";
import Footer from "./Footer";
function About() {
  return (
    <>
      <Container>
        <Card>
          <Card.Header>
            <Card.Title>
              <h4>CÁCH TÍNH ĐIỂM TRUNG BÌNH MÔN NĂM HỌC 2020-2021</h4>
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Card>
              <Card.Header>
                <h4>Giới thiệu chung</h4>
              </Card.Header>
              <Card.Body>
                <div>
                  Điểm trung bình môn phản ánh khách quan quá trình học tập của
                  học sinh THCS, THPT. Thông qua điểm này để đánh giá quá trình
                  học tập, cũng như năng lực của học sinh. Tuy nhiên để tính
                  điểm trung bình như nào thì có lẽ vẫn nhiều người còn bỡ ngỡ.
                </div>
                <br></br>
                <div>
                  Điểm trung bình môn là số điểm của rất nhiều bài kiểm tra được
                  tổng hợp lại như bài kiểm tra thường xuyên, kiểm tra định kì
                  và kiểm tra học kì.
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <h4>Cách Tính điểm Trung bình môn học kỳ</h4>
              </Card.Header>
              <Card.Body>
                <div>
                  Ngày 26/8/2020, Bộ GD&ĐT ban hành Thông tư 26/2020/TT-BGDĐT
                  sửa đổi Quy chế đánh giá, xếp loại học sinh THCS và THPT. Theo
                  đó, điểm trung bình môn học kỳ sẽ được tính theo công thức
                  sau:
                  <b>
                    &nbsp; ĐTBmhk = (TĐĐGtx + 2 x ĐĐGgk + 3 x ĐĐGck) : (Số ĐĐGtx
                    + 5)
                  </b>
                </div>
                <br></br>
                <div>
                  <b>Trong đó: </b>
                  <ul>
                    <li>TĐĐGtx: Tổng điểm kiểm tra, đánh giá thường xuyên</li>
                    <li> ĐĐGgk: Điểm kiểm tra, đánh giá giữa kì</li>
                    <li> ĐĐGck: Điểm kiểm tra, đánh giá cuối kì</li>
                    <li>TĐĐGtx: Tổng điểm kiểm tra, đánh giá thường xuyên</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header>
                <h4>Cách tính điểm trung bình môn cả năm</h4>
              </Card.Header>
              <Card.Body>
                <div>
                  Điểm trung bình môn cả năm là trung bình cộng của điểm trung
                  bình môn học kỳ 1 với điểm trung bình môn học kỳ 2 (lưu ý điểm
                  trung bình môn học kỳ 2 tính hệ số 2). Công thức tính điểm
                  trung bình môn cả năm như sau:
                </div>
                <br></br>
                <div>
                  <b>
                    Điểm trung bình môn cả năm = điểm trung bình môn học kỳ 1 +
                    (điểm trung bình môn học kỳ 2 x 2) = kết quả/3
                  </b>
                </div>
                <br></br>
                <div>
                  <b>Ví dụ:</b> Môn Văn bạn có điểm trung bình môn học kỳ 1 là
                  7.5 và học kỳ 2 là 8.0. Áp dụng công thức ở trên ta suy ra
                  được
                </div>
                <br></br>
                <div>
                  <b>Điểm trung bình môn cả năm môn Văn</b> = 7.5 + (8.0 x 2) =
                  23.5/3 = 7.8 điểm. Thêm một lưu ý nữa là điểm trung bình môn
                  học kỳ và điểm trung bình môn cả năm là số nguyên hoặc số thập
                  phân được lấy đến chữ số thập phân thứ nhất sau khi làm tròn
                  số.
                </div>
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default About;
