import { useEffect, useState } from 'react';
import axios from "axios";
import { UpdateFormData } from "./Pages/Admin/League/UpdateFormData.tsx";
import { useCookies } from 'react-cookie';


function ActiveLeagues() {
    const [league, setleague] = useState<UpdateFormData[]>();
    const setCookie = useCookies(['id', 'name'])[1];
    const cookie = useCookies(['id', 'name'])[0];
    const removeCookie = useCookies(['id', 'name'])[2];
    type HideType = () => boolean;


    

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const button: HTMLButtonElement = event.currentTarget;
        setCookie("id", button.name);
        const idValue:number = +button.name;
        const result = league?.filter(function (o) { return o.id == idValue; });
        if (result?.length == 1) {
            const item: UpdateFormData = result[0];
            setCookie("name", item.leagueName);
        }
        console.log(result);
        
    
    };

    useEffect(() => {
        GetData();
    }, []);

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
            <h1 id="tableLabel">Select League</h1>
            {contents}
            <p>Selected league is {cookie.name===undefined? "not selected": cookie.name}</p>
            <p><button onClick={Hide}>Unselect</button></p>
        </div>
    );

    function Hide() {
        if (cookie.name !== undefined) {
            removeCookie("id");
            removeCookie("name");
        }
    }

    
    async function GetData() {
        axios.get("https://localhost:7002/api/leagues")
            .then(response => {
                const values = response.data as UpdateFormData[];
                const results = values.filter(x => x.active);
                setleague(results);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }


    

}

export default ActiveLeagues;