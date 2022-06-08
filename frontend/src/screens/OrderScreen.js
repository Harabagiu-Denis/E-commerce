import React, {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/CheckoutSteps'
import {  useParams, useNavigate } from 'react-router-dom'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'

const OrderScreen = () => {

    const match = useParams()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    

    const orderId = match.id 

    
    const orderDetails = useSelector((state)=> state.orderDetails)
    const {order, loading, error} = orderDetails
    
    const userLogin = useSelector((state)=> state.userLogin)
    const {userInfo} = userLogin
    
    const orderPay = useSelector((state)=> state.orderPay)
    const {loading:loadingPay, success:successPay} = orderPay

    const orderDeliver = useSelector((state)=> state.orderDeliver)
    const {loading:loadingDeliver, success:successDeliver} = orderDeliver

    if(!loading){
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
             }
            
          order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
          )
    
    }
   


    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }
        if(!order || successPay|| successDeliver){
            dispatch({ type:ORDER_PAY_RESET})
            dispatch({ type:ORDER_DELIVER_RESET})
            dispatch(getOrderDetails(orderId))
        }   
    }, [dispatch, orderId,successPay,order, successDeliver,userInfo,navigate]) 

    const succesPaymentHandler = () =>{
      dispatch(payOrder(order))
    }


    const deliverHandler = () =>{
        dispatch(deliverOrder(order))
    }
   

  return loading ? <Loader /> : error ? <Message variant = 'danger' >{error}
  </Message>: <>
       <h1>Comanda {order._id}</h1>
       <Row>
        <Col md={8}>
            <ListGroup variant = 'flush'>
                <ListGroup.Item>
                    <h2>Livrare</h2>
                    <p><strong>Nume:</strong>{order.user.name}</p>
                    <p>
                        <strong>Email: </strong>{' '}
                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                    <p>
                        <strong>Adesa </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                        ,{order.shippingAddress.postalCode}, {' '}{order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? <Message variant='success'>Livrat la {order.deliveredAt}</Message> 
                    :<Message variant='danger'>Nu a fost livrat</Message>}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Metoda de Plata</h2>
                    <p>
                    <strong>Metoda </strong>
                    {order.paymentMethod="Numerar"}
                    </p>
                    {order.isPaid ? <Message variant='success'>Platit la {order.paidAt}</Message> 
                    :<Message variant='danger'>Nu a fost platit</Message>}
                </ListGroup.Item>
                
                
                <ListGroup.Item>
                    <h2>Obiectele comenzii</h2>
                    {order.orderItems.length === 0 ? <Message>Comanda este goala</Message>
                    :(
                        <ListGroup variant='flush'>
                            {order.orderItems.map((item, index) =>(
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name}
                                            fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x RON{item.price} = RON{item.qty * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>

            </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Sumarul Comenzii</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Obiecte</Col>
                            <Col>RON {order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Cost Livrare</Col>
                            <Col>RON {order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Taxe</Col>
                            <Col>RON {order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>RON {order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    {loadingPay && <Loader/>}
                    {userInfo.isAdmin && !order.isPaid &&(
                       <ListGroup.Item>
                            <Button type = 'button' className='btn col-12' onClick={succesPaymentHandler}>
                                Comanda platita
                            </Button>
                       
                       </ListGroup.Item> 
                    )}
                    {loadingDeliver &&<Loader />}
                    {userInfo && userInfo.isAdmin  && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button type = 'button' className='btn col-12' onClick={deliverHandler}>
                                Comanda livrata
                            </Button>
                        </ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </Col>
    </Row>
  </>

}

export default OrderScreen