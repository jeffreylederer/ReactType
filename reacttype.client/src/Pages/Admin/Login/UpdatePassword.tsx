import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateForm.tsx"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextInput } from "flowbite-react";
import { UserType } from "../../leagueObject.tsx";




const UpdatePassword = () => {

    const [users] = useState<UserType>(JSON.parse(localStorage.getItem("login") as string));
        
   
    

    const {
        register,
        handleSubmit,
        formState: { errors },

    } = useForm<UpdateFormData>({
        resolver: zodResolver(UpdateFormDataSchema),

    });

    const onSubmit: SubmitHandler<UpdateFormData> = (data) => updateData(data)

    const navigate = useNavigate();




    

    const contents = 

        <form onSubmit={handleSubmit(onSubmit)} >

            <table>

                <input type="hidden" {...register("id", { valueAsNumber: true })} defaultValue={users.id} />
                <tr>
                    <td className="Label">User Name:</td>

                    <td className="Field"><TextInput defaultValue={users.username} disabled />
                    </td>
                </tr>

                <tr>
                    <td className="Label">Password:</td>

                    <td className="Field">
                        <TextInput type="password" {...register('password')} defaultValue="" />
                    </td>
                </tr>

               

                <tr>
                    <td colSpan={1} style={{ textAlign: "center" }}>
                        <Button type="submit" color="gray">Submit</Button>
                        <button onClick={() => navigate(-1)}>Go back to list</button>
                    </td>
                </tr>
                <tr><td colSpan={1}>


                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}

                </td></tr>

            </table>
        </form>

    return (
        <>
            <h3>Update user password</h3>
            {contents}


        </>
    );


    

    function updateData(data: UpdateFormData) {
        const login: UserType = JSON.parse(localStorage.getItem("login") as string);
        const url: string = import.meta.env.VITE_SERVER_URL+'api/Admin/'.concat(login.id.toString());
        axios.put(url, data)
            .then(response => {
                console.log('Record updated successfully ', response.data);
                navigate(-1);
            })
            .catch(error => {
                console.log('Error updating record: ', error);
            });
    }


}



export default UpdatePassword;