import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import "./FormData.css";
import { FormData, FormDataSchema } from "./FormData.tsx";
import { Membership } from "./Membership.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Label, TextInput } from "flowbite-react";
import { ConvertLeague, leagueType } from "../../leagueObject.tsx";

const TeamsCreate = () => {
   
    
    const onSubmit: SubmitHandler<FormData> = (data) => CreateData(data)
    const league: leagueType = ConvertLeague();

    const navigate = useNavigate();
    const [membership, setMembership] = useState<Membership[]>();

    function CreateData(data: FormData) {
        //const str:string = JSON.stringify(data);
        axios.post('https://localhost:7002/api/Teams/', data)
            .then((response) => {
                console.log(response.data);
                navigate("/League/Teams");
                console.log('Record created successfully: ', response.data);
             })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }

    async function GetData() {
        const url: string = "https://localhost:7002/api/Teams/NotOnTeam/".concat(league.id.toString());
        axios.get(url)
            .then(response => {
                setMembership(response.data);
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
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
    });

    return (
        <>
            <h2>Create new Team in league {league.leagueName} </h2>
            <form onSubmit={handleSubmit(onSubmit)} >
                <Container>
                    <input type="hidden" {...register("leagueid")} defaultValue={league.id} />
                    <input type="hidden" {...register("teamNo")} defaultValue={"1"} />
                    <input type="hidden" {...register("id")} defaultValue={"0"} />
                    <Row>
                        <Col style={{ width: '15%' }}><Label>Skip:</Label></Col>
                        <Col>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("skip")}>
                                <option value="0">Select member</option>
                                {membership?.map((item) => (
                                    <option value={item.id.toString()}>{item.fullName}</option>
                                ))}
                                )
                            </select></Col>
                    </Row>

                    <Row hidden={league.teamSize < 3}>
                        <Col style={{ width: '15%' }}><Label>Vice Skip:</Label></Col>
                        <Col>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("viceSkip")}>
                                <option value="0">Select member</option>
                                {membership?.map((item) => (
                                    <option value={item.id.toString()}>{item.fullName}</option>
                                ))}
                                )
                            </select></Col>
                    </Row> 

                    <Row hidden={league.teamSize < 2}>
                        <Col style={{ width: '15%' }}><Label>Lead:</Label></Col>
                        <Col>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("lead")}>
                                <option value="0">Select Division</option>
                                {membership?.map((item) => (
                                    <option value={item.id.toString()}>{item.fullName}</option>
                                ))}
                                )
                            </select></Col>
                    </Row>
                    <Row>
                        <Col style={{ width: '15%' }}><Label>Division:</Label></Col>
                        <Col>
                            <select style={{ width: '85%' }} defaultValue="0" {...register("divisionId")}>
                                <option value="0">Select member</option>
                                <option value="1">1</option>
                                <option value="2" hidden={league.divisions>1 }>2</option>
                                <option value="3" hidden={league.divisions > 2}>3</option>
                            </select></Col>
                    </Row>
                
                
                    <Row>
                        <Col style={{ textAlign: "center", width: '100%' }}>
                            <TextInput type="submit" />
                        </Col>
                    </Row>
                    {errors.skip && <p className="errorMessage">{errors.skip.message}</p>}
                    {errors.viceSkip && <p className="errorMessage">{errors.viceSkip.message}</p>}
                    {errors.lead && <p className="errorMessage">{errors.lead.message}</p>}
                  
                    {
                        league.teamSize < 3 && <input type="hidden" defaultValue="0" {...register("viceSkip")} />
                    }
                    {
                        league.teamSize < 2 && <input type="hidden" defaultValue="0" {...register("lead")} />
                    }
                    
                    

                </Container>
            </form>
            
        </>
    );


    

}



export default TeamsCreate;