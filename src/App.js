import "./App.css";
import SideMenu from "./Components/SideMenu";
import ListDocu from "./Pages/Documentation/ListDocu";
import Actividad from "./Pages/Actividad/Actividad";
import Usuario from "./Pages/Usuarios/Usuario";


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
          <Route exact path={"/"} activeclassname="active" element={<ListDocu />} />
          <Route exact path={"/documentacion"} activeclassname="active" element={<ListDocu />} />
          <Route exact path={"/actividad"} activeclassname="active" element={<Actividad />} />
          <Route exact path={"/usuario"} activeclassname="active" element={<Usuario />} />
        </Routes>
      </div>

    </Router>
  </div>
}

export default App;