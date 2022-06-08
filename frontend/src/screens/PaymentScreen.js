import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../actions/cartActions'

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  const navigate = useNavigate()

if(!shippingAddress){
    navigate('/shipping')
}
  const [paymentMethod, setPaymentMethod] = useState("PayPal")
 
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <h1>Metoda De Plata</h1>
      <Form onSubmit={submitHandler}>
       <Form.Group>
           <Form.Label as='legend'> Selecteaza Metoda
           </Form.Label>
           <Col>
           <Form.Check 
           type='radio' 
           label='PayPal or Credit Card' 
           id='PayPal' 
           name='paymentMethod' 
           value="PayPal" 
           
           onChange={(e)=> setPaymentMethod(e.target.value)}>

           </Form.Check>
           <Form.Check 
           type='radio' 
           label='Numerar' 
           id='Numerar' 
           name='paymentMethod' 
           value="Numerar" 
           checked 
           onChange={(e)=> setPaymentMethod(e.target.value)}>

           </Form.Check>
          
           </Col>
       </Form.Group>
        <Button type='submit' variant='success' className="mt-3">
          Continua
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen