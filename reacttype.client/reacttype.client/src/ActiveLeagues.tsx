import { useEffect, useState } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { leagueType } from "./Pages/leagueObject.tsx";


function ActiveLeagues() {
    const [cookie, setCookie, removeCookie] = useCookies(['league', 'login']);
    const [hideButton, setHideButton] = useState(cookie.league === undefined)
    const theLeague: leagueType = cookie.league;
    const [leagues, setleagues] = useState<leagueType[]>();
    const [message, setMessage] = useState(cookie.league === undefined ? "no league selected" : 'Selected league: ' + theLeague.leagueName);
   


    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        //event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        const idValue:number = +button.name;
        const result = leagues?.filter(function (o) { return o.id == idValue; });
        if (result?.length == 1) {
            const item: leagueType = result[0];

            setCookie("league", item);
            console.log(item);
            setMessage('Selected league: ' + item.leagueName);
            setHideButton(false);
        }
    };

    useEffect(() => {
       
            GetData();

    });

    const contents = leagues === undefined
        ? <p><em>Loading ...</em></p>

        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>League Name</th>
                    <th>Active</th>
                    <th>Team Size</th>
                    <th>Divisions</th>
                    <th>Playoffs</th>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {leagues.map(item =>
                    <tr key={item.id.toString()}>
                        <td>{item.leagueName}</td>
                        <td>{item.teamSize}</td>
                        <td>{item.divisions}</td>
                        <td>{item.playOffs ? "Yes" : "No"}</td>
                        <td><button onClick={buttonHandler} className="button" name={item.id.toString()}>
                            select
                        </button>
                        </td>

                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h3 id="tableLabel">Select League</h3>
            {contents}
            <p style={{ textAlign: 'left'} } >{message}&nbsp;&nbsp;
                <button onClick={Hide} hidden={hideButton}>Unselect</button></p>
        </div>
    );

    function Hide() {
       
        removeCookie("league");
        setMessage("no league selected");
        setHideButton(true);
    }

    
    
    async function GetData() {
        axios.get("https://localhost:7002/api/leagues")
            .then(response => {
                const values = response.data as leagueType[];
                const results = values.filter(x => x.active);
                setleagues(results);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

   
}

export default ActiveLeagues;