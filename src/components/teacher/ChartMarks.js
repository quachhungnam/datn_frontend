import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { sumMarks } from "../../utils/marksUtils";

import { Pie } from "react-chartjs-2";
export default function ChartTron(props) {
    // const diemhocky = props.diemhocky;
    const listMarsk = props.listMarks;
    const type = props.types

    const diemhocky1 = listMarsk.map((item) => {
        const [sum1, ,] = sumMarks(item);
        // return [sum1, sum2, sum3]
        return sum1
    });
    const diemhocky2 = listMarsk.map((item) => {
        const [, sum2,] = sumMarks(item);
        // return [sum1, sum2, sum3]
        return sum2
    });
    const diemhocky3 = listMarsk.map((item) => {
        const [, , sum3] = sumMarks(item);
        // return [sum1, sum2, sum3]
        return sum3
    });

    const coutMarks = (data, type) => {
        let dataFil = [];
        if (type == 5) {
            dataFil = data.filter((item) => item >= 8.0);
        }
        if (type == 4) {
            dataFil = data.filter((item) => 6.5 <= item && item < 8.0);
        }
        if (type == 3) {
            dataFil = data.filter((item) => 5.0 <= item && item < 6.5);
        }
        if (type == 2) {
            dataFil = data.filter((item) => 3.5 <= item && item < 5.0);
        }
        if (type == 1) {
            dataFil = data.filter((item) => 0 <= item && item < 3.5);
        }

        return dataFil.length;
    };

    const dataIn = type == 1 ? diemhocky1 : type == 2 ? diemhocky2 : diemhocky3
    const showText = type == 1 ? "Thống kê điểm học kỳ 1" : type == 2 ? "Thống kê điểm học kỳ 2" : "Thống kê điểm cả năm"
    // console.log(JSON.stringify(ssss));
    const data = {
        datasets: [
            {
                label: "Population (millions)",
                backgroundColor: [
                    "#3e95cd",
                    "#8e5ea2",
                    "#3cba9f",
                    "#e8c3b9",
                    "#c45850",
                ],
                data: [
                    coutMarks(dataIn, 5),
                    coutMarks(dataIn, 4),
                    coutMarks(dataIn, 3),
                    coutMarks(dataIn, 2),
                    coutMarks(dataIn, 1),
                ],
            },
        ],
        labels: [
            "Điểm giỏi",
            "Điểm khá",
            "Điểm trung bình",
            "Điểm yếu",
            "Điểm kém",
        ],
    };
    return (
        <Row>
            <Col>
                <Pie
                    data={data}
                    options={{
                        title: {
                            display: true,
                            position: "bottom",
                            fontSize: 14,
                            fontColor: "red",

                            text: showText,
                        },
                    }}
                />
            </Col>
        </Row>
    );
}
