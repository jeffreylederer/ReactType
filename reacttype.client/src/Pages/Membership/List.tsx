import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

interface IMebership {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    shortname: string;
    nickName: string;
    wheelchair: boolean;
}

function Membership() {
    const [membership, setmembership] = useState<IMebership[]>();
  

    useEffect(() => {
        GetData();
    }, []);

    const contents = membership === undefined
        ? <p><em>Loading ...</em></p>
     
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Short Name</th>
                    <th>Nick Name</th>
                    <th>Wheelchair</th>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {membership.map(item =>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.fullName}</td>
                        <td>{item.shortname}</td>
                        <td>{item.nickName}</td>
                        <td>{item.wheelchair ? "yes" : "no"}</td>
                        <td><Link to="/Membership/Update" state={ item.id.toString() }>Update</Link>|  
                            <Link to="/Membership/Delete" state={ item.id.toString() }>Delete</Link>
                        </td>
                        
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Membership</h1>
            <Link to="/Membership/Create">Add</Link>
            {contents}
        </div>
    );

    async function GetData() {
        axios.get("https://localhost:7002/api/memberships")
            .then(response => {
                setmembership(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Membership;