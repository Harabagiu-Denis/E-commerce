import { CART_ADD_iTEM, CART_REMOVE_iTEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS} from '../constants/cartConstants'

export const cartReducer = (state={ cartItems:[], shippingAddress:{} },action) =>{
    switch(action.type){
        case CART_ADD_iTEM:
            const item = action.payload

            const existItem = state.cartItems.find((x) => x.product === item.product)

            if(existItem){
                return {
                    ...state,
                    cartItems:state.cartItems.map((x)=> 
                        x.product === existItem.product ? item : x)
                }

            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }
            }
        case CART_REMOVE_iTEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            }
        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            }
        default:
            return state
    }
}