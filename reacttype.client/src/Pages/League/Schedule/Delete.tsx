import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FormData } from "./FormData.tsx";



const ScheduleDelete = () => {
    const location = useLocation();
    const id: number = location.state;

    const [schedule, setSchedule] = useState<FormData>();

    
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    }, []);

    const contents = schedule === undefined
        ? <p><em>Loading ...</em></p> :
        
        <Container>
            <Row>
                <Col style={{width: "200px"}}><label>Game Date:</label></Col>

                <Col style={{ textAlign: "left" }}>{schedule.gameDate.toDateString()}</Col>
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>playOffs:</label></Col>
                <Col style={{ textAlign: "left" }}>{schedule.playOffs? "Yes": "No"}</Col>
              
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Cancelled:</label></Col>
                <Col style={{ textAlign: "left" }}>{schedule.cancelled ? "Yes" : "No"}</Col>
              </Row>
            
            <Row>
                <Col style={{ width: "300px" }}>
                    <input type='button' onClick={DeleteItem } value="Delete Record" />
                </Col>
            </Row>
        </Container>
        
    return (
        <div>
        <h1>Delete</h1>
            {contents }
        </div>
    );

    async function GetData() {
        const url: string = 'https://localhost:7002/api/Schedules/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {
                setSchedule(response.data);
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    async function DeleteItem() {
        const url: string = 'https://localhost:7002/api/Schedules/getOne/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.delete(fullUrl)
            .then(response => {
                console.log(response.statusText);
                navigate("/Schedule");
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}


export default ScheduleDelete;