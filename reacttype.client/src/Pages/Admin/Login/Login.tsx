import { FormData, FormDataSchema } from "./FormData.tsx";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { TextInput, Button } from "flowbite-react";
import axios from "axios";
import { UserTypeDetail } from "./UserTypeDetail";
function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(FormDataSchema),
    });
    const [cookie, setCookie] = useCookies(['login']);
    const navigate = useNavigate();

    useEffect(() => {
        if (cookie.login !== undefined) {
            navigate("/");
        }
    }, [cookie.login, navigate]);

    const onSubmit: SubmitHandler<FormData> = (data) => LoginData(data)
    const [errorMsg, setErrorMsg] = useState('');

   

    function LoginData(data: FormData) {
        axios.post('https://localhost:7002/api/Admin', data)
            .then((response) => {
                if (response.data == null) {
                    setErrorMsg("Login not successful");
                 }
                else {
                    const data: UserTypeDetail = response.data;
                    setCookie('login', data);
                    
                    navigate("/");
                }
            })
            .catch(error => {
                setErrorMsg("Login not successful, ".concat(error));
            });
    }


    return (
        <>

            <h3>Please login to applcaton</h3>
            <form onSubmit={handleSubmit(onSubmit)} >
                <table>
                    <tbody>
                        <tr>
                            <td className="Label">User Name:</td>
                            <td className="Field"><TextInput {...register('username')} /></td>
                        </tr>

                        <tr>
                            <td className="Label">Password:</td>
                            <td className="Field"><TextInput type="password" {...register('password')} /></td>
                        </tr>

                        <tr>
                            <td colSpan={1} style={{ textAlign: "center" }}>
                                <Button type="submit" color="gray">Submit</Button>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={1}>
                                {errors.username && <p className="errorMessage">{errors.username.message}</p>}
                                {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                                <p className='errorMessage'>{errorMsg}</p>
                            </td>
                            </tr>
                    </tbody>
                </table>
            </form>
        </>
    );


}

export default Login;