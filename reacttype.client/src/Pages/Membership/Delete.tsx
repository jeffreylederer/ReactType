import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FormData } from "./FormData.tsx";



const MembershipDelete = () => {
    const location = useLocation();
    const id: number = location.state;

    const [membership, setMembership] = useState<FormData>();

    
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    }, []);

    const contents = membership === undefined
        ? <p><em>Loading ...</em></p> :
        
        <Container>
            <Row>
                <Col style={{width: "200px"}}><label>First Name:</label></Col>

                <Col style={{ textAlign: "left" }}>{membership.firstName}</Col>
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Last Name:</label></Col>
                <Col style={{ textAlign: "left" }}>{membership.lastName}</Col>
              
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Short Name:</label></Col>
                <Col style={{ textAlign: "left" }}>{membership.shortname == null ? "" : membership.shortname}</Col>
              </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Wheel Chair:</label></Col>
                <Col style={{ textAlign: "left" }}>{membership.wheelchair?"Yes":"No"}</Col>
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
        const url: string = 'https://localhost:7002/api/Memberships/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {
                setMembership(response.data);
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    async function DeleteItem() {
        const url: string = 'https://localhost:7002/api/Memberships/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.delete(fullUrl)
            .then(response => {
                console.log(response.statusText);
                navigate("/Membership");
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}


export default MembershipDelete;