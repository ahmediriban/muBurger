import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = (name) =>{
  return{
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: name
  }
};

export const removeIngredient = (name) =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

export const setIngredient = (ingredient) =>{
    console.log(ingredient);
    return{
        type: actionTypes.SET_INGREDIENT,
        ingredient: ingredient
    }
};

export const fetchIngredientFailed = () =>{
    return{
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
};

export const initiIngredient = () =>{
    return dispatch =>{
        axios.get('/Ingredients.json').then(response=>{
            console.log(response.data);
            dispatch(setIngredient(response.data))
        }).catch(error =>{
            dispatch(fetchIngredientFailed())
        })
    }
};