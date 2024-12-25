import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { FormData, FormDataSchema } from "./FormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput, Select } from "flowbite-react";

const UserCreate = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
    });

    const onSubmit: SubmitHandler<FormData> = (data) => CreateData(data)

    const navigate = useNavigate();

    function CreateData(data: FormData) {
        axios.post('https://localhost:7002/api/Users', data)
            .then((response) => {
                console.log(response.data);
                navigate("/Admin/Users");
                console.log('Record created successfully: ', response.data);
            })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }

    return (
        <>
        <h3>Add new user</h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                 <table>
                    <tr>
                        <td className="Label">User Name:</td>

                        <td className="Field"><TextInput {...register('username')}   />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Password:</td>

                        <td className="Field"><TextInput type="password" {...register('password')}   />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Active:</td>

                        <td className="Field">
                            <Checkbox {...register('isActive')}  />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Display Name:</td>

                        <td className="Field"><TextInput {...register('displayName')}   />
                        </td>
                    </tr>

                    <tr>
                        <td className="Label">Role:</td>

                        <td className="Field">
                            <Select   {...register('roleId')} defaultValue="1" name='roleId'>
                                <option value="1">Observer</option>
                                <option value="2">Scorer</option>
                                <option value="3">Admin</option>
                                <option value="4">SiteAdmin</option>
                            </Select>
                        </td>
                    </tr>

                    <tr>
                        <td colSpan={1}  style={{ textAlign: "center" }}>
                            <TextInput type="submit" />
                            <button onClick={() => navigate(-1)}>Go back to list</button>
                        </td>
                    </tr>
                   

                    <tr><td colSpan={1}>
                    {errors.username && <p className="errorMessage">{errors.username.message}</p>}
                    {errors.displayName && <p className="errorMessage">{errors.displayName.message}</p>}
                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                    {errors.roleId && <p className="errorMessage">{errors.roleId.message}</p>}
                    </td></tr>



                </table>
            </form>

        </>
    );




}



export default UserCreate;