import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import "./FormData.css";
import { PlayerFormData, PlayerFormDataSchema } from "./FormData.tsx";
import { UpdateFormData } from "../../Membership/UpdateFormData.tsx";
import { useCookies } from 'react-cookie';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Label, TextInput } from "flowbite-react";

const PlayersCreate = () => {
   
    
    const onSubmit: SubmitHandler<PlayerFormData> = (data) => CreateData(data)
    const cookies = useCookies(['id'])[0];   
    const navigate = useNavigate();
    const [membership, setmembership] = useState<UpdateFormData[]>();

    function CreateData(data: PlayerFormData) {
        axios.post('https://localhost:7002/api/Players/', data)
            .then((response) => {
                console.log(response.data);
                navigate("/League/Players");
                console.log('Record created successfully: ', response.data);
             })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }

    async function GetData() {
        const url: string = "https://localhost:7002/api/players/getMembers/".concat(cookies.id);
        axios.get(url)
            .then(response => {
                setmembership(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    useEffect(() => {
        GetData();
    }, []);
  
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PlayerFormData>({
        resolver: zodResolver(PlayerFormDataSchema),
    });

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} >
                <Container>
                    <input type="hidden" {...register("leagueid")} defaultValue={cookies.id }/>
                    <Row>
                        <Col style={{ width: '15%' }}><Label>Members:</Label></Col>

                        <Col>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("membershipId")}>
                                <option value="0">Select member</option>
                                {membership?.map((item) => (
                                    <option value={item.id.toString()}>{item.fullName}</option>
                                ))}
                                )
                            </select>
                        </Col>
                    </Row>
                
                
                    <Row>
                        <Col style={{ textAlign: "center", width: '100%' }}>
                            <TextInput type="submit" />
                        </Col>
                    </Row>
                    {errors.membershipId && <p className="errorMessage">{errors.membershipId.message}</p>}
                    
                    
                    

                </Container>
            </form>
            
        </>
    );


    

}



export default PlayersCreate;