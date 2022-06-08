import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'



const ProductEditScreen = () => {
    const match=useParams()
    const productId = match.id 

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')  
    const [brand, setBrand] = useState('')  
    const [category, setCategory] = useState('')  
    const [countInStock, setCountInStock] = useState(0)  
    const [description, setDescription] = useState('')  
    const [uploading, setUploading] = useState(false)  
   
    let navigate = useNavigate()

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails 
   
    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate 
   


    useEffect(() => {
        if(successUpdate){
            dispatch({type:PRODUCT_UPDATE_RESET})
            navigate('/admin/productList')
        }else{
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }

        }
       
           
        

       
    },[dispatch, productId,product, navigate,successUpdate])


    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image',file)
        setUploading(true)
        
        try {
            const config = {
                headers:{
                    'Content-type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData,config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
            
        }
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
        
    }

  return (
  
    <>
        <Link to='/admin/productList' className='btn btn-light my-3'>
            Inapoi
        </Link>
        <FormContainer>
        <h1>Editeaza produs</h1>
        {loadingUpdate && <Loader/>}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>:(
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>Nume</Form.Label>
                    <Form.Control 
                    type='name' 
                    placeholder = "Introdu nume"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Pret</Form.Label>
                    <Form.Control 
                    type='number' 
                    placeholder = "Introdu pret"
                    value={price}
                    onChange={(e)=> setPrice(e.target.value)}></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='image'>
                <Form.Label>Imagine</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder = "Introdu imagine"
                    value={image}
                    onChange={(e)=> setImage(e.target.value)}
                    ></Form.Control>
                    <Form.Control type='file' id='image-file' label='Choose File' custom onChange={uploadFileHandler}
                    ></Form.Control>
                    {uploading && <Loader/>}
                </Form.Group>
    
                <Form.Group controlId='brand'>
                <Form.Label>Brand</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder = "Introdu brand"
                    value={brand}
                    onChange={(e)=> setBrand(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group controlId='countInStock'>
                    <Form.Label>Numarul de produse in stoc</Form.Label>
                    <Form.Control 
                    type='number' 
                    placeholder = "Introdu numarul de produse in stoc"
                    value={countInStock}
                    onChange={(e)=> setCountInStock(e.target.value)}></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='category'>
                <Form.Label>Categoria</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder = "Introdu Categoria"
                    value={category}
                    onChange={(e)=> setCategory(e.target.value)}></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='description'>
                <Form.Label>Descriere</Form.Label>
                    <Form.Control 
                    type='text' 
                    placeholder = "Introdu Descrierea"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}></Form.Control>
                </Form.Group>
    
                
                <Button type='submit' variant='primary'>
                    Modifica
                </Button>
            </Form>
        )}
        
        
        </FormContainer>

    </>

  
    )

  
}

export default ProductEditScreen