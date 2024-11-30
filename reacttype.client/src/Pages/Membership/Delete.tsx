import { useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const MembershipDelete = () => {
    const location = useLocation();
    const id: number = location.state;

   

    const [membership, setMembership] = useState(
        {
            id: 0,
            firstName: '',
            lastName: '',
            fullName: '',
            shortname: '',
            nickName: '',
            wheelchair: false
        }
    );

    useEffect(() => {
        GetData();
    }, []);

    const contents = membership === undefined
        ? <p><em>Loading ...</em></p> :
        <div>
            <Row>
                <Col><label>First Name:</label></Col>

                <Col>{membership.firstName }</Col>
            </Row>
            <Row>
                <Col><label>Last Name:</label></Col>
                <Col>{membership.lastName}</Col>
              
            </Row>
            <Row>
                <Col><label>Short Name:</label></Col>
                <Col>{membership.shortname}</Col>
              </Row>
            <Row>
                <Col><label>Wheel Chair:</label></Col>
                <Col>{membership.wheelchair?"Yes":"No"}</Col>
            </Row>
            <Row>
                <Col >
                    <input type="submit" onClick={DeleteItem }>Delete Record</input>
                </Col>
            </Row>
        </div>

    return (
        <>
        <h1>Delete</h1>
            {contents}
        </>
    );

    async function GetData() {
        const url: string = 'https://localhost:7002/api/Memberships/Details/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {
               setMembership(response.data);
            })
            .catch(error => {
                console.error('Error updating product: ', error);
            });
    }

    async function DeleteItem() {
        const url: string = 'https://localhost:7002/api/Memberships/Delete/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.delete(fullUrl)
            .then(response => {
                console.log(response.statusText);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }
}


export default MembershipDelete;