import "./App.css";
import SideMenu from "./Components/SideBarUser/SideMenu";
import SideMenuAdmin from "./Components/SideBarAdmin/SideMenuAdmin";
import ListDocu from "./Pages/Documentation/ListDocu";
import Actividad from "./Pages/Actividad/Actividad";
import Usuario from "./Pages/Usuarios/Usuario";
import Login from "./Pages/Login/Login";

// ADM interface
import Clientes from "./Pages/AdminInterface/Clientes";
import Consumo from "./Pages/AdminInterface/Consumo";
import ActividadAdmin from "./Pages/AdminInterface/ActividadAdmin";
import Facturacion from "./Pages/AdminInterface/Facturacion";





import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useState } from "react";

function App() {

  const [inactive, setInative] = useState(false);

  return <div className="App">
    <Router>

      {window.location.pathname === "/" || window.location.pathname === "/documentacion" || window.location.pathname === "/actividad" || window.location.pathname === "/usuario" ? (
        <SideMenu onCollapse={(inactive) => {
          console.log(inactive);
          setInative(inactive);
        }} />
      ) : null}

      {window.location.pathname === "/clientes" || window.location.pathname === "/consumo" || window.location.pathname === "/actividadadm" || window.location.pathname === "/facturacion" ? (
        <SideMenuAdmin onCollapse={(inactive) => {
          console.log(inactive);
          setInative(inactive);
        }} />
      ) : null}

      <div className={`containerTwo ${inactive ? "inactive" : ""}`}>
        <Routes>
          <Route exact path={"/login"} element={<Login />} />
          <Route exact path={"/"} element={<ListDocu />} />
          <Route exact path={"/documentacion"} element={<ListDocu />} />
          <Route exact path={"/actividad"} element={<Actividad />} />
          <Route exact path={"/usuario"} element={<Usuario />} />
          <Route exact path={"/clientes"} element={<Clientes />} />
          <Route exact path={"/consumo"} element={<Consumo />} />
          <Route exact path={"/actividadadm"} element={<ActividadAdmin />} />
          <Route exact path={"/facturacion"} element={<Facturacion />} />
        </Routes>
      </div>

    </Router>
  </div>
}

export default App;