import { useEffect, useState } from 'react';
import { LeagueType } from "../../leagueObject.tsx";
import axios from "axios";


function TeamReport() {
    const [report, setReport] = useState('');
    const league: LeagueType = JSON.parse(localStorage.getItem("league") as string);
    

    

    useEffect(() => {
        GetReport();
    });

    return (
        <embed src={report} type="application/pdf" width = '1000' height = '800' />
       
    );

    async function GetReport() {
        const url: string = "https://localhost:7002/api/Teams/TeamReport/".concat(league.id.toString());
        axios.get(url)
            .then(response => {
                const data: string = "data:application/pdf;base64,".concat(response.data);
                setReport(data);

            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }


}



export default TeamReport;