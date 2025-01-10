import { useEffect, useState } from 'react';
import axios from "axios";
import { LeagueType } from "../../leagueObject.tsx";



export const ClearMatches = () => {
    const league: LeagueType = JSON.parse(localStorage.getItem("league") as string);
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        GetData();
    });
    return (
        <>
            <h3>Clear Matches</h3>
            <p style={{ textAlign: "center"} }>{errorMsg}</p>
        </>
    );

    async function GetData() {
        const url: string = import.meta.env.VITE_SERVER_URL+"api/Matches/ClearSchedule/".concat(league.id.toString());
        axios.get(url)
            .then(response => {
                setErrorMsg("Schedule cleared");
                console.log(response.data);

            })
            .catch(error => {
                if (error.response.status === 404)
                    setErrorMsg("Could not find service")
                else
                    setErrorMsg(error.response.data);
            })
    }
}