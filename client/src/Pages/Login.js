import React, { useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import '../Styles/RegisterLogin.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {

    const navigate = useNavigate()

    const handleFormAction = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target), formDataObj = Object.fromEntries(formData.entries())
        try {
            console.log(formDataObj)
            await axios.post('https://pos-server-gules.vercel.app/api/v1/users/login', formDataObj)
                .then((res) => {
                    console.log(res.data);
                    localStorage.setItem("auth", JSON.stringify(res.data))
                    navigate("/")
                })
                .catch((error) => {
                    console.log(error.response.data);
                })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            localStorage.getItem("auth")
            navigate("/")
        }
    }, [navigate])

    return (
        <div className='login'>
            <div className="registerLogin">
                <div className="registerLogin-form">
                    <h1>POS - HS Colab</h1>
                    <h4>Login</h4>
                    <Form onSubmit={handleFormAction} id="myAddEditForm">

                        <Form.Group className="mb-1">
                            <Form.Label>User Id</Form.Label>
                            <Form.Control name='usid' type="text" placeholder="Secret User Id" />
                        </Form.Group>

                        <Form.Group className="mb-1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name='password' type="password" placeholder="Enter your secret password" />
                        </Form.Group>

                        <div className="register-btn">
                            <p>
                                <Link to="/register">
                                    Forgot your password?
                                </Link>
                            </p>
                            <Button variant="warning" type="submit" form="myAddEditForm">Login!</Button>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login