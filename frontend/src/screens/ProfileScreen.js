import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Table, Form, Button, Row, Col  } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'


const ProfileScreen = (location) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    
    let navigate = useNavigate()

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
    const { loading:loadingOrders, error:errorOrders, orders } = orderListMy
    
   

    useEffect(() => {
        if(!userInfo) {
            navigate('/login')
        }else{
            if(!user || !user.name){
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user] )

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
        
    }

  return <Row>
      <Col md={3}>
      <h2>Profilul utilizatorului</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profil modificat</Message>}
        {loading && <Loader/>}
        
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Nume</Form.Label>
                <Form.Control 
                type='name' 
                placeholder = "Introdu Nume"
                value={name}
                onChange={(e)=> setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Adresa de Email</Form.Label>
                <Form.Control 
                type='email' 
                placeholder = "Introdu adresa de email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
                <Form.Label>Parola</Form.Label>
                <Form.Control 
                type='password' 
                placeholder = "Introdu Parola"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirma Parola</Form.Label>
                <Form.Control 
                type='password' 
                placeholder = "Confirma Parola"
                value={confirmPassword}
                onChange={(e)=> setConfirmPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Modifica
            </Button>
        </Form>
      </Col>
      <Col md={9}>
            <h2>Comenzile mele</h2>
            {loadingOrders ? <Loader/> : errorOrders ? <Message variant='danger'>
                {errorOrders}</Message>: (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATA</th>
                                <th>TOTAL</th>
                                <th>PLATIT</th>
                                <th>LIVRAT</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order =>(
                              <tr key={order._id}>
                                  <td>{order._id}</td>
                                  <td>{order.createdAt.substring(0,10)}</td>
                                  <td>{order.totalPrice}</td>
                                  <td>
                                      {order.isPaid ? order.paidAt.substring(0,10) : (
                                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                                  )}</td>
                                  <td>
                                      {order.isDelivered ? order.deliveredAt.substring(0,10) : (
                                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                                  )}</td>
                                  <td>
                                      <LinkContainer to={`/order/${order._id}`}>
                                          <Button variant = 'light'>Detalii</Button>
                                      </LinkContainer>
                                  </td>
                              </tr>  
                            ))}
                        </tbody>
                    </Table>
                )}
      </Col>
  </Row>

  
}

export default ProfileScreen