import {
    Routes,
    Route
} from "react-router-dom";


import Membership from "./Pages/Membership/List.tsx";
import MembershipDelete from "./Pages/Membership/Delete.tsx";
import MembershipUpdate from "./Pages/Membership/Update.tsx";
import MembershipCreate from "./Pages/Membership/Create.tsx";


import League from "./Pages/League/List.tsx";
import LeagueDelete from "./Pages/League/Delete.tsx";
import LeagueUpdate from "./Pages/League/Update.tsx";
import LeagueCreate from "./Pages/League/Create.tsx";
import LeagueDetails from "./Pages/League/Details.tsx";


import About from "./Pages/About.tsx";
import Contact from "./Pages/Contact.tsx";
//import Users from "./pages/admin/users/index.jsx";
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
          <Route path="/Membership/Create" element={<MembershipCreate />} />

          <Route path="/League" element={<League />} />
          <Route path="/League/Delete" element={<LeagueDelete />} />
          <Route path="/League/Update" element={<LeagueUpdate />} />
          <Route path="/League/Create" element={<LeagueCreate />} />
          <Route path="/League/Details" element={<LeagueDetails />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />

         
         
          
      </Routes>
  );
}

export default RouteMenu;