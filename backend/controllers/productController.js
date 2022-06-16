
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) =>{
    const keyword = req.query.keyword ? {
        name:{
            $regex:req.query.keyword,
            $options:'i'
        }
    } : {} 
    const products = await Product.find({ ...keyword })
    res.json(products)
})

const getProductById = asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})


//@description Fetch all products
//@route Get /api/products
//@access Public 

//@description Delete a product
//@route Delete /api/products/:id
//@access Private/Admin

//@description Fetch all products
//@route Get /api/products
//@access Public 

//@description Create a product
//@route POST /api/products
//@access Private/Admin

const deleteProduct = asyncHandler(async (req, res) =>{
    const product = await Product.findById(req.params.id)

    if(product){
        await product.remove()
        res.json({ message: 'Product remove' })
    }else{
        res.status(404)
        throw new Error('Product not found')
    }
})
const createProduct = asyncHandler(async (req, res) =>{
    const product = new Product({
        name:'Sample Name',
        price:0,
        user:req.user._id,
        image:'/images/alexa.jpg',
        brand:'Sample Brand',
        category:'Sample category',
        countInStock:0,
        numReviews:0,
        description:'Sample description',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
    
})


//@description Update a product
//@route PUT /api/products/:id
//@access Private/Admin
//@description Get top rated products
//@route PUT /api/products/top
//@access Public

const updateProduct = asyncHandler(async (req, res) =>{
    const {name,price,description,image,brand,category,countInStock,} =req.body
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404)
        throw new Error('Product not found')
    }})

const getTopProducts = asyncHandler(async (req, res) =>{
    const products = await Product.find({}).sort({ rating:-1 }).limit(4)

    res.json(products)
    
})


export {getProducts, getProductById, deleteProduct,
createProduct, updateProduct, getTopProducts}