import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredient: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.5,
    cheese: 0.7,
    meat: 0.8
};

const burgerBuilder=(state=initialState, action)=>{
    switch (action.type){
        case action.type = actionTypes.ADD_INGREDIENT :
            return{
                ...state,
                ingredient: {
                    ...state.ingredient,
                    [action.ingredientName] : state.ingredient[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            };
        case action.type = actionTypes.REMOVE_INGREDIENT :
            return{
                ...state,
                ingredient: {
                    ...state.ingredient,
                    [action.ingredientName] : state.ingredient[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };
        case action.type = actionTypes.SET_INGREDIENT :
            return{
                ...state,
                ingredient: {
                    salad: action.ingredient.salad,
                    bacon: action.ingredient.bacon,
                    cheese: action.ingredient.cheese,
                    meat: action.ingredient.meat,
                },
                error: false,
                totalPrice: 4
            };
        case action.type = actionTypes.FETCH_INGREDIENT_FAILED :
            return{
                ...state,
                error: true
            };
        default :
            return state
    }
};

export default burgerBuilder;

