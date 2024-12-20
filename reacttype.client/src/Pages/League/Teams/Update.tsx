import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { ConvertLeague, leagueType } from "../../leagueObject.tsx";
import { Membership } from "./Membership.tsx";
import { Label } from "flowbite-react";

const TeamUpdate = () => {

    const league: leagueType = ConvertLeague();
    const [team, setTeam] = useState(
        {
            id: 0,
            leagueid: 0,
            divisionId: 0,
            skip: 0,
            viceSkip: 0,
            lead: 0,
            teamNo: 0
        }
    );

    const [membership, setMembership] = useState<Membership[]>();
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
        
    }, []);

    const contents = team.id === 0
        ? <p><em>Loading ...</em></p> :

        <form onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))} >
            <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={team.id} />
            <input type="hidden" {...register("leagueid", { valueAsNumber: true })} defaultValue={team.leagueid} />
            <input type="hidden" {...register("teamNo", { valueAsNumber: true })} defaultValue={team.teamNo} />

            <Row>
                <Col style={{ width: '15%' }}><Label>Skip:</Label></Col>
                <Col>
                    <select style={{ width: '85%' }} defaultValue={team.skip} {...register("skip")}>
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
                    <select style={{ width: '85%' }} defaultValue={team.viceSkip} {...register("viceSkip")}>
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
                    <select style={{ width: '85%' }} {...register("lead")} defaultValue={team.lead}>
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
                    <select style={{ width: '85%' }} defaultValue={team.lead} {...register("divisionId")}>
                        <option value="0">Select member</option>
                        <option value="1">1</option>
                        <option value="2" hidden={league.divisions > 1}>2</option>
                        <option value="3" hidden={league.divisions > 2}>3</option>
                    </select></Col>
            </Row>

            {
                league.teamSize < 3 && <input type="hidden" defaultValue="0" {...register("viceSkip")} />
            }
            {
                league.teamSize < 2 && <input type="hidden" defaultValue="0" {...register("lead")} />
            }

            
           
            <Container >
                
                



            </Container>
        </form>
    
    return (
        <>
            <h3>Update Team for league {league.leagueName}</h3>
            {contents}

            
        </>
    );


    async function GetData() {
        const url: string = 'https://localhost:7002/api/Teams/getOne/';
        const num: string = id.toString();
        const fullUrl = url.concat(num);
        axios.get(fullUrl)
            .then(response => {

                setTeam(response.data);
               
               
                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    async function GetMembers() {
        const url: string = "https://localhost:7002/api/Teams/NotOnTeam/".concat(league.id.toString());
        axios.get(url)
            .then(response => {
                setMembership(response.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            })
    }

    function updateData(data: UpdateFormData) {
        const url: string = 'https://localhost:7002/api/Teams/'.concat(id.toString());
          axios.put(url, data)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                navigate("/League/Teams");
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });
    }
}



export default TeamUpdate;