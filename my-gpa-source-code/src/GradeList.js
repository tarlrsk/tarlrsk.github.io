import { useState, useRef, useEffect } from "react";
import { Table, Button, Container, Col, Row } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa'
import './styles.css';
import * as React from 'react';
import Box from '@mui/material/Box';

const styles = {
    textCenter: { textAlign: 'center' },
    textRight: { textAlign: 'right' },
}




function GradeList({ data, setDataItems }) {

    const [totalGPA, setTotalGPA] = useState(0);

    const semesterList = [
        "1/2020",
        "2/2020",
        "3/2020",
        "1/2021",
        "2/2021",
        "3/2021",
        "1/2022",
        "2/2022",
        "3/2022",
        "1/2023",
        "2/2023",
        "3/2023",
        "1/2024",
        "2/2024",
        "3/2024",
        "1/2025",
        "2/2025",
        "3/2025",
        "1/2026",
        "2/2026",
        "3/2026",
        "1/2027",
        "2/2027",
        "3/2027",
    ];

    function CalGPA(props) {
        const { semRow } = props;
        let gpa = 0
        let n = 0
        data.map((v => {
            if (v.semester === semRow) {

                if (v.gpa === "-") {
                    console.log("ignore")
                } else {
                    n += 3
                    gpa += v.gpa
                }
            }
        }))
        gpa = gpa * 3
        gpa = gpa / n
        gpa = (Math.round(gpa * 100) / 100).toFixed(2);
        console.log(gpa)
        return (
            <th colSpan={1} style={{ textAlign: "center" }}>GPA : {gpa}</th>
        )
    }


    function SemTable(props) {
        const { row } = props;
        const { semRow } = props;
        if (row.semester === semRow) {
            return (
                <tr key={row}>
                    <td style={{ width: "5%" }}>< FaTrash style={styles.textCenter} onClick={(row) => deleteClick(row)} /></td>
                    <td style={styles.textLeft}>{row.subCode} - {row.subName}</td>
                    <td style={styles.textRight}>{row.grade}</td>
                </tr>
            )
        } else {
            return (
                null
            )
        }
    }

    function EachSemesterTable(props) {
        const { semRow } = props
        const check = data.find(data => data.semester === semRow)
        console.log(check)
        if (check !== undefined) {

            return (
                <Table striped bordered hover variant="light" style={{ borderRadius: "10px" }}>
                    <thead>
                        <tr>
                            <th colSpan={2} style={{ textAlign: "center", width: "85%" }}>Semester {semRow}</th>
                            <CalGPA semRow={semRow} />
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((v, i) => (
                            <SemTable key={i} row={v} semRow={semRow} />
                        ))}
                    </tbody>
                </Table>
            )
        } else {
            return (null)
        }
    }

    useEffect(() => {
        let totalGPA = 0
        let n = 0
        data.map((v) => {
            if (v.gpa === "-") {
                console.log("ignore")
            } else {
                n += 3
                totalGPA += v.gpa
            }
        });
        totalGPA = totalGPA * 3
        totalGPA = totalGPA / n
        totalGPA = (Math.round(totalGPA * 100) / 100).toFixed(2);
        
        console.log("GPAC", totalGPA)
        if (totalGPA !== "NaN"){
            setTotalGPA(totalGPA)
        }

    }, [data]);

    const clearTable = () => {
        setDataItems([]);
    };

    const deleteClick = (v) => {
        console.log(v);
        var index = data.indexOf(v)
        data.splice(index, 1)
        setDataItems([...data])
    }
    return (
        <Container style={{ backgroundColor: "#22303C", borderRadius: "10px", paddingBottom: "10px" }}>
            <Row>
                <Col>
                    <br />
                    <h1 style={{ color: "white" }}>Grade List</h1>
                </Col>
            </Row>

            <Row style={{ paddingBottom: 10 }}>
                <Col><br />
                    <Box component="span" sx={{ float:"left" ,padding: 0.75 ,textAlign: "center", backgroundColor: '#ecedee', borderRadius: "5px" }}>
                        GPAC: {totalGPA}
                    </Box>
                    <Button onClick={clearTable} variant="warning" style={{ float: "right" }}>Delete All</Button>
                </Col>
            </Row>
            <Row>
            </Row>
            <Row>
            </Row>
            {semesterList.map((v, i) => (
                <EachSemesterTable semRow={v} />
            ))}
        </Container>
    );
}
export default GradeList;
