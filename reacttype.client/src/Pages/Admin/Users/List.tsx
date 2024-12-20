import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { UpdateFormData } from "./UpdateFormData.tsx";



function Users() {
    const [Users, setUsers] = useState<UpdateFormData[]>();


    useEffect(() => {
        GetData();
    }, []);

    const contents = Users === undefined
        ? <p><em>Loading ...</em></p>

        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Users Name</th>
                    <th>Active</th>
                    <th>Display Name</th>
                    <th>Role</th>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {Users.map(item =>
                    <tr key={item.id.toString()}>
                        <td>{item.username}</td>
                        <td>{item.isActive ? "Yes" : "No"}</td>
                        <td>{item.displayName}</td>
                        <td>{item.role}</td>
                        
                        <td><Link to="/Admin/Users/Update" state={item.id.toString()}>Update</Link>|
                            <Link to="/Admin/Users/Delete" state={item.id.toString()}>Delete</Link>
                        </td>

                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Users</h1>
            <Link to="/Admin/Users/Create">Add</Link>
            {contents}
        </div>
    );

    async function GetData() {
        axios.get("https://localhost:7002/api/Users")
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}

export default Users;