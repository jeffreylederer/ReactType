import { DataContextType, DataContext } from "../../../DataContext.tsx";
import { useContext, useState } from "react";

function Players() {
    const [leagueinfo] = useState<DataContextType>(useContext(DataContext));

    return (
        <>
            id={leagueinfo.id}, name = {leagueinfo.name }
        </>
    )
    

}
export default Players