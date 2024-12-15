

import { BrowserRouter } from 'react-router-dom';
import Menu from "./Menu";
import RouteMenu from "./Routes"
import "./App.css"
import { useContext } from 'react';
import { DataContext}  from "./DataContext.tsx";


function App() {
    useContext(DataContext);
    return (
        <BrowserRouter>
            <Menu />
            <RouteMenu />
           
        </BrowserRouter>

    );

}

export default App;