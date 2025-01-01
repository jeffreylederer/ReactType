import { useEffect, useState } from 'react';
import axios from "axios";
import { ConvertLeague, leagueType } from "../../leagueObject.tsx";



export const CreateMatches = () => {
    const league: leagueType = ConvertLeague();
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        GetData();
    });
    return (
        <>
            <h3>Create Schedule</h3>
            <p style={{ textAlign: "center" }}>{errorMsg}</p>
        </>
    );

    async function GetData() {
        const url: string = "https://localhost:7002/api/Matches/CreateSchedule/".concat(league.id.toString());
        axios.get(url)
            .then(response => {
                setErrorMsg("Matches created");

            })
            .catch(error => {
                if (error.response.status === 404)
                    setErrorMsg("Could not find service")
                else
                    setErrorMsg(error.response.data);
            })
    }
}