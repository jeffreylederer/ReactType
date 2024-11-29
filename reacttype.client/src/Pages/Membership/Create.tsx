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
                <Container fluid>
                    <Row>
                        <Col><label>First Name:</label></Col>

                        <Col><input type="text" {...register('firstName', { required: true, maxLength: 50 })} value={membership.firstName}
                            onChange={OnChange} />
                            {errors.firstName.type === 'required' ?
                                'This field is required.' :
                                'Maximum length is 50 character'
                        }
                        </Col>
                    </Row>
                    <Row>
                        <Col><label>Last Name:</label></Col>

                        <Col><input type="text" {...register('lastName', { required: "Last Name is required", maxLength: 50 })} value={membership.lastName}
                            onChange={OnChange} /></Col>
                    </Row>
                    <Row>
                        <Col><label>Short Name:</label></Col>

                        <Col><input type="text" {...register('shortname', { required: false, maxLength: 25 })} value={membership.shortname}
                            onChange={OnChange} /></Col>
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