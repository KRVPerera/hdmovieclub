import React, {useRef, useState} from "react"
import {Form, Button, Card, Alert} from "react-bootstrap"
import {Link, useNavigate} from 'react-router-dom'
import {Content, Wrapper, StyledCard} from "./Signup.styles";
import {useAuth} from "../../contexts/AuthContext";

// code is copied from https://github.com/WebDevSimplified/React-Firebase-Auth

export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const {signup} = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }

        function processError(err) {
            switch (err.code) {
                case 'auth/email-already-in-use':
                    setError("Failed to create an account. The email address is already in use.")
                    break;
                case 'auth/weak-password':
                    setError("Failed to create an account. Weak password : " + err.message)
                    break
                default:
                    setError("Failed to create an account : " + err.message)
            }
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/login")
        } catch (err) {
            processError(err);
        }
        setLoading(false)
    }

    return (
        <Wrapper>
            <Content>
                <StyledCard className="signupCard">
                    <Card.Body>
                        <h2 className="text-center mb-4">Sign Up to HD Movie Club</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mt-2" id="email">
                                <Form.Label className="col-form-label-lg">Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required
                                              onChange={event => setError(false)}/>
                            </Form.Group>

                            <Form.Group id="password" className="mt-2">
                                <Form.Label className="col-form-label-lg">Password</Form.Label>
                                {/*//event.currentTarget.value*/}
                                <Form.Control type="password" ref={passwordRef} required
                                              onChange={event => setError(false)}/>
                            </Form.Group>

                            <Form.Group id="password-confirm" className="mt-2">
                                <Form.Label className="col-form-label-lg">Password Confirmation</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required
                                              onChange={event => setError(false)}/>
                            </Form.Group>

                            <Button disabled={loading} className="btn-lg w-100 mt-4" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </StyledCard>
                <div className="w-100 text-center mt-lg-2">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </Content>
        </Wrapper>
    )
}