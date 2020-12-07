import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Container,
  Card,
  Button,
  Spinner,
  Badge,
} from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";

import { getRecordStudent, getMarksStudent } from "../../services/marksService";

function MyMarks() {
  const [userState] = React.useContext(AuthContext);
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

  const sumMarks = (dataMarks) => {
    const listReg = dataMarks.marksregulary;
    const listReg1 = listReg.filter((itemReg) => itemReg.semester === 1);
    const listReg2 = listReg.filter((itemReg) => itemReg.semester === 2);
    let sumReg1 = 0;
    let sumReg2 = 0;
    for (let reg1 of listReg1) {
      sumReg1 = sumReg1 + parseFloat(reg1.point);
    }
    for (let reg2 of listReg2) {
      sumReg2 = sumReg2 + parseFloat(reg2.point);
    }
    const GK1 = parseFloat(dataMarks.mid_st_semester_point);
    const CK1 = parseFloat(dataMarks.end_st_semester_point);
    const GK2 = parseFloat(dataMarks.mid_nd_semester_point);
    const CK2 = parseFloat(dataMarks.end_nd_semester_point);

    const TB_HK1 = (sumReg1 + GK1 * 2 + CK1 * 3) / (5 + listReg1.length);
    const TB_HK2 = (sumReg2 + GK2 * 2 + CK2 * 3) / (5 + listReg2.length);

    const TB_HK_1 = TB_HK1.toFixed(1);
    const TB_HK_2 = TB_HK2.toFixed(1);

    const TB_NAM = (
      (parseFloat(TB_HK_1) + parseFloat(TB_HK_2) * 2) /
      3
    ).toFixed(1);

    return [TB_HK_1, TB_HK_2, TB_NAM];
  };

  const getAllMarks = async () => {
    setisLoading(true);
    const rs = await getMarksStudent(userState.user.user_id);
    setisLoading(false);
    if (rs.count > 0) {
      const marksByYear = await groupBy(rs.results, "from_year");
      setlistMarks(marksByYear);
    }
  };

  const getAllRecord = async () => {
    const rs = await getRecordStudent(userState.user.user_id);
    if (rs.count > 0) {
      setlistRecord(rs.results);
    }
  };

  const sumAllMarksStudent = (data) => {
    let TBK1 = 0;
    let TBK2 = 0;
    let TBK3 = 0;
    let l = data.length;
    for (let i = 0; i < data.length; i++) {
      const [k1, k2, k3] = sumMarks(data[i]);
      TBK1 = parseFloat(TBK1) + parseFloat(k1);
      TBK2 = parseFloat(TBK2) + parseFloat(k2);
      TBK3 = parseFloat(TBK3) + parseFloat(k3);
    }
    return [TBK1 / l, TBK2 / l, TBK3 / l];
  };

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

  const getConduct = (data, year) => {
    const dataOfYear = data.filter(
      (item) => item.school_year.from_year === year
    );
    const st_semester_conduct = 2;
    const nd_semester_conduct = 3;
    const year_conduct = (st_semester_conduct + nd_semester_conduct * 2) / 3;

    return [st_semester_conduct, nd_semester_conduct, year_conduct];
  };

  const showMarkRe = () => {
    let arrMarks = [];
    for (let key in listMarks) {
      let year = key;
      let newList = listMarks[key];
      const [TBK1, TBK2, TBK3] = sumAllMarksStudent(newList);
      const [con1, con2, con3] = getConduct(listRecord, year);
      let ele = (
        <RowRecord
          year={year}
          TBK1={TBK1}
          TBK2={TBK2}
          TBK3={TBK3}
          con1={con1}
        />
      );
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
      <Card>
        <Card.Body>
          <h5 className="inline-h5">BẢNG ĐIỂM TỔNG KẾT</h5>{" "}
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
          <hr />
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
            <tbody>{showMarkRe()}</tbody>
          </Table>
        </Card.Body>
      </Card>
      <hr></hr>

      <Card>
        <Card.Body>
          <h5>BẢNG ĐIỂM CHI TIẾT</h5>
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
  const sumMarks = (dataMarks) => {
    const listReg = dataMarks.marksregulary;
    const listReg1 = listReg.filter((itemReg) => itemReg.semester === 1);
    const listReg2 = listReg.filter((itemReg) => itemReg.semester === 2);
    let sumReg1 = 0;
    let sumReg2 = 0;
    for (let reg1 of listReg1) {
      sumReg1 = sumReg1 + parseFloat(reg1.point);
    }
    for (let reg2 of listReg2) {
      sumReg2 = sumReg2 + parseFloat(reg2.point);
    }
    const GK1 = parseFloat(dataMarks.mid_st_semester_point);
    const CK1 = parseFloat(dataMarks.end_st_semester_point);
    const GK2 = parseFloat(dataMarks.mid_nd_semester_point);
    const CK2 = parseFloat(dataMarks.end_nd_semester_point);

    const TB_HK1 = (sumReg1 + GK1 * 2 + CK1 * 3) / (5 + listReg1.length);
    const TB_HK2 = (sumReg2 + GK2 * 2 + CK2 * 3) / (5 + listReg2.length);

    const TB_HK_1 = TB_HK1.toFixed(1);
    const TB_HK_2 = TB_HK2.toFixed(1);

    const TB_NAM = (
      (parseFloat(TB_HK_1) + parseFloat(TB_HK_2) * 2) /
      3
    ).toFixed(1);

    return [TB_HK_1, TB_HK_2, TB_NAM];
  };

  // const showgi = () => {
  //   alert(JSON.stringify(listMarksYear));
  // };

  const listMarks = listMarksYear.map((item, index) => {
    const [sum1, sum2, sum3] = sumMarks(item);
    return (
      <RowDetail
        key={index}
        stt={index + 1}
        year={props.year}
        subject_name={item.lecture.subject.subject_name}
        mid_st_semester_point={item.mid_st_semester_point}
        end_st_semester_point={item.end_st_semester_point}
        gpa_st_semester_point={sum1}
        mid_nd_semester_point={item.mid_nd_semester_point}
        end_nd_semester_point={item.end_nd_semester_point}
        gpa_nd_semester_point={sum2}
        gpa_year_point={sum3}
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
  const markRegular1 = props.marksregulary.filter(
    (item) => item.semester === 1
  );
  const markRegular2 = props.marksregulary.filter(
    (item) => item.semester === 2
  );

  const showMark1 = markRegular1.map((item, index) => (
    <span>
      {" "}
      <Badge variant="light">{item.point}</Badge>
    </span>
  ));
  const showMark2 = markRegular2.map((item, index) => (
    <span>
      <Badge variant="light">{item.point}</Badge>
    </span>
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
  // const xetHK = (data)=>{
  //   if(data==1){
  //     return ""
  //   }
  // }

  return (
    <tr>
      <td>{}</td>
      <td>{props.year}</td>
      <td>{props.TBK1}</td>
      <td>{props.con1}</td>
      <td>{}</td>
      <td> {props.TBK2}</td>
      <td></td>
      <td></td>
      <td>{props.TBK3}</td>
      <td></td>
      <td></td>
    </tr>
  );
}

export default MyMarks;
