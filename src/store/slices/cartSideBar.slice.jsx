import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setIsLoading } from './isLoading.slice';

export const cartSideBarSlice = createSlice({
    name: 'cartSideBarSideSlice',
    initialState: [],
    reducers: {
      setCartsSide: (state, action) => {
         return action.payload;
      }
    }
});


export const getCartSide = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get('https://e-commerce-api.academlo.tech/api/v1/cart',getConfig())
        .then((res) => dispatch(setCartsSide(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)));
}

export const addToCartThunk = (add) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post('https://e-commerce-api.academlo.tech/api/v1/cart',add,getConfig())
        .then(() => dispatch(getCartSide()))
        .finally(() => dispatch(setIsLoading(false)));
};


export const { setCartsSide } = cartSideBarSlice.actions;

export default cartSideBarSlice.reducer;
