import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, Label, TextInput, Select } from "flowbite-react";





const UsersUpdate = () => {

    const [users, setUsers] = useState(
        {
            id: 0,
            roleId:1,
            username: '',
            password: '',
            displayName: '',
            isActive: false,
            lastLoggedIn: null,
            serialNumber: '',
            role: ''
           
        }
    );
    const location = useLocation();
    const id: number = location.state;

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),

    });

    const onSubmit: SubmitHandler<UpdateFormData> = (data) => updateData(data)

    const navigate = useNavigate();




    useEffect(() => {
        GetData();
        setUsers({ ...users, [id]: id });
    }, []);

    const contents = users.id === 0
        ? <p><em>Loading ...</em></p> :

        <form onSubmit={handleSubmit(onSubmit)} >

        <Container>

                <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={users.id} />
                <input type="hidden" {...register("lastLoggedIn")} defaultValue={users.lastLoggedIn == null ? '' : users.lastLoggedIn } />
                <input type="hidden" {...register("serialNumber")} defaultValue={users.serialNumber} />
                <input type="hidden" {...register("role")} defaultValue={users.role} />
            <Row>
                <Col style={{ width: '15%' }}><Label>User Name:</Label></Col>

                    <Col><TextInput {...register('username')} style={{ width: '85%' }} defaultValue={users.username} disabled />
                </Col>
            </Row>

            <Row>
                <Col style={{ width: '25%' }}><Label>Active:</Label></Col>

                <Col style={{ textAlign: "left", width: '75%' }}>
                        <Checkbox {...register('isActive')} defaultChecked={users.isActive} />
                </Col>
            </Row>

            <Row>
                    <Col style={{ width: '15%' }}><Label>Display Name:</Label></Col>

                    <Col><TextInput {...register('displayName')} style={{ width: '85%' }} defaultValue={users.displayName} />
                </Col>
            </Row>

                <Row>
                    <Col style={{ width: '15%' }}><Label>Role:</Label></Col>

                    <Col>
                        <Select style={{ width: '85%' }}  {...register('roleId')} defaultValue={users.roleId }>
                            
                            <option value="1">Observer</option>
                            <option value="2">Scorer</option>
                            <option value="3">Admin</option>
                            <option value="4">SiteAdmin</option>
                           
                        </Select>
                       
                    </Col>
                </Row>
            

            <Row>
                <Col style={{ textAlign: "center", width: '100%' }}>
                    <TextInput type="submit" />
                </Col>
            </Row>



                {errors.displayName && <p className="errorMessage">{errors.displayName.message}</p>}



            </Container>
        </form>

    return (
        <>
            <h1>Update record</h1>
            {contents}


        </>
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

    function updateData(data: UpdateFormData) {
        const url: string = 'https://localhost:7002/api/Users/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        data.id = id;
        axios.put(fullUrl, data)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                navigate("/Users");
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });
    }

    
}



export default UsersUpdate;