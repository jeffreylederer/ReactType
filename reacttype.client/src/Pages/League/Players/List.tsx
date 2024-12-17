import { useCookies } from 'react-cookie';

function Players() {
    const cookies = useCookies(['id', 'name'])[0];
    
    return (
        <>
            id={cookies.id}, name={cookies.name}
        </>
    )
    

}
export default Players