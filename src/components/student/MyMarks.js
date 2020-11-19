import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Container, Card, Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

import {
  get_record_student,
  get_marks_student,
} from "../../services/marksService";

function MyMarks() {
  const [userState, dispatch] = React.useContext(AuthContext);
  const [listRecord, setlistRecord] = useState([]);
  const [listMarks, setlistMarks] = useState({});
  const [isLoading, setisLoading] = useState(false);

  function groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      let key = obj.lecture.school_year[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  const getAllMarks = async () => {
    setisLoading(true);
    const rs = await get_marks_student(userState.user.user_id);
    setisLoading(false);
    if (rs.count > 0) {
      const marksByYear = await groupBy(rs.results, "from_year");
      setlistMarks(marksByYear);
    }
  };

  const getAllRecord = async () => {
    const rs = await get_record_student(userState.user.user_id);
    if (rs.count > 0) {
      setlistRecord(rs.results);
    }
  };

  const showRecord = listRecord.map((item, index) => (
    <RowRecord key={index} stt={index + 1} data={item} />
  ));

  const showMarksDetail = () => {
    let arrMarks = [];
    for (let key in listMarks) {
      let year = key;
      let newList = listMarks[key];
      let ele = <TableRecordDetail key={year} year={key} listMarks={newList} />;
      arrMarks.push(ele);
    }
    return arrMarks;
  };

  useEffect(() => {
    getAllRecord();
    getAllMarks();
  }, []);

  return (
    <Container fluid>
      <br></br>
      <Card>
        <Card.Header>
          <Card.Title>
            <h5 className="inline-h5">ĐIỂM TỔNG KẾT</h5>{" "}
            {isLoading ? (
              <Button
                className="float-md-right"
                variant="primary"
                size="sm"
                disabled
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
            <tbody>{showRecord}</tbody>
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
          {showMarksDetail()}
        </Card.Body>
      </Card>
    </Container>
  );
}
// bang diem chi tiet
function TableRecordDetail(props) {
  const listMarksYear = props.listMarks;
  const showgi = () => {
    alert(JSON.stringify(listMarksYear));
  };

  const listMarks = listMarksYear.map((item, index) => {
    return (
      <RowDetail
        stt={index + 1}
        year={props.year}
        subject_name={item.lecture.subject.subject_name}
        mid_st_semester_point={item.mid_st_semester_point}
        end_st_semester_point={item.end_st_semester_point}
        gpa_st_semester_point={item.gpa_st_semester_point}
        mid_nd_semester_point={item.mid_nd_semester_point}
        end_nd_semester_point={item.end_nd_semester_point}
        gpa_nd_semester_point={item.gpa_nd_semester_point}
        gpa_year_point={item.gpa_year_point}
        is_public={item.is_public}
        is_locked={item.is_locked}
        st_due_input={item.st_due_input}
        nd_due_input={item.nd_due_input}
        marksregulary={item.marksregulary}
      />
    );
  });

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
          <th>Điểm ĐGTX</th>
          <th>Giữa kỳ</th>
          <th>Cuối kỳ</th>
          <th>Trung bình môn</th>
          <th>Điểm ĐGTX</th>
          <th>Giữa kỳ</th>
          <th>Cuối kỳ</th>
          <th>Trung bình môn</th>
        </tr>
      </thead>
      <tbody>{listMarks}</tbody>
    </Table>
  );
}
// tung mon hoc
function RowDetail(props) {
  const markRegular1 = props.marksregulary.filter((item) => item.semester == 1);
  const markRegular2 = props.marksregulary.filter((item) => item.semester == 2);

  const showMark1 = markRegular1.map((item, index) => (
    <span>{item.point}</span>
  ));
  const showMark2 = markRegular1.map((item, index) => (
    <span>{item.point}</span>
  ));

  return (
    <tr>
      <td>{props.stt}</td>
      <td>{props.year}</td>
      <td>{props.subject_name}</td>

      <td>{showMark1}</td>
      <td>{props.mid_st_semester_point}</td>
      <td>{props.end_st_semester_point}</td>
      <td>{props.gpa_st_semester_point}</td>

      <td>{showMark2}</td>
      <td>{props.mid_nd_semester_point}</td>
      <td>{props.end_nd_semester_point}</td>
      <td>{props.gpa_nd_semester_point}</td>

      <td>{props.gpa_year_point}</td>
    </tr>
  );
}

// bang diem tong ket
function RowRecord(props) {
  return (
    <tr>
      <td>{props.stt}</td>
      <td>
        {props.data.school_year.from_year.slice(0, 4)} {" - "}
        {props.data.school_year.to_year.slice(0, 4)}
      </td>
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
  );
}

export default MyMarks;
