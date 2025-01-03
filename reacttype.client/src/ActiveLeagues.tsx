import { useEffect, useState } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { leagueType } from "./Pages/leagueObject.tsx";


function ActiveLeagues() {
    const [league, setleague] = useState<leagueType[]>();
    const [message, setMessage] = useState(league === undefined ? "no league selected" : 'league ${league.leagueName} selected');
    const [cookie, setCookie, removeCookie] = useCookies(['league','login']);
    const [buttonHidden, setbuttonHidden] = useState(cookie.league !== undefined);

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        //event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        const idValue:number = +button.name;
        const result = league?.filter(function (o) { return o.id == idValue; });
        if (result?.length == 1) {
            const item: leagueType = result[0];
            setCookie("league", item);
            console.log(item);
            setMessage('Selected league: ' + item.leagueName);
            setbuttonHidden(false);
        }
    };

    useEffect(() => {
       
            GetData();

    });

    const contents = league === undefined
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
                {league.map(item =>
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
            <p style={{ textAlign: 'left'} } >{message}</p>
            <p><button onClick={Hide} hidden={buttonHidden}>Unselect</button></p>
        </div>
    );

    function Hide() {
        if (cookie.league !== undefined) {
            removeCookie("league");
            setMessage("no league selected");
            setbuttonHidden(true);
        }
    }

    
    
    async function GetData() {
        axios.get("https://localhost:7002/api/leagues")
            .then(response => {
                const values = response.data as leagueType[];
                const results = values.filter(x => x.active);
                setleague(results);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

   
}

export default ActiveLeagues;