import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
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
        
        <table>
            <tr>
                <td className="Label">Team No:</td>
                <td className="Field">{team?.teamNo}</td>
            </tr>

            <tr>
                <td style={{ width: "200px" }}>Skip:</td>
                <td className="Field">{team?.skip}</td>
            </tr>

            <tr hidden={league.teamSize < 3}>
                <td style={{ width: "200px" }}>Vice Skip:</td>
                <td className="Field">{team?.viceSkip}</td>
            </tr>

            <tr hidden={league.teamSize < 2}>
                <td style={{ width: "200px" }}>Lead:</td>
                <td className="Field">{team?.lead}</td>
            </tr>

            <tr>
                <td style={{ width: "200px" }}>Division:</td>
                <td className="Field">{team?.divisionId}</td>
            </tr>

            <tr>
                <td style={{ width: "300px" }}>
                    <input type='button' onClick={DeleteItem} value="Delete Record" />
                    <button onClick={() => navigate(-1)}>Back to list</button>
                </td>
            </tr>
        </table>
        
    return (
        <div>
            <h3>Delete Team from league {league.leagueName} </h3>
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