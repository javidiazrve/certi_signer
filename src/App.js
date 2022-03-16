import "./App.css";
import SideMenu from "./components/SideMenu";
import ListDocu from "./Pages/Documentation/ListDocu";
import Actividad from "./Pages/Actividad/Actividad";


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
      <div className={`containerTwo ${inactive ? "inactive" : ""}`}>
        <Routes>
          <Route exact path={"/"} activeClassName="active" element={<ListDocu />} />
          <Route exact path={"/documentacion"} activeClassName="active" element={<ListDocu />} />
          <Route exact path={"/actividad"} activeClassName="active" element={<Actividad />} />
        </Routes>
      </div>

    </Router>
  </div>
}

export default App;