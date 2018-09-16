import React from 'react';

import Aux from '../../../hoc/Ax';
import Button from '../../UI/Button/Button';



const OrderSummary = (props) => {
    const orderList  = Object.keys(props.ingredient).map( igKey => {
        return(
            <li key={igKey}>
                <span style={{transform: 'capitalize'}}>{igKey}</span>: {props.ingredient[igKey]}
            </li>
        )
    });
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients : </p>
            <ul>
                {orderList}
            </ul>
            <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout ?</p>
            <Button buttonType='Success' clicked={props.continue}>CONTINUE</Button>
            <Button buttonType='Danger' clicked={props.cancel}>CANCEL</Button>
        </Aux>
    )
};

export default OrderSummary;