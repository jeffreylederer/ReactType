import {
    Routes,
    Route
} from "react-router-dom";


import Membership from "./Pages/Membership/List.tsx";
import MembershipDelete from "./Pages/Membership/Delete.tsx";
import MembershipUpdate from "./Pages/Membership/Update.tsx";

//import About from "./about.jsx";
//import Contact from "./contact.jsx";
//import Users from "./pages/admin/users/index.jsx";
//import Leagues from "./pages/admin/leagues/index.jsx";
//import ErrorLog from "./pages/admin/errorLog.jsx";
import Home from './Pages/Home.tsx'; 

function RouteMenu() {
  return (
      <Routes>
          <Route
              path="/"
              element={<Home />}
          />
          <Route  path="/Membership" element={<Membership />} />
          <Route path="/Membership/Delete" element={<MembershipDelete />} />
          <Route path="/Membership/Update" element={<MembershipUpdate />} />

          {/*<Route*/}
          {/*    exact*/}
          {/*    path="/admin/users"*/}
          {/*    element={<Users />}*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    exact*/}
          {/*    path="/admin/leagues"*/}
          {/*    element={<Leagues />}*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    exact*/}
          {/*    path="/admin/errorLog"*/}
          {/*    element={<ErrorLog />}*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    exact*/}
          {/*    path="/about"*/}
          {/*    element={<About />}*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    exact*/}
          {/*    path="/contact"*/}
          {/*    element={<Contact />}*/}
          {/*/>*/}
          {/*<Route*/}
          {/*    exact*/}
          {/*    path="/welcome"*/}
          {/*    element={<Welcome />}*/}
         
          
      </Routes>
  );
}

export default RouteMenu;