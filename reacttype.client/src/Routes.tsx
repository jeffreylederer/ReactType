import {
    Routes,
    Route
} from "react-router-dom";


import Membership from "./Pages/Membership/List.tsx";
import MembershipDelete from "./Pages/Membership/Delete.tsx";
import MembershipUpdate from "./Pages/Membership/Update.tsx";
import MembershipCreate from "./Pages/Membership/Create.tsx";

import League from "./Pages/Admin/League/List.tsx";
import LeagueDelete from "./Pages/Admin/League/Delete.tsx";
import LeagueUpdate from "./Pages/Admin/League/Update.tsx";
import LeagueCreate from "./Pages/Admin/League/Create.tsx";
import LeagueDetails from "./Pages/Admin/League/Details.tsx";

import Users from "./Pages/Admin/Users/List.tsx";
import UsersDelete from "./Pages/Admin/Users/Delete.tsx";
import UsersUpdate from "./Pages/Admin/Users/Update.tsx";
import UsersCreate from "./Pages/Admin/Users/Create.tsx";

import Players from "./Pages/League/Players/List.tsx";


import About from "./Pages/About.tsx";
import Contact from "./Pages/Contact.tsx";
import Welcome from "./Pages/Welcome.tsx";
import Home from './Pages/Home.tsx'; 




function RouteMenu() {
  return (
      <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/Membership" element={<Membership />} />
          <Route path="/Membership/Delete" element={<MembershipDelete />} />
          <Route path="/Membership/Update" element={<MembershipUpdate />} />
          <Route path="/Membership/Create" element={<MembershipCreate />} />

          <Route path="/Admin/Leagues" element={<League />} />
          <Route path="/Admin/League/Delete" element={<LeagueDelete />} />
          <Route path="/Admin/League/Update" element={<LeagueUpdate />} />
          <Route path="/Admin/League/Create" element={<LeagueCreate />} />
          <Route path="/Admin/League/Details" element={<LeagueDetails />} />

          <Route path="/Admin/Users" element={<Users />} />
          <Route path="/Admin/Users/Delete" element={<UsersDelete />} />
          <Route path="/Admin/Users/Update" element={<UsersUpdate />} />
          <Route path="/Admin/Users/Create" element={<UsersCreate />} />

          <Route path="/League/Players" element={<Players />} />

          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/About" element={<About />} />
          
         
      </Routes>
  );
}

export default RouteMenu;