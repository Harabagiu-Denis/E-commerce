import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'


const RegisterScreen = (location) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    
    let navigate = useNavigate()

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister 

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name,email,password))
        }
        
    }

  return <FormContainer>
        <h1>Inregistrare</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Nume</Form.Label>
                <Form.Control 
                type='name' 
                placeholder = "Introdu nume"
                value={name}
                onChange={(e)=> setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Adresa de email</Form.Label>
                <Form.Control 
                type='email' 
                placeholder = "Introdu email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Parola</Form.Label>
                <Form.Control 
                type='password' 
                placeholder = "Introdu parola"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirma parola</Form.Label>
                <Form.Control 
                type='password' 
                placeholder = "Confirma parola"
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Inregistare
            </Button>
        </Form>
        <Row className='py-3'>
            <Col>
            Ai deja un cont? {' '}
            <Link to={redirect ? `/login?redirect=${redirect}` 
            :'/login'}>Autentificare</Link>
            </Col>
        </Row>
        </FormContainer>

  
}

export default RegisterScreen