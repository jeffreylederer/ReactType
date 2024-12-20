import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";
import { ConvertLeague, leagueType } from "../../leagueObject.tsx";

function Players() {
    const [player, setplayer] = useState<UpdateFormData[]>();
    const league: leagueType = ConvertLeague();

    useEffect(() => {
        GetData();
    }, []);

    const contents = player === undefined
        ? <p><em>Loading ...</em></p>

        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Name</th>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {player.map(item =>
                    <tr key={item.id}>
                        <td>{item.fullName}</td>
                       
                        <td><Link to="/league/players/Delete" state={item.id.toString()}>Delete</Link>
                        </td>

                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h2 id="tableLabel">Players in league {league.leagueName}</h2>
            <Link to="/League/Players/Create">Add</Link>
            {contents}
            <p>Number of players: {player?.length}</p>
        </div>
    );

    async function GetData() {
       

        const url: string = "https://localhost:7002/api/players/".concat(league.id.toString());
        axios.get(url)
            .then(response => {
                setplayer(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Players;