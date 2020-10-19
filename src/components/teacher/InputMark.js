import React, { useState } from "react";
import { Container, Row, Col, Table, Button, InputGroup, Form } from 'react-bootstrap'
import { MarkContext } from '../../context/MarkContext'
export default function InputMark() {
    const [numOfDGTX, set_numOfDGTX] = useState(3)
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
                            <RowTable
                                numofdgtx={numOfDGTX}
                            />
                            <RowTable
                                numofdgtx={numOfDGTX}
                            />
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
            <td>Nguyễn Văn Nam</td>
            <td>12a2</td>
            <td>Toán</td>
            <td><Form.Control size="sm" type="text" placeholder="Điểm" /></td>
        </tr>
    )

}