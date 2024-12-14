import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, Label, TextInput } from "flowbite-react";




const MembershipUpdate = () => {
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
    const location = useLocation();
    const id: number = location.state;

    const {
        register,
        handleSubmit,
        formState: { errors },
        
    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),
       
    });

    const onSubmit: SubmitHandler<UpdateFormData> = (data) =>updateData(data)

    const navigate = useNavigate();
    
    
    

    useEffect(() => {
        GetData();
        setMembership({ ...membership, [id]: id});
    }, []);

    const contents = membership.id === 0
        ? <p><em>Loading ...</em></p> :

        <form onSubmit={handleSubmit(onSubmit)} >



            <input type="hidden" {...register("id", { valueAsNumber: true })} value={membership.id} />
            <TextInput {...register("nickName")} type="hidden" />
            <TextInput {...register("fullName")} type="hidden" />
            <Container >
                <Row>
                    <Col style={{ width: '15%' }}><Label>First Name:</Label></Col>

                    <Col><TextInput type="text" {...register('firstName')} style={{ width: '85%' }} defaultValue={membership.firstName}  />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ width: '15%' }}><Label>Last Name:</Label></Col>

                    <Col><TextInput  {...register('lastName')} style={{ width: '85%' }} defaultValue={membership.lastName} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ width: '15%' }}><Label>Short Name:</Label></Col>
                    <Col><TextInput {...register('shortname')} style={{ width: '85%' }} defaultValue={membership.shortname} />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ width: '15%' }}><Label>Wheel Chair:</Label></Col>

                    <Col style={{ textAlign: "left", width: '85%' }}>
                        <Checkbox {...register('wheelchair')}

                            defaultChecked={membership.wheelchair}
                             />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ textAlign: "center", width: '100%' }}>
                        <TextInput type="submit" />
                    </Col>
                </Row>
                {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                {errors.shortname && <p className="errorMessage">{errors.shortname.message}</p>}
                {errors.id && <p className="errorMessage">{errors.id.message}</p>}



            </Container>
        </form>
    
    return (
        <>
        <h1>Update record</h1>
            {contents}

            
        </>
    );


    async function GetData() {
        const url: string = 'https://localhost:7002/api/Memberships/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {

                setMembership(response.data);
               
               
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    function updateData(data: UpdateFormData) {
        const url: string = 'https://localhost:7002/api/Memberships/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        data.id = id;
          axios.put(fullUrl, data)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                navigate("/Membership");
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });


    }
}



export default MembershipUpdate;