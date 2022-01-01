import React, {useRef, useState} from "react"

import {Content, Wrapper, StyledCard} from "./Login.styles";
import {Alert, Button, Card, Form} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../contexts/AuthContext";

export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const {login} = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        function processError(err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    setError("Failed to Log In")
                case 'auth/user-not-found': // Is this safe ?
                    setError("User not found.")
                default:
                    setError("Failed to Log In")
            }
        }

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch (err) {
            processError(err)
        }
        setLoading(false)
    }


    return (
        <Wrapper>
            <Content>
                <StyledCard className="signupCard">
                    <Card.Body>
                        <h2 className="text-center mb-4">Log In to HD Movie Club</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>

                            <Form.Group className="mt-2" id="email">
                                <Form.Label className="col-form-label-lg">Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required onChange={event => setError(false)}/>
                            </Form.Group>

                            <Form.Group id="password" className="mt-2">
                                <Form.Label className="col-form-label-lg">Password</Form.Label>
                                {/*//event.currentTarget.value*/}
                                <Form.Control type="password" ref={passwordRef} required onChange={event => setError(false)}/>
                            </Form.Group>

                            <Button disabled={loading} className="btn-lg w-100 mt-4" type="submit">
                               Log In
                            </Button>
                        </Form>
                    </Card.Body>
                </StyledCard>
                <div className="w-100 text-center mt-lg-2">
                    Need an account? <Link to="/signup">Signup</Link>
                </div>
            </Content>
        </Wrapper>
    )
}