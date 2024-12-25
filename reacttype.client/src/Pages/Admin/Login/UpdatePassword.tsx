import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { UpdateFormData, UpdateFormDataSchema } from "./UpdateForm.tsx"
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextInput } from "flowbite-react";





const UpdatePassword = () => {

    const [users, setUsers] = useState(
        {
            id: 0,
            username: ''
            
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
     }, []);

    const contents = users.id === 0
        ? <p><em>Loading ...</em></p> :

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
            <h3>Update user paawword</h3>
            {contents}


        </>
    );


    async function GetData() {
        const url: string = 'https://localhost:7002/api/Admin/'.concat(id.toString());
        axios.get(url)
            .then(response => {

                setUsers(response.data);


                console.log('Record aquired successfully: ', response.data);
            })
            .catch(error => {
                console.error('Error aquiring record: ', error);
            });

    }

    function updateData(data: UpdateFormData) {
        const url: string = 'https://localhost:7002/api/Admin/'.concat(id.toString());
        axios.put(url, data)
            .then(response => {
                console.log('Record updated successfully: ', response.data);
                navigate("/");
            })
            .catch(error => {
                console.error('Error updating record: ', error);
            });
    }


}



export default UpdatePassword;