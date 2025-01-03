import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import { DetailsType } from "./DetailsType.tsx";




const UsersDelete = () => {
    const location = useLocation();
    const id: number = location.state;

    const [Users, setUsers] = useState<DetailsType>();


    const navigate = useNavigate();

    useEffect(() => {
        GetData();
    });

    const contents = Users === undefined
        ? <p><em>Loading ...</em></p> :

        <table>
            <tr>
                <td className="Label">Users Name:</td>

                <td className="Field">{Users.userName}</td>
            </tr>
            <tr>
                <td className="Label">Active:</td>
                <td className="Field">{Users.isActive ? "Yes" : "No"}</td>

            </tr>
            <tr>
                <td className="Label">Display Name:</td>
                <td className="Field">{Users.displayName}</td>
            </tr>

            <tr>
                <td className="Label">Role:</td>
                <td className="Field">{Users.role}</td>
            </tr>

            <tr>
                <td colSpan={1} style={{ textAlign: "center" }}>
                    <input type='button' onClick={DeleteItem} value="Delete Record" />
                    <button onClick={() => navigate(-1)}>Go back to list</button>
                </td>
            </tr>
        </table>

    return (
        <div>
            <h3>Delete user</h3>
            {contents}
        </div>
    );

    async function GetData() {
        const url: string = 'https://localhost:7002/api/Users/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {
                setUsers(response.data);
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    async function DeleteItem() {
        const url: string = 'https://localhost:7002/api/Users/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.delete(fullUrl)
            .then(response => {
                console.log(response.statusText);
                navigate("/Admin/Users");
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}


export default UsersDelete;