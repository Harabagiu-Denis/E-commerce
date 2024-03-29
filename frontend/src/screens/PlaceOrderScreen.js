import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)

    //calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
      }
    
      cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
      cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
      cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
      cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
      ).toFixed(2)

       const orderCreate = useSelector((state)=> state.orderCreate)
       const {order, success, error} = orderCreate

       useEffect(()=>{
           if(success){
               navigate (`/order/${order._id}`)
               }
           //eslint-disable-next-line
       },[navigate, success])

    const placeOrderHandler = () =>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress:cart.shippingAddress,
            paymentMethod : cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

  return <>
    <CheckoutSteps step1 step2 step3 step4/>
    <Row>
        <Col md={8}>
            <ListGroup variant = 'flush'>
                <ListGroup.Item>
                    <h2>Livrare</h2>
                    <p>
                        <strong>Adresa: </strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                        ,{cart.shippingAddress.postalCode}, {' '}{cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Metoda de Plata</h2>
                    <strong>Metoda </strong>
                    {cart.paymentMethod="Numerar"}
                </ListGroup.Item>
                
                
                <ListGroup.Item>
                    <h2>Comanda</h2>
                    {cart.cartItems.length === 0 ? <Message>Cosul de Cumparaturi este gol</Message>
                    :(
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item, index) =>(
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
                                            {item.qty} x RON {item.price} = RON {item.qty * item.price}
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
                        <h2>Sumarul comenzii</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Obiecte</Col>
                            <Col>RON {cart.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Cost livrare</Col>
                            <Col>RON {cart.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Taxe</Col>
                            <Col>RON {cart.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Total</Col>
                            <Col>RON {cart.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                    <ListGroup.Item className="d-grid gap-2">
                        <Button 
                        variant="success"
                        type='button' 
                        disabled={cart.cartItems ===0} 
                        onClick={placeOrderHandler}
                        >Plaseaza Comanda</Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
}

export default PlaceOrderScreen