import { BrowserRouter } from 'react-router-dom';
import Menu from "./Menu";
import RouteMenu from "./Routes";
import './App.css';



function App() {
    return (
        <BrowserRouter>
            <RouteMenu />
           
        </BrowserRouter>

    );

}

export default App;