import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { FormData } from "./FormData.tsx";



const LeagueDetails = () => {
    const location = useLocation();
    const id: number = location.state;

    const [league, setleague] = useState<FormData>();




    useEffect(() => {
        GetData();
    }, []);

    const contents = league === undefined
        ? <p><em>Loading ...</em></p> :

        <Container>
            <Row>
                <Col style={{ width: "200px" }}><label>League Name:</label></Col>

                <Col style={{ textAlign: "left" }}>{league.leagueName}</Col>
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Active:</label></Col>
                <Col style={{ textAlign: "left" }}>{league.active?"Yes":"No"}</Col>

            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Team Size:</label></Col>
                <Col style={{ textAlign: "left" }}>{league.teamSize}</Col>
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Ties Allowed:</label></Col>
                <Col style={{ textAlign: "left" }}>{league.tiesAllowed ? "Yes" : "No"}</Col>
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Points Count:</label></Col>
                <Col style={{ textAlign: "left" }}>{league.pointsCount ? "Yes" : "No"}</Col>
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Points for a Win:</label></Col>
                <Col style={{ textAlign: "left" }}>{league.winPoints}</Col>
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Points for a Tie:</label></Col>
                <Col style={{ textAlign: "left" }}>{league.tiePoints}</Col>
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Points for a Bye:</label></Col>
                <Col style={{ textAlign: "left" }}>{league.byePoints}</Col>
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Start Week:</label></Col>
                <Col style={{ textAlign: "left" }}>{league.startWeek}</Col>
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Points Limit:</label></Col>
                <Col style={{ textAlign: "left" }}>{league.pointsLimit ? "Yes" : "No"}</Col>
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Divisions:</label></Col>
                <Col style={{ textAlign: "left" }}>{league.divisions}</Col>
            </Row>
            <Row>
                <Col style={{ width: "200px" }}><label>Playoffs:</label></Col>
                <Col style={{ textAlign: "left" }}>{league.playOffs ? "Yes" : "No"}</Col>
            </Row>
            <Row>
                <Col style={{ width: "300px" }}>
                    <Link to="/League/Update" state={id.toString()}>
                        <button>Update</button></Link>
                </Col>
            </Row>
        </Container>

    return (
        <div>
            <h1>Details</h1>
            {contents}
        </div>
    );

    async function GetData() {
        const url: string = 'https://localhost:7002/api/leagues/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {
                setleague(response.data);
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    

  
}


export default LeagueDetails;