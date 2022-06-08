import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


const LoginScreen = (location) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    let navigate = useNavigate()
    
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading,error, userInfo } = userLogin 

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    },[navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

  return <FormContainer>
        <h1>Autentificare</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Adresa de Email</Form.Label>
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
            <Button type='submit' variant='primary'>
                Conectare
            </Button>
        </Form>
        <Row className='py-3'>
            <Col>
            Client nou? <Link to={redirect ? `/register?redirect=${redirect}` 
            :'/register'}>Inregistrare</Link>
            </Col>
        </Row>
        </FormContainer>

  
}

export default LoginScreen