import { useEffect, useState } from 'react';
import axios from "axios";
import { useLocation} from "react-router-dom";


function ScoreCard() {
    const [report, setReport] = useState('');
    const location = useLocation();
    const id: number = location.state;




    useEffect(() => {
        GetReport();
    });

    return (
        <embed src={report} type="application/pdf" width='1000' height='800' />

    );

    async function GetReport() {
        const url: string = "https://localhost:7002/api/Matches/ScoreCard/".concat(id.toString());
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



export default ScoreCard;