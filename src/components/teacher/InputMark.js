import React, { useState } from "react";
import { Container, Row, Col, Table, Button, InputGroup, Form } from 'react-bootstrap'
import { MarkContext } from '../../context/MarkContext'
export default function InputMark(props) {
    const [numOfDGTX, set_numOfDGTX] = useState(3)
    // const {data}=props.location
    const list_student = props.list_marks.map((item) => (
        <RowTable
            numofdgtx={numOfDGTX}
            student_name={item.student.user.username}
            lecture={item.lecture}
            mid_first_semester={item.mid_first_semester}
            end_first_semester={item.end_first_semester}
            gpa_first_semester={item.gpa_first_semester}
            mid_second_semester={item.mid_second_semester}
            end_second_semester={item.end_second_semester}
            gpa_second_semester={item.gpa_second_semester}
            gpa_year={item.gpa_year}
        />
    ))
    return (
        <Container>

            <Row>
                <Col>
                    <h5>ĐIỂM CHI TIẾT</h5>
                    <Table striped bordered hover size="sm">
                        <HeadTable
                            numofdgtx={numOfDGTX}
                        />
                        <tbody>
                            {list_student}
                            {/* <RowTable
                                numofdgtx={numOfDGTX}
                            />
                            <RowTable
                                numofdgtx={numOfDGTX}
                            /> */}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container >

    )
}

function HeadTable(props) {
    const [markState, dispathMark] = React.useContext(MarkContext)
    let colSpan = props.numofdgtx
    return (
        <thead>
            <tr>
                <th>STT</th>
                <th >Họ và tên{markState.marktype} </th>
                <th >Lớp</th>
                <th >Môn</th>
                <th >Điểm gì đó</th>
            </tr>
        </thead>
    )
}

function RowTable(props) {
    const update_mark=()=>{
        
    }
    const list = () => {
        let ele = []
        for (let i = 0; i < props.numofdgtx; i++) {
            ele.push(
                <td>1</td>
            )
        }

        return (
            ele
        )
    }

    return (
        <tr>
            <td>1</td>
            <td>{props.student_name}</td>
            <td>{props.lecture.classes.class_name}</td>
            <td>{props.lecture.subject.subject_name}</td>
            <td><Form.Control size="sm" type="text" placeholder="Điểm" /></td>
        </tr>
    )

}