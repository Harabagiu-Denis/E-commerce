import axios from 'axios'
import { CART_ADD_iTEM} from '../constants/cartConstants'

export const addToCart = (id,qty)  => async(dispatch , getState) =>{
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type:CART_ADD_iTEM,
        payload: {
            product: data._id,
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock : data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems',JSON.stringifygetState().cart.cartItems)

}