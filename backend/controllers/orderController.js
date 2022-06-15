import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@description Create new order
//@route POST /api/orders
//@access Private


const addOrderItems = asyncHandler(async (req, res) =>{
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice,
    totalPrice } = req.body

    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error("No order items")
        return
    }else{
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice,
            totalPrice,
        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }

})



//@description Get order by ID
//@route Get /api/orders/:id
//@access Private


const getOrderById = asyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    } else{
        res.status(404)
        throw new Error('Order not found')
    }

})


//@description Update order to paid
//@route Get /api/orders/:id/pay
//@access Private


const updateOrderToPaid = asyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)

    } else{
        res.status(404)
        throw new Error('Order not found')
    }

})


//@description Get logged in user orders
//@route Get /api/orders/myorders
//@access Private


const getMyOrders = asyncHandler(async (req, res) =>{
    const orders = await Order.find({ user: req.user._id })
    res.json(orders)
 

})


//@description Get all order
//@route Get /api/orders
//@access Private/ADMIN


const getOrders = asyncHandler(async (req, res) =>{
    const orders = await Order.find({}).populate('user', 'id name')
    res.json(orders)
 

})


//@description Update order to delivered
//@route Get /api/orders/:id/deliver
//@access Private/Admin


const updateOrderToDelivered = asyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id)

    if(order){
        order.isDelivered = true
        order.deliveredAt = Date.now()
        const updatedOrder = await order.save()
        res.json(updatedOrder)

    } else{
        res.status(404)
        throw new Error('Order not found')
    }

})

export{
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrders,
    updateOrderToDelivered,
}