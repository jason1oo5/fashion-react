import qs from "qs";
import axios_instance from "../components/api/api_instance"

export const getCartItems = async () => {
    const res = await axios_instance({
        url: '/user/cart/getCartItems',
        method: 'GET'
    });
    return res.data.cartItems
}

export const addToCart = async (product_id: any) => {
    const res = await axios_instance({
        url: 'user/cart/addToCart',
        method: 'POST',
        data: qs.stringify({product_id: product_id})
    });

    return res.data.updatedCartItems;
}

export const deleteCartItem = async (cart_id: any) => {
    const res = await axios_instance({
        url: 'user/cart/deleteCartItem/' + cart_id,
        method: 'DELETE',        
    });

    return res.data.updatedCartItems;
}