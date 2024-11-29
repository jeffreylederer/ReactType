import { useLocation, useNavigate } from "react-router-dom";



const MembershipDelete = () => {
    const location = useLocation();
    const id: string = location.state;

    return (
        <>
            <h1>Delete</h1>
        </>
    );
}


export default MembershipDelete;