import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders:[],
    loading: false,
    purchase: false
};

const order=(state=initialState, action)=>{
    switch (action.type){
        case action.type = actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchase: false
            };
        case action.type = actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: false
            };
        case action.type = actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id
            };
            return{
                ...state,
                orders: state.orders.concat(newOrder),
                purchase: true,
                loading: false
            };
        case action.type = actionTypes.PURCHASE_BURGER_FAILED:
            return{
                ...state,
                loading: false
            };

        default :
            return state
    }
};

export default order;

