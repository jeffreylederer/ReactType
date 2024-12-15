import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from 'react';
import { UpdateFormData } from "./Admin/League/UpdateFormData.tsx";
import { DataContext }  from "../DataContext.tsx";

const Welcome = () => {
    const location = useLocation();
    const id: number = location.state;
    const [league, setleague] = useState<UpdateFormData>();
    useEffect(() => {
        GetData();
    }, []);

    const contents = league === undefined
        ? <p><em>Loading ...</em></p> :
        <>
            <h2>Welcome to {league?.leagueName}</h2>
            
        </>
    if (league == undefined)
        return (<></>);
    else
        return (
            <DataContext.Provider value={{ id: league?.id, name: league?.leagueName } }>
                {contents}
            </DataContext.Provider>
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

export default Welcome;