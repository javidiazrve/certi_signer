import "./App.css";
import SideMenu from "./components/SideMenu";
import ListDocu from "./Pages/Documentation/ListDocu";
import NavBarHeader from "./components/Navbar/NavbarHeader";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useState } from "react";

function App() {

  const [inactive, setInative] = useState(false);

  return <div className="App">
    <Router>
      <SideMenu onCollapse={(inactive) => {
        console.log(inactive);
        setInative(inactive);
      }} />
      <div className={`container ${inactive ? "inactive" : ""}`}>
        <Routes>
          <Route exact path="/" element={<ListDocu />} />

        </Routes>
      </div>

    </Router>
  </div>
}

export default App;