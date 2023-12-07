import React, { useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import '../Styles/RegisterLogin.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'


const Register = () => {
    const navigate = useNavigate()

    const handleFormAction = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        try {
            console.log(formDataObj)
            await axios.post('/api/v1/users/register', formDataObj).then((res) => { console.log(res.data); })
            navigate("/login")
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
        <div className='register'>
            <div className="registerLogin">
                <div className="registerLogin-form">
                    <h1>POS - HS Colab</h1>
                    <h4>Register User</h4>
                    <Form onSubmit={handleFormAction} id="myAddEditForm">

                        <Form.Group className="mb-1">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control name='fname' type="text" placeholder="First name" />
                        </Form.Group>

                        <Form.Group className="mb-1">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name='lname' type="text" placeholder="Last name" />
                        </Form.Group>

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
                                Already Registered?
                                <Link to="/login">
                                    Login!
                                </Link>
                            </p>
                            <Button variant="success" type="submit" form="myAddEditForm">Register Me!</Button>
                        </div>

                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Register