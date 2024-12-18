import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";
import { useCookies } from 'react-cookie';


function Schedule() {
    const [schedule, setschedule] = useState<UpdateFormData[]>();
    const cookies = useCookies(['id', 'name'])[0];

    useEffect(() => {
        GetData();
    }, []);

    const contents = schedule === undefined
        ? <p><em>Loading ...</em></p>
     
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Game Date</th>
                    <th>Cancelled</th>
                    <th>Playoffs</th>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {schedule.map(item =>
                    <tr key={item.id}>
                        <td>{item.gameDate.toDateString()}</td>
                        <td>{item.cancelled ? "yes" : "no"}</td>
                        <td>{item.playOffs ? "yes" : "no"}</td>
                        <td><Link to="/Schedule/Update" state={ item.id.toString() }>Update</Link>|  
                            <Link to="/Schedule/Delete" state={ item.id.toString() }>Delete</Link>
                        </td>
                        
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Schedule</h1>
            <Link to="/Schedule/Create">Add</Link>
            {contents}
        </div>
    );

    async function GetData() {
        const url: string = "https://localhost:7002/api/Schedules/".concat(cookies.id);
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