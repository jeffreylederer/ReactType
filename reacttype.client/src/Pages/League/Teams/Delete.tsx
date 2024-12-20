import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { TeamMember } from "./TeamMember.tsx";
import { ConvertLeague, leagueType } from "../../leagueObject.tsx";


const TeamsDelete = () => {
    const location = useLocation();
    const id: number = location.state;
    const league: leagueType = ConvertLeague();  
    const [errorMsg, SeterrorMsg] = useState("");
    const [team, setTeam] = useState<TeamMember>();

    
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    }, []);

    const contents = team === undefined
        ? <p><em>Loading ...</em></p> :
        
        <Container>
            <Row>
                <Col style={{width: "200px"}}><label>Team No:</label></Col>
                <Col style={{ textAlign: "left" }}>{team?.teamNo}</Col>
            </Row>

            <Row>
                <Col style={{ width: "200px" }}><label>Skip:</label></Col>
                <Col style={{ textAlign: "left" }}>{team?.skip}</Col>
            </Row>

            <Row hidden={league.teamSize < 3}>
                <Col style={{ width: "200px" }}><label>Vice Skip:</label></Col>
                <Col style={{ textAlign: "left" }}>{team?.viceSkip}</Col>
            </Row>

            <Row hidden={league.teamSize < 2}>
                <Col style={{ width: "200px" }}><label>Lead:</label></Col>
                <Col style={{ textAlign: "left" }}>{team?.lead}</Col>
            </Row>

            <Row>
                <Col style={{ width: "200px" }}><label>Division:</label></Col>
                <Col style={{ textAlign: "left" }}>{team?.divisionId}</Col>
            </Row>

            <Row>
                <Col style={{ width: "300px" }}>
                    <input type='button' onClick={DeleteItem} value="Delete Record" />
                </Col>
            </Row>
        </Container>
        
    return (
        <div>
            <h2>Delete Team from league {league.leagueName} </h2>
            {contents}
            <p className="errorMessage">{errorMsg}</p>

        </div>
    );

    async function GetData() {
        const url: string = 'https://localhost:7002/api/Teams/getOne/'.concat(id.toString());
        axios.get(url)
            .then(response => {
                setTeam(response.data);
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    async function DeleteItem() {
        const url: string = 'https://localhost:7002/api/Teams/'.concat(id.toString());
        axios.delete(url)
            .then(response => {
                console.log(response.statusText);
                navigate("/League/Teams");
            })
            .catch(error => {
                SeterrorMsg(error.response.data);
            })
    }
}


export default TeamsDelete;