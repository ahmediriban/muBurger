import React from 'react';

import classes from './CheckOutOrderSummary.css';



import Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";

const CheckOutOrderSummary = (props) =>{
    return(
        <div className={classes.CheckOutOrderSummary}>
            <h1>We hope taste is good!</h1>
            <div style={{
                width:'100%',
                margin:'auto',
                marginBottom: '50px'
            }}>
                <Burger ingredient={props.ingredient}/>
            </div>
            <Button buttonType="Success" clicked={props.sendData}>CONTINUE</Button>
            <Button buttonType="Danger" clicked={props.returnBack}>CANCEL</Button>
        </div>
    );
};

export default CheckOutOrderSummary;