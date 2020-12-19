import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Form,
  Row,
  Col,
  Button,
  Card,
  Spinner,
  Alert,
  Badge,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { get_schoolyear_service } from "../../services/schoolYearService";
import { get_lecture_teacher_service } from "../../services/lectureService";
import { AuthContext } from "../../context/AuthContext";

export default function TeachClassList() {
  const [userState] = React.useContext(AuthContext);
  const [listYear, setlistYear] = useState([]);
  const [currentYear, setcurrentYear] = useState(0);
  const [listLecture, setlistLecture] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const getlistLecture = async (teacherId, yearId) => {
    setisLoading(true);
    const rs = await get_lecture_teacher_service(teacherId, yearId);
    if (rs.error) {
      setMessage("Không thể kết nối đến Server!");
      setisLoading(false);
      return;
    } else {
      if (rs.results.length > 0) {
        const arr_lecture = rs.results;
        setlistLecture(arr_lecture);
      } else {
        setlistLecture([]);
      }
      setisLoading(false);
    }
  };

  const getcurrentYear = (rs) => {
    let today = new Date();
    let schoolyear_id = 0;
    let current_year = today.getFullYear();
    if (0 <= today.getMonth() && today.getMonth() <= 7) {
      current_year = current_year - 1;
    }
    for (let i = 0; i < rs.length; i++) {
      if (rs[i].from_year === current_year) {
        schoolyear_id = rs[i].id;
        setcurrentYear(rs[i].id);
      }
    }
    return schoolyear_id;
  };

  const getlistFirst = async () => {
    const rs = await get_schoolyear_service();
    if (rs.error) {
      setMessage("Không thể kết nối đến Server!");
      // setisLoading(false);
      return;
    } else {
      setlistYear(rs);
      const yearId = getcurrentYear(rs);
      getlistLecture(userState.user.user_id, yearId);
    }
  };

  const onselectYear = (event) => {
    const yearSelect = event.target.value;
    setcurrentYear(yearSelect);
    getlistLecture(userState.user.user_id, yearSelect);
  };

  const listselectYear = () => {
    return (
      <Form.Control
        size="sm"
        as="select"
        value={currentYear}
        onChange={onselectYear}
      >
        {listYear.map((item) => (
          <option className="dropdown-item" value={item.id} key={item.id}>
            {item.from_year} - {item.to_year}
          </option>
        ))}
      </Form.Control>
    );
  };

  const showMessage = () => {
    if (message != null) {
      return (
        <h5>
          <Badge variant="danger">{message}</Badge>
        </h5>
      );
    }
  };

  useEffect(() => {
    getlistFirst();
  }, []);

  return (
    <Container>
      <br></br>
      <Card>
        <Card.Body>
          <Alert variant="success">
            <h5 className="txt-upcase">Danh sách lớp giảng dạy</h5>
          </Alert>
          <hr />
          <Form.Group>
            <Row>
              <Col md={3}>{listselectYear()}</Col>
              {isLoading ? (
                <Button variant="primary" size="sm" disabled>
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
            </Row>
          </Form.Group>
          {showMessage()}
          <br></br>
          <ListTeachClass ListTeachClass={listLecture} />
        </Card.Body>
      </Card>
    </Container>
  );
}

function ListTeachClass(props) {
  const showListTeachClass = () => {
    return props.ListTeachClass;
  };
  const eleTeachClass = showListTeachClass().map((item, idx) => {
    return (
      <ClassItem
        key={idx}
        stt={idx + 1}
        letureId={item.id}
        class_name={item.classes.class_name}
        course_year={item.classes.course_year}
        subject_name={item.subject.subject_name}
        from_year={item.school_year.from_year}
        to_year={item.school_year.to_year}
      />
    );
  });

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Số TT</th>
          <th>Lớp</th>
          <th>Khóa</th>
          <th>Môn</th>
          <th>Năm học</th>
        </tr>
      </thead>
      <tbody>{eleTeachClass}</tbody>
    </Table>
  );
}

function ClassItem(props) {
  const showGradesClass = () => {
    const grades = parseInt(props.from_year) - parseInt(props.course_year);
    return 10 + grades;
  };
  const showCourseYear = () => {
    return props.course_year
  };

  return (
    <tr>
      <td>{props.stt}</td>
      <td>
        <NavLink
          className="font-weight-bold"
          to={{
            pathname: "/input",
            state: props.letureId,
          }}
        >
          {showGradesClass() + props.class_name}
        </NavLink>
      </td>
      <td>{showCourseYear()}</td>
      <td>
        <p class="text-primary font-weight-bold">{props.subject_name}</p>
      </td>
      <td>{props.from_year + " - " + props.to_year}</td>
    </tr>
  );
}
