import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'

const Burger = (props) =>{
    let transformatedIngredient = Object.keys(props.ingredient).map( igKey => {
        return [...Array(props.ingredient[igKey])].map( (_,i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    }).reduce((arr, el) => {
        return arr.concat(el);
    },[]);
    if( transformatedIngredient.length === 0){
        transformatedIngredient = <p>Please enter ingredient!</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformatedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
};

export default Burger;