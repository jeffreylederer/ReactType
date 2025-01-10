import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { FormData } from "./FormData.tsx";
import { LeagueType } from "../../leagueObject.tsx";



const ScheduleDelete = () => {
    const location = useLocation();
    const id: number = location.state;
    const league: LeagueType = JSON.parse(localStorage.getItem("league") as string);
    const [schedule, setSchedule] = useState<FormData>();
    const [errorMsg, SeterrorMsg] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    });

    const contents = schedule === undefined
        ? <p><em>Loading ...</em></p> :
        
        <table>
            <tr>
                <td className="Label">Game Date:</td>

                <td className="Field">{schedule.gameDate}</td>
            </tr>
            <tr>
                <td className="Label">playOffs:</td>
                <td className="Field">{schedule.playOffs? "Yes": "No"}</td>
              
            </tr>
            <tr>
                <td className="Label">Cancelled:</td>
                <td className="Field">{schedule.cancelled ? "Yes" : "No"}</td>
              </tr>
            
            <tr>
                <td style={{ width: "300px" }}>
                    <input type='button' onClick={DeleteItem} value="Delete Record" />
                    <button onClick={() => navigate(-1)}>Go back to list</button>
                </td>
            </tr>
        </table>
        
    return (
        <div>
            <h3>Delete game date in league {league.leagueName}</h3>
            {contents}
            <p className="errorMessage">{errorMsg}</p>
        </div>
    );

    async function GetData() {
        const url: string = 'https://localhost:7002/api/Schedules/getOne/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {
                setSchedule(response.data);
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                SeterrorMsg('Error aquiring record: '.concat(error.response.data));
            });

    }

    async function DeleteItem() {
        const url: string = 'https://localhost:7002/api/Schedules/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.delete(fullUrl)
            .then(response => {
                console.log(response.statusText);
                navigate("/League/Schedules");
            })
            .catch(error => {
                SeterrorMsg(error.response.data);
            })
    }
}


export default ScheduleDelete;