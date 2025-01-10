import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";
import { LeagueType } from "../../leagueObject.tsx";
import { useCookies } from 'react-cookie';
import { UserTypeDetail } from '../../Admin/Login/UserTypeDetail.tsx';



function Schedule() {
    const [schedule, setschedule] = useState<UpdateFormData[]>();
    const league: LeagueType = JSON.parse(localStorage.getItem("league") as string);
    const cookie = useCookies(['login'])[0];
    const user: UserTypeDetail = cookie.login;
    const permission: string = user.role;
    const allowed: boolean = (permission == "SiteAdmin" || permission == "Admin") ? false : true;

    useEffect(() => {
        GetData();
    });

    const contents = schedule === undefined
        ? <p><em>Loading ...</em></p>
     
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Game Date</th>
                    <th>Cancelled</th>
                    <th>Playoffs</th>
                    <td hidden={allowed}></td>
                </tr>
            </thead>
            <tbody>
                {schedule.map(item =>
                    <tr key={item.id}>
                        <td>{item.gameDate}</td>
                        <td>{item.cancelled ? "yes" : "no"}</td>
                        <td>{item.playOffs ? "yes" : "no"}</td>
                        <td hidden={allowed}><Link to="/League/Schedule/Update" state={ item.id.toString() }>Update</Link>|  
                            <Link to="/League/Schedule/Delete" state={ item.id.toString() }>Delete</Link>
                        </td>
                        
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h2 id="tableLabel">Schedule for League {league.leagueName}</h2>
            <Link to="/League/Schedule/Create" hidden={allowed}>Add</Link>
            {contents}
        </div>
    );

    async function GetData() {
        const url: string = "https://localhost:7002/api/Schedules/".concat(league.id.toString());
        axios.get(url)
            .then(response => {
                setschedule(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Schedule;