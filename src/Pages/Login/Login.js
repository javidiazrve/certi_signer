import { Form, Input, Row, Col, Button } from 'antd';
import React, { useState } from 'react'
import logo from "../../assets/logo/LogoCerti.png";
import './LoginCss.css'


function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        console.log("Login")
    }

    return (
        <>
            <div className="content-form">
                <Form onSubmit={handleSubmit} className="main-form">
                    <div className="logo">
                        <img className="logo-css" src={logo} alt="certiblock" />
                    </div>
                    <Row>
                        <Col lg="12">
                            <Form.Item className="form-css"
                                type="text"
                                value={username}
                                label="Nombre de Usuario"
                                name="username"
                                onChange={(event) => setUsername(event.target.value)}
                                rules={[{ required: true, message: 'Por favor ingresa el nombre de Usuario' }]}
                            >
                                <Input className="input-login" />
                            </Form.Item>
                        </Col>
                        <Col lg="12">
                            <Form.Item className="form-css"
                                type="password"
                                value={password}
                                label="Contraseña"
                                name="password"
                                onChange={(event) => setPassword(event.target.value)}
                                rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                            >
                                <Input.Password style={{marginRight: "-30px"}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button className="login-button">Iniciar Sesión</Button>
                </Form>
            </div>
        </>
    )
}

export default Login