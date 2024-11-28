import { useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';

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
                        <td><Link to="/Membership/Update" state={ item.id }>Update</Link>
                        </td>
                        
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Membership</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function GetData() {
        fetch('https://localhost:7002/api/Membership/Get')
            .then(async response => {
                const data = await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response statusText
                    const error = (data && data.message) || response.statusText;
                    return Promise.reject(error);
                }

                setmembership(data);
            })
            .catch(errormsg => {
                 console.log('There was an error!', errormsg.toString());
            });
    }
}

export default Membership;