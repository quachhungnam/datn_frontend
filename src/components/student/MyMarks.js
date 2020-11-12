/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Container, Row, Card
} from "react-bootstrap";
import { get_record_student } from '../../api/marks_api'


function MyMarks() {


  const initFormState = { username: null, password: null };
  const [task, setTask] = useState(initFormState);
  const [listRecord, setlistRecord] = useState([])
  const getAllRecord = async () => {
    const rs = await get_record_student(389)
    if (rs.count > 0) {
      setlistRecord(rs.results)
    }
  }
  const showRecord = listRecord.map((item, index) => (
    <RowRecord
      key={index}
      stt={index + 1}
      data={item}
    >

    </RowRecord>
  ))

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTask({ ...task, [name]: value });
  };

  useEffect(() => {
    getAllRecord()
  }, []);



  return (
    <Container fluid>
      <br></br>
      <Card>
        <Card.Header>
          <Card.Title>
            <h5>ĐIỂM TỔNG KẾT</h5>
          </Card.Title>
        </Card.Header>
        <Card.Body>
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
              {showRecord}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <hr></hr>

      <Card>
        <Card.Header>
          <Card.Title>
            <h5>ĐIỂM CHI TIẾT</h5>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <hr></hr>
          <TableRecordDetail></TableRecordDetail>
        </Card.Body>
      </Card>

    </Container>
  );
}
function TableRecordDetail(props) {
  return (
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
  )
}


function RowRecord(props) {
  return (
    <tr>
      <td>{props.stt}</td>
      <td>{props.data.school_year.from_year.slice(0, 4)} {' - '}{props.data.school_year.to_year.slice(0, 4)}</td>
      <td>{props.data.gpa_first_semester}</td>
      <td>{props.data.conduct_stsemester}</td>
      <td>{props.data.rating_stsemester}</td>
      <td>{props.data.gpa_second_semester} </td>
      <td>{props.data.conduct_ndsemester}</td>
      <td>{props.data.rating_ndsemester}</td>
      <td>{props.data.gpa_year} </td>
      <td>{props.data.conduct_gpasemester}</td>
      <td>{props.data.rating}</td>
    </tr>
  )
}

export default MyMarks;
