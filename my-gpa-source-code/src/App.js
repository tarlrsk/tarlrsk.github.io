import { useState, useRef, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import GradeList from "./GradeList";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useLocalStorage from 'react-localstorage-hook'


function App() {
  const couresRef = useRef();
  const subRef = useRef();
  const yearRef = useRef();
  const semRef = useRef();
  const gradeRef = useRef();
 
  const [dataItems, setDataItems] = useLocalStorage("dataitems", []);
  
  const [subject, setSubject] = useState([]);
  const [subjectOptions, setSubjectOoptions] = useState([]);
  const [group, setGroup] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  
  const semesterYear = [
    { year: "2020"},
    { year: "2021"},
    { year: "2022"},
    { year: "2023"},
    { year: "2024"},
    { year: "2025"},
    { year: "2026"},
    { year: "2027"}
  ];
  const semesterNumber =[
    { semester: "1"},
    { semester: "2"},
    { semester: "3"}
  ]

  const gradeList = [
    { grade: "A", gpa: 4},
    { grade: "A-", gpa: 3.75},
    { grade: "B+", gpa: 3.25},
    { grade: "B", gpa: 3 },
    { grade: "B-", gpa: 2.75},
    { grade: "C+", gpa: 2.25},
    { grade: "C", gpa: 2},
    { grade: "C-", gpa: 1.75},
    { grade: "D", gpa: 1},
    { grade: "F", gpa: 0},
    { grade: "W", gpa: "-"},
    { grade: "I", gpa: "-"},
    { grade: "S", gpa: "-"},
    { grade: "R", gpa: "-"},
    { grade: "TR", gpa: "-"}
  ]

  const addGrade = () => {
    const subCode = subRef.current.value
    const subName = subject.find(e => e.code === subCode)
    const grade = gradeRef.current.value
    const gpa = gradeList.find(e => e.grade === grade)
    var gradeObj = {
      semester: semRef.current.value + "/" + yearRef.current.value,
      subCode: subCode,
      subName: subName.name,
      grade: grade,
      gpa: gpa.gpa
    };
    dataItems.push(gradeObj);
    setDataItems([...dataItems]);

    console.log("after", dataItems);
  }

  const couresChange =(e) => {
    const cid = couresRef.current.value
    fetch(`cs-2019.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data = Array.from(data.curriculum.subjects);
        data = Array.from(data[cid].subjects)
        console.log(data)
        const optionSubject = data.map((e) => (
          <option key={e.code} value={e.code}>
            {e.code} - {e.name}
          </option>
        ));
        setSubject(data);
        setSubjectOoptions(optionSubject);
      });
  }
  const yearOptions = semesterYear.map(v => {
    return <option value={v.year}>{v.year}</option>
  })
  const semesterOptions = semesterNumber.map(v => {
    return <option value={v.semester} style={{ textAlign:"center"}}>{v.semester }</option>
  })
  const gradeOptions = gradeList.map(v => {
    return <option value={v.grade}>{v.grade}</option>
  })

  useEffect(() => {
    fetch(`cs-2019.json`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        data = Array.from(data.curriculum.subjects);
        console.log(data);
        const optionCourses = data.map((e) => (
          <option key={e.c_id} value={e.c_id} >
            {e.groupName}
          </option>
        ));
        data = Array.from(data[0].subjects)
        console.log(data)
        const optionSubject = data.map((e) => (
          <option key={e.code} value={e.code}>
            {e.code} - {e.name}
          </option>
        ));

        setGroup(data);
        setGroupOptions(optionCourses);
        setSubject(data);
        setSubjectOoptions(optionSubject);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={4}style={{ backgroundColor: "#22303C", borderRadius: "10px", height:"410px"}}>
          <Form style={{ color:"white" }}>
            <Form.Group className="mb -3" controlId="formItem">
              <Form.Label style={{ paddingTop:"10px"}}>Year</Form.Label>
              <Form.Label style={{ paddingTop:"10px", float:"right"}}>Semester</Form.Label><br />
              <Form.Select aria-label="Default select example" ref={yearRef} style={{width:"78%",float:"left"}}>
                {yearOptions}
              </Form.Select>
              <Form.Select aria-label="Default select example" ref={semRef} style={{width:"20%",float:"right"}}>
                {semesterOptions}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ paddingTop:"10px"}}>Select Coures</Form.Label>
              <Form.Select ref={couresRef} onChange={couresChange}>
                {groupOptions}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ paddingTop:"10px"}}>Select Subject</Form.Label>
              <Form.Select ref={subRef} onChange={couresChange}>
                {subjectOptions}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ paddingTop:"10px"}}>Grade</Form.Label>
              <Form.Select ref={gradeRef}>
                {gradeOptions}
              </Form.Select>
            </Form.Group>
            
            <br />
            <Button onClick={addGrade} variant="secondary" style={{float:"right"}}>
              Add
            </Button>

          <br />

          <br />
          <br />
          
          </Form>
        </Col>
        <Col>
      <GradeList data={dataItems} setDataItems={setDataItems} /></Col>
      </Row>
    </Container>
  );
}

export default App;
