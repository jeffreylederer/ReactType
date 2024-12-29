import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import axios from "axios";
import { FormData, FormDataSchema } from "./FormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, TextInput } from "flowbite-react";


const MembershipCreate = () => {
   
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
        axios.post('https://localhost:7002/api/Memberships', data)
            .then((response) => {
                console.log(response.data);
                navigate("/Membership");
                console.log('Record created successfully: ', response.data);
             })
            .catch(error => {
                console.log('Error creating record: ', error);
            });
    }

    

    
  

    return (
        <>

            <form onSubmit={handleSubmit(onSubmit)} >


                
                <TextInput {...register("nickName")} type="hidden"   />
                <TextInput {...register("fullName")} type="hidden"   />
                <table>
                    <tr>
                        <td className="Label">First Name:</td>

                        <td className="Field"><TextInput {...register('firstName')}  />
                        </td>
                         </tr>
                    <tr>
                        <td className="Label">Last Name:</td>

                        <td className="Field"><TextInput  {...register('lastName')}  />
                        </td>
                    </tr>
                    <tr>
                        <td className="Label">Short Name:</td>
                        <td className="Field"><TextInput {...register('shortname')}  />
                        </td>
                    </tr>
                    <tr>
                        <td className="Label">Wheel Chair:</td>

                        <td className="Field">
                            <Checkbox {...register('wheelchair')}  />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={1}  style={{ textAlign: "center" }}>
                            <TextInput type="submit" />
                            <button onClick={() => navigate(-1)}>Go back to list</button>
                        </td>
                    </tr>
                    <tr><td colSpan={1}>
                    {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                    {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                    {errors.shortname && <p className="errorMessage">{errors.shortname.message}</p>}
                    </td>
                    </tr>
                    

                </table>
            </form>
            
        </>
    );


    

}



export default MembershipCreate;