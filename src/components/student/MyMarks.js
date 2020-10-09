/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Form,
  Nav,
  NavDropdown,
  FormControl,
  Button,
  Table,
  Col, Container, Row
} from "react-bootstrap";

function MyMarks() {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [arr_trans, set_arr_trans] = useState([]);
  const initFormState = { username: null, password: null };
  const [task, setTask] = useState(initFormState);
  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  async function get_account_infor() {
    try {
      let result = await fetch(`http://127.0.0.1:8000/api/users/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let resultJson = await result.json();
      return resultJson;
    } catch (err) {
      console.error(`Error is: ${err}`);
      return err;
    }
  }

  const getAllPosts = async () => {
    try {
      const res = await get_account_infor();
      if (res.error) {
        set_arr_trans([]);
        return;
      } else {
        const all_trans = res;
        set_arr_trans(all_trans);
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  useEffect(() => {
    // getAllPosts()
  }, []);

  const login = () => {
    getAllPosts();
  };
  const show = () => {
    getAllPosts();
    alert(JSON.stringify(arr_trans));
  };
  const show2 = () => {
    alert(JSON.stringify(task.username));
  };
  return (
    <Container fluid>
      <br></br>
      <h5>ĐIỂM TỔNG KẾT</h5>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th rowSpan="2">STT</th>
            <th rowSpan="2">Năm học</th>
            <th colSpan="3">Học kỳ 1</th>
            <th colSpan="3">Học kỳ 2</th>
            <th colSpan="3">Cả năm</th>
          </tr>
          <tr>
            <th>Điểm trung bình</th>
            <th>Hạnh kiểm</th>
            <th>Xếp loại học lực</th>
            <th>Điểm trung bình</th>
            <th>Hạnh kiểm</th>
            <th>Xếp loại học lực</th>
            <th>Điểm trung bình</th>
            <th>Hạnh kiểm</th>
            <th>Xếp loại học lực</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>
              10 <a href="">chi tiet</a>{" "}
            </td>
            <td>Tốt</td>
            <td>Giỏi</td>
            <td>10 </td>
            <td>Tốt</td>
            <td>Giỏi</td>
            <td>10 </td>
            <td>Tốt</td>
            <td>Giỏi</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>
              10 <a href="">chi tiet</a>{" "}
            </td>
            <td>Tốt</td>
            <td>Giỏi</td>
            <td>10 </td>
            <td>Tốt</td>
            <td>Giỏi</td>
            <td>10 </td>
            <td>Tốt</td>
            <td>Giỏi</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>
              10 <a href="">chi tiet</a>{" "}
            </td>
            <td>Tốt</td>
            <td>Giỏi</td>
            <td>10 </td>
            <td>Tốt</td>
            <td>Giỏi</td>
            <td>10 </td>
            <td>Tốt</td>
            <td>Giỏi</td>
          </tr>
        </tbody>
      </Table>

      <hr></hr>

      <h5>ĐIỂM CHI TIẾT</h5>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th rowSpan="2">STT</th>
            <th rowSpan="2">Năm học</th>
            <th rowSpan="2">Môn học</th>
            <th colSpan="4">Học kỳ 1</th>
            <th colSpan="4">Học kỳ 2</th>
            <th rowSpan="2">Cả năm</th>
          </tr>
          <tr>
            <th>Tổng điểm ĐGTX</th>
            <th>Giữa kỳ</th>
            <th>Cuối kỳ</th>
            <th>Trung bình môn</th>
            <th>Tổng điểm ĐGTX</th>
            <th>Giữa kỳ</th>
            <th>Cuối kỳ</th>
            <th>Trung bình môn</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>Toán</td>
            <td>
              <span>9</span>+<span>9</span>+<span>9</span>
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
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>Giáo dục công dân</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>8</td>
            <td>8.2</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>Toán</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>8</td>
            <td>8.7</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>Toán</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>8</td>
            <td>8.7</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>Toán</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>8</td>
            <td>8.7</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>Toán</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>8</td>
            <td>8.7</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>Toán</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>8</td>
            <td>8.7</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>Toán</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>8</td>
            <td>8.7</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>Toán</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>8</td>
            <td>8.7</td>
          </tr>
        </tbody>
      </Table>
      <hr></hr>
      <h5>ĐÁNH GIÁ THƯỜNG XUYÊN</h5>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th rowSpan="2">STT</th>
            <th rowSpan="2">Năm học</th>
            <th rowSpan="2">Môn học</th>
            <th colSpan="4">Đánh giá TX</th>
            <th colSpan="4">Học kỳ 2</th>
            <th rowSpan="2">Cả năm</th>
          </tr>
          <tr>
            <th>Lần 1</th>
            <th>Lần 2</th>
            <th>Lần 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>Toán</td>
            <td>
              <span>9</span>+<span>9</span>+<span>9</span>
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
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>Giáo dục công dân</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>8</td>
            <td>8.2</td>
          </tr>
          <tr>
            <td>1</td>
            <td>2018-2019</td>
            <td>Toán</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>10</td>
            <td>8</td>
            <td>10</td>
            <td>8</td>
            <td>8.7</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default MyMarks;
