import React, { useRef, useState } from 'react'
import { Form, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function ForgotPassword() {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')



    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setMessage('')
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Check Inbox for Update")
        } catch {
            setError("Failed to Reset Password")
        }
        setLoading(false)

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Password Reset:</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="danger">{message}</Alert>}

                    <Form onSubmit={handleSubmit}>

                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
 
                       <Button className="w-100" type="submit" disabled={loading}>Reset Password</Button>

                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/login">Login?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't Have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </>
    )
}
