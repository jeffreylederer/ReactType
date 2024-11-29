import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';



interface IMembership {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    shortname: string;
    nickName: string;
    wheelchair: boolean;
};


const MembershipDelete = () => {
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
    

    const { register, handleSubmit, formState: { errors } } = useForm<IMembership>()

    const onSubmit: SubmitHandler<IMembership> = (data) => updateData(data)

    const navigate = useNavigate();

    function updateData(data: IMembership) {
        console.log(data);
        navigate("/Membership");

    }


    

    function OnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setMembership({ ...membership, [e.target.name]: e.target.value });
    }

    function OnChecked(e: React.ChangeEvent<HTMLInputElement>) {
        setMembership({ ...membership, [e.target.name]: e.target.checked });
    }

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} >

                <input {...register("id")} type="hidden" value={membership.id} onChange={OnChange} />
                <input {...register("nickName")} type="hidden" value={membership.nickName} onChange={OnChange} />
                <input {...register("fullName")} type="hidden" value={membership.fullName} onChange={OnChange} />
                <Container >
                    <Row>
                        <Col><label>First Name:</label></Col>

                        <Col><input type="text" {...register('firstName', {
                            required: 'First Name is required!',
                            max: {
                                value: 50,
                                message: "Maximum number of characters is 50."
                            }
                        })} value={membership.firstName}
                            onChange={OnChange} style={{ width: '350px' }}
                        />
                            {errors.firstName && <p>{errors.firstName.message}</p>}
                        </Col>
                    </Row>
                    <Row>
                        <Col><label>Last Name:</label></Col>

                        <Col><input type="text" {...register('lastName', {
                            required: 'Last Name is required!',
                            max: {
                                value: 50,
                                message: "Maximum number of characters is 50."
                            }
                        })} value={membership.lastName} style={{ width: '350px' }}
                            onChange={OnChange} />
                            {errors.lastName && <p>{errors.lastName.message}</p>}
                        </Col>
                    </Row>
                    <Row>
                        <Col><label>Short Name:</label></Col>

                        <Col><input type="text" {...register('shortname', {
                            max: {
                                value: 25,
                                message: "Maximum number of characters is 25."
                            }
                        })} value={membership.shortname} style={{ width: '350px' }}
                            onChange={OnChange} />
                            {errors.shortname && <p>{errors.shortname.message}</p>}
                        </Col>
                    </Row>
                    <Row>
                        <Col><label>Wheel Chair:</label></Col>

                        <Col style={{ textAlign: "left" }}>
                            <input type="checkbox" {...register('wheelchair', { required: true })} checked={membership.wheelchair}
                                onChange={OnChecked} /></Col>
                    </Row>
                    <Row>
                        <Col >
                            <input type="submit" />
                        </Col>
                    </Row>
                

                </Container>
            </form>
        </>
    );


    

}



export default MembershipDelete;