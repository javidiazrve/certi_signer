import { useState } from "react";
import { Table, Input } from 'antd';
import { Container, Row, Col, Form, Navbar, Nav, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../Components/Navbar/NavbarHeader.css';
import circleupload from "../../assets/circleupload.svg";
import zoom from "../../assets/zoom.svg";
import closedicon from "../../assets/boton-x.png";


import bell from "../../assets/bell.svg";
// Css
import "../Documentation/ListDocu.css"

const data = [
  {
    key: '1',
    cliente: 'Asesoría integral SL',
    documentos: "190 (+23)",
    consumo: '450,00 € (+25,12)',
    visualizaciones: "45",
    uso: "Semanal",
    avisos: " ",
    check: <img src={zoom} alt="lock" />,
  },
  {
    key: '2',
    cliente: 'ASANA Certificador Industrial SA',
    documentos: "490 (+91)",
    consumo: '2.350,00 € (+245,12)',
    visualizaciones: "112",
    uso: "Diario",
    avisos: " ",
    check: <img src={zoom} alt="lock" />,
  },
  {
    key: '3',
    cliente: 'Grupo Sol SA',
    documentos: "12 (+3)",
    consumo: '40,00 € (+5,12)',
    visualizaciones: "4",
    uso: "Ocasional",
    avisos: " ",
    check: <img src={zoom} alt="lock" />,
  },
  {
    key: '4',
    cliente: 'Qualitas Certificación SL',
    documentos: "490 (+91)",
    consumo: '2.350,00 € (+245,12)',
    visualizaciones: "112",
    uso: "Diario",
    avisos: "2 facturas pendientes de pago",
    check: <img src={zoom} alt="lock" />,
  },
];

const columns = [
  {
    title: 'Cliente',
    dataIndex: 'cliente',
    key: 'cliente',
  },
  {
    title: 'Documentos',
    dataIndex: 'documentos',
    key: 'documentos',
  },
  {
    title: 'Consumo',
    dataIndex: 'consumo',
    key: 'consumo',
  },
  {
    title: 'Visualizaciones',
    dataIndex: 'visualizaciones',
    key: 'visualizaciones',
  },
  {
    title: 'Uso',
    key: 'uso',
    dataIndex: 'uso',
  },
  {
    title: 'Avisos',
    key: 'avisos',
    dataIndex: 'avisos',
    render: text => <span style={{ color: "red", paddingRight: "20px", paddingLeft: "20px" }} >{text}</span>,
  },
  {
    title: ' ',
    dataIndex: 'check',
    key: 'check',
    render: text => <span style={{ padding: "40px" }} >{text}</span>,
  }
];

const user = [
  {
    name: "Asesoriaintegral_01", id: 1
  },
  {
    name: "Asesoriaintegral_02", id: 2
  },
]

const actividad = [
  {
    actividad: "Mostrar solo clientes Activos", id: 1
  },
  {
    actividad: "Visualización mediante QR público", id: 2
  },
]


export default function Clientes() {
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState('');
  const [modalform, setModalform] = useState(false);
  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState(null);
  const onChangePicture = e => {
    if (e.target.files[0]) {
      console.log("picture: ", e.target.files);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleActivy = (e) => {
    const currValue = e.target.value;
    if (currValue === "Mostrar todo") {
      console.log("Sera que si?");
      return setDataSource(data);
    } else {
      const filteredData = data.filter(entry =>
        entry.actividad.includes(currValue)
      );
      setDataSource(filteredData);
    }

  }

  const handleModal = () => {
    setModalform(true)
  }

  const handleClosedModal = () => {
    setModalform(false)
  }



  return (
    <>
      <Container>
        <Navbar className="nav-css" collapseOnSelect expand="lg" bg="light" variant="light">
          <h4 className="navTitle">Usuario</h4>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="margin-navbar">
            <Nav className="me-auto">
              <Input
                placeholder="Buscador..."
                value={value}
                onChange={e => {
                  const currValue = e.target.value;
                  setValue(currValue);
                  const filteredData = data.filter(entry =>
                    entry.documento.includes(currValue)
                  );
                  setDataSource(filteredData);
                }}
              />
              <span className="input-group-append">
                <button
                  className="btn btn-outline-secondary  border-bottom-0 border rounded-pill ms-n5555" type="button">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </span>
            </Nav>



            <div className="container-user">
              <div className="avatar">
                <button className="btn btn-outline-secondary  border-bottom-0 border rounded-pill ms-n5 nav-button" type="button">
                  <img className="nav-icon" src={bell} alt="bell" />
                </button>
              </div>
              <div className="user-info-nav">
                <p className="name-user">Marta Dieguez</p>
                <p className="rol-user">Super Admin</p>
              </div>
            </div>
          </Navbar.Collapse>
        </Navbar>
        <div className="table-responsive">
          <Row>

            <Col lg="12" style={{ display: "flex", justifyContent: "end" }}>
              <div className="SelectBusqueda">
                <p className="title-filter">TIPO DE ACTIVIDAD</p>

                <Form.Select onClick={handleActivy} className="select-css" aria-label="Default select example">
                  {
                    actividad.map(actividad => (
                      <option key={actividad.id} value={actividad.actividad} >{actividad.actividad}</option>
                    ))
                  }
                </Form.Select>

              </div>
            </Col>

          </Row>
          <Table columns={columns} dataSource={dataSource} />
        </div>
        <Button className="uploadUser" onClick={handleModal}>Crear nueva cuenta cliente <img src={circleupload} alt="circleupload" /></Button>
        <Modal show={modalform} size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered style={{ padding: "40px" }}>
          <div className="Content">
            <Modal.Header>
              <p className="modal-title" style={{ fontSize: "24px" }}>Ficha de la empresa</p>
              <Button className="out-css-header" onClick={handleClosedModal} ><img className="closed-css-modal" src={closedicon} alt="closedicon" />
              </Button>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col lg="6">
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="title-filter-modal">Razón social</Form.Label>
                    <Form.Control className="input-Form newCategory-css" type="text" placeholder="" />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="title-filter-modal">CIF</Form.Label>
                    <Form.Control className="input-Form newCategory-css" type="text" placeholder="" />
                  </Form.Group>
                </Col>
              </Row>

              <Row style={{ marginTop: "5%" }}>
                <Col lg="6">
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="title-filter-modal">Domicilio fiscal</Form.Label>
                    <Form.Control className="input-Form newCategory-css" type="text" placeholder="" />
                  </Form.Group>
                </Col>
              </Row>

              <Row style={{ marginTop: "5%" }}>
                <Col lg="6">
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="title-filter-modal">Persona de contacto</Form.Label>
                    <Form.Control className="input-Form newCategory-css" type="text" placeholder="" />
                  </Form.Group>
                </Col>
              </Row>


              <Row style={{ marginTop: "5%" }}>
                <p className="modal-title" style={{ fontSize: "24px", marginBottom: "5%" }}>Datos del acceso de administración</p>
                <Col lg="6">
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="title-filter-modal">Nombre de usuario</Form.Label>
                    <Form.Select className="select-css-clientes" aria-label="Default select example">
                      {
                        user.map(user => (
                          <option key={user.id} value={user.name} >{user.name}</option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="title-filter-modal">Clave de acceso</Form.Label>
                    <Form.Select className="select-css-clientes" aria-label="Default select example">
                      {
                        user.map(user => (
                          <option key={user.id} value={user.name} >{user.name}</option>
                        ))
                      }
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

            </Modal.Body>
            <Row style={{ marginTop: "5%" }}>
              <Col lg="6" style={{ alignSelf: "center" }}>
                <div className="previewProfilePic">
                  <img className="playerProfilePic_home_tile" src={imgData} />
                </div>
                <div className="inputWrapper">
                  <label htmlFor="profilePic" className="uploadLogotipo btn" style={{ width: "213px" }}>Cargar logotipo <img src={circleupload} alt="circleupload" /></label>
                  <input className="fileInput" id="profilePic" type="file" style={{ visibility: "hidden" }} placeholder="Cargar logotipo" onChange={onChangePicture} />
                </div>

              </Col>
              <Col lg="6" style={{ alignSelf: "center" }}>
                <Row>
                  <Col lg="6">
                    <Button className="out-modal" onClick={handleClosedModal} >
                      Salir
                    </Button>
                  </Col>
                  <Col lg="6">
                    <Button className="uploadLogotipo" onClick={handleClosedModal} >
                      Guardar cambios
                    </Button>
                  </Col>
                </Row>

              </Col>
            </Row>
          </div>
        </Modal>
      </Container>
    </>
  );
}