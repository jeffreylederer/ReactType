import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateFormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput } from "flowbite-react";
import { ConvertLeague, leagueType } from "../leagueObject.tsx";

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
    const league: leagueType = ConvertLeague();
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
    });

    const contents = membership.id === 0
        ? <p><em>Loading ...</em></p> :

        <form onSubmit={handleSubmit(onSubmit)} >



            <input type="hidden" {...register("id", { valueAsNumber: true })} value={membership.id} />
            <TextInput {...register("nickName")} type="hidden" />
            <TextInput {...register("fullName")} type="hidden" />
            <table>
                <tr>
                    <td className="Label">First Name:</td>

                    <td className="Field"><TextInput type="text" {...register('firstName')} style={{ width: '85%' }} defaultValue={membership.firstName}  />
                    </td>
                </tr>
                <tr>
                    <td className="Label">Last Name:</td>

                    <td className="Field"><TextInput  {...register('lastName')} style={{ width: '85%' }} defaultValue={membership.lastName} />
                    </td>
                </tr>
                <tr>
                    <td className="Label">Short Name:</td>
                    <td className="Field"><TextInput {...register('shortname')} style={{ width: '85%' }} defaultValue={membership.shortname} />
                    </td>
                </tr>
                <tr>
                    <td className="Label">Wheel Chair:</td>

                    <td className="Field">
                        <Checkbox {...register('wheelchair')}  defaultChecked={membership.wheelchair}/>
                    </td>
                </tr>
                <tr className="center-td">
                    <td colSpan={1} >
                        <TextInput type="submit" />  <button onClick={() => navigate(-1)}>Back to list</button>
                    </td>
                </tr>
                <tr><td colSpan={1}>
                {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                {errors.shortname && <p className="errorMessage">{errors.shortname.message}</p>}
                {errors.id && <p className="errorMessage">{errors.id.message}</p>}
                </td></tr>


            </table>
        </form>
    
    return (
        <>
            <h3>Update record for league {league.leagueName}</h3>
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