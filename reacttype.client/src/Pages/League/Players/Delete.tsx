import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { UpdateFormData } from "./UpdateFormData.tsx";
import { ConvertLeague, leagueType } from "../../leagueObject.tsx";


const PlayersDelete = () => {
    const location = useLocation();
    const id: number = location.state;
    const league: leagueType = ConvertLeague();  
    const [errorMsg, SeterrorMsg] = useState("");

    const [players, setPlayers] = useState<UpdateFormData>();

    
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    }, []);

    const contents = players === undefined
        ? <p><em>Loading ...</em></p> :
        
        <Container>
            <Row>
                <Col style={{width: "200px"}}><label>Name:</label></Col>

                <Col style={{ textAlign: "left" }}>{players.fullName}</Col>
            </Row>
            <Row>
                <Col style={{ width: "300px" }}>
                    <input type='button' onClick={DeleteItem} value="Delete Record" />
                </Col>
            </Row>
        </Container>
        
    return (
        <div>
            <h2>Delete player from league {league.leagueName} </h2>
            {contents}
            <p className="errorMessage">{errorMsg}</p>
        </div>
    );

    async function GetData() {
        const url: string = 'https://localhost:7002/api/Players/getOne/'.concat(id.toString());
        axios.get(url)
            .then(response => {
                setPlayers(response.data);
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                SeterrorMsg("Player record could not be found: ".concat(error.response.data));
            });

    }

    async function DeleteItem() {
        const url: string = 'https://localhost:7002/api/Players/'.concat(id.toString());
        axios.delete(url)
            .then(response => {
                console.log(response.statusText);
                navigate("/League/Players");
            })
            .catch(error => {
                
                SeterrorMsg(error.response.data);
            })
    }
}


export default PlayersDelete;