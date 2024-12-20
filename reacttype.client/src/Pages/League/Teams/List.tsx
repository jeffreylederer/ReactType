import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { TeamMember } from "./TeamMember.tsx";
import { ConvertLeague, leagueType } from "../../leagueObject.tsx";

function Teams() {
    const [team, setTeam] = useState<TeamMember[]>();
    const league: leagueType = ConvertLeague();
    

    useEffect(() => {
        GetData();
    }, []);

    const contents = team === undefined
        ? <p><em>Loading ...</em></p>

        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Team No</th>
                    <th>Skip</th>
                    <th hidden={league.teamSize < 3}>Vice Skip</th>
                    <th hidden={league.teamSize < 2}>Lead</th>
                    <th>Division</th>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {team.map(item =>
                    <tr key={item.id}>
                        <td>{item.teamNo}</td>
                        <td>{item.skip}</td>
                        <td hidden={league.teamSize < 3}>{item.viceSkip}</td>
                        <td hidden={league.teamSize < 2}>{item.lead}</td>
                        <td>{item.division}</td>
                        <td><Link to="/league/Teams/Update" state={item.id.toString()}>Update</Link>|
                            <Link to="/league/Teams/Delete" state={item.id.toString()}>Delete</Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h2 id="tableLabel">Teams in league {league.leagueName}</h2>
            <Link to="/League/Teams/Create">Add</Link>
            {contents}
            <p>Number of Teams: {team?.length}</p>
        </div>
    );

    async function GetData() {
       

        const url: string = "https://localhost:7002/api/Teams/".concat(league.id.toString());
        axios.get(url)
            .then(response => {
                setTeam(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Teams;