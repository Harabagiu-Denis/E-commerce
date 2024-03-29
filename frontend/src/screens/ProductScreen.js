import React, { useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'


const ProductScreen = () => {
    const [qty,setQty] = useState(1)


    const match = useParams()
    let navigate= useNavigate()
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
 

  useEffect( ()=> {
    dispatch(listProductDetails(match.id))
  
   },[dispatch,match])

   const addToCartHandler = () => {
        navigate(`/cart/${match.id}?qty=${qty}`)
   }
  
    return <>
    <Link className='btn btn-light my-3' to='/'>Inapoi</Link>
    {loading ? <Loader/> 
    : error ? <Message variant ='danger'>{error}</Message>:
    (
        <Row>
        <Col md={6}>
            <Image src={product.image} alt ={product.name} fluid/>
        </Col>
        <Col md ={3}>
            <ListGroup variant ='flush'>
                <ListGroup.Item>
                    <h2>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Rating 
                    value = {product.rating} 
                    text={`${product.numReviews} reviews`}/>
                </ListGroup.Item>
                <ListGroup.Item>
                    Pret : RON {product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                    Descriere : {product.description}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Pret:
                            </Col>
                            <Col>
                            <strong>RON {product.price}</strong>
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>
                            Status:
                            </Col>
                            <Col>
                            {product.countInStock > 0 ? 'In stoc' :'Indisponibil'}
                            </Col>
                        </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                        <ListGroup.Item>
                            <Row>
                                <Col>Cantitate</Col>
                                <Col>
                                <Form.Control as ='select' value={qty} onChange={(e) =>
                                setQty(e.target.value)}>
                                    {
                                    [...Array(product.countInStock).keys()].map(x =>(
                                        <option key = {x+1} value={x+1}>
                                            {x+1}
                                            </option>
                                    ))}
                                </Form.Control>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                        <Button 
                        onClick={addToCartHandler}
                        className='btn-block' 
                        type = 'button' 
                        disabled = {product.countInStock === 0}>
                            Adauga in cos
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>   
    )}
    
    </>
  
}

export default ProductScreen