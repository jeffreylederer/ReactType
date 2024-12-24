import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";



function Membership() {
    const [membership, setmembership] = useState<UpdateFormData[]>();
  

    useEffect(() => {
        GetData();
    }, []);

    const contents = membership === undefined
        ? <p><em>Loading ...</em></p>
     
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
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
            <h3 id="tableLabel">Membership</h3>
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