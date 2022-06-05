import React,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import { useParams } from 'react-router-dom'
import ProductCarousel from '../components/ProductCarousel'


const HomeScreen = () => {
  const match= useParams()

  const keyword =  match.keyword

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

  useEffect( ()=> {

    dispatch(listProducts(keyword))

  },[dispatch,keyword])

  
  return (
    <>  
    {!keyword && <ProductCarousel/>}
        <h1>Latest products</h1>
        {loading ? (
          <Loader/>
        ) : error ? (
        <Message variant='danger'>{error}</Message>
        ) : (  
        <Row>
            {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product = {product}/>
                </Col>
            ))}
        </Row> 
        )}
      
    </>
  )
}

export default HomeScreen