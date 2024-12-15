import { createContext } from "react"

export type DataContextType = {
    id: number|undefined,
    name: string | undefined
};

export const DataContext = createContext<DataContextType>({id:0, name:''});
