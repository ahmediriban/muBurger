import React from 'react';

import classes from './Order.css';

const Order = (props) =>{
    const ingredient = [];

    for(let ingredientName in props.ingredient){
        ingredient.push({
            name: ingredientName,
            amount: props.ingredient[ingredientName]
        })
    }

    const finalingredient = ingredient.map(el =>(
        <span
            style={{
                marginLeft:'10px',
                border:'1px solid #eee',
                padding: '10px',
                boxShadow:'0 2px 3px #ccc',
                display:'inline-block'
            }}
        >{el.name}({el.amount})</span>
    ));
    return(
        <div className={classes.order}>
            <p>Ingredient :{finalingredient}</p>
            <p>Price:<strong>USD {props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;