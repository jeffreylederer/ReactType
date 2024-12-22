import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { FormData } from "./FormData.tsx";
import { useNavigate } from "react-router-dom";


const LeagueDetails = () => {
    const location = useLocation();
    const id: number = location.state;
    const navigate = useNavigate();
    const [league, setleague] = useState<FormData>();
    useEffect(() => {
        GetData();
    }, []);

    const contents = league === undefined
        ? <p><em>Loading ...</em></p> :

        <table>
            <tr>
                <td className="Label">Active:</td>
                <td className="Field">{league.active?"Yes":"No"}</td>

            </tr>
            <tr>
                <td className="Label">Team Size:</td>
                <td className="Field">{league.teamSize}</td>
            </tr>
            <tr>
                <td className="Label">Ties Allowed:</td>
                <td className="Field">{league.tiesAllowed ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="Label">Points Count:</td>
                <td className="Field">{league.pointsCount ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="Label">Points for a Win:</td>
                <td className="Field">{league.winPoints}</td>
            </tr>
            <tr>
                <td className="Label">Points for a Tie:</td>
                <td className="Field">{league.tiePoints}</td>
            </tr>
            <tr>
                <td className="Label">Points for a Bye:</td>
                <td className="Field">{league.byePoints}</td>
            </tr>
            <tr>
                <td className="Label">Start Week:</td>
                <td className="Field">{league.startWeek}</td>
            </tr>
            <tr>
                <td className="Label">Points Limit:</td>
                <td className="Field">{league.pointsLimit ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td className="Label">Divisions:</td>
                <td className="Field">{league.divisions}</td>
            </tr>
            <tr>
                <td className="Label">Playoffs:</td>
                <td className="Field">{league.playOffs ? "Yes" : "No"}</td>
            </tr>
            <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                    <Link to="/Admin/League/Update" state={id.toString()}>
                        <button>Update</button></Link>
                    <button onClick={() => navigate(-1)}>Go back to list</button>
                </td>
            </tr>
        </table>

    return (
        <div>
            <h3>Details for league {league?.leagueName}</h3>
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