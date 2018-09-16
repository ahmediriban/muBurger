import React,{ Component } from 'react';
import { connect }from 'react-redux';

import classes from './ContactData.css';
import Button from "../../UI/Button/Button";
import Spinner from '../../UI/Spinner/Spinner';
import axios from '../../../axios-order';
import Input from '../../UI/Input/Input';
import withErrorHandelar from "../../../hoc/withErrorHandelar/withErrorHandelar";
import * as actionOrderReducer from '../../../store/actions/index';


class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP code'
                },
                value:'',
                validation:{
                    isRequired: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Country'
                },
                value:'',
                validation:{
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your E-mail'
                },
                value:'',
                validation:{
                    isRequired: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                validation:{
                    isRequired: true
                },
                value:'fastest',
                valid:true
            },
        },
        formIsValid:false
    };

    orderHandler = (event) =>{
        event.preventDefault();
        const order={};
        for(let idElorder in this.state.orderForm){
            order[idElorder] = this.state.orderForm[idElorder].value;
        }
        const orderData = {
            ingredient: this.props.ingrs,
            price: this.props.price,
            order: order
        };

        this.props.onBurgerStart(orderData);

    };

    checkValidity(value, rules){
        let isValid = true;
        if(rules.isRequired){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    };

    inputChangedHandler=(event,identifierkey)=>{
        const updateOrder = {
            ...this.state.orderForm
        };
        const updateElement = {
            ...updateOrder[identifierkey]
        };
        updateElement.value = event.target.value;
        updateElement.touched = true;
        updateElement.valid = this.checkValidity(updateElement.value,updateOrder[identifierkey].validation);
        updateOrder[identifierkey]=updateElement;
        let formIsValid = true;
        for(let element in updateOrder){
            formIsValid =updateOrder[element].valid && formIsValid;
        }
        this.setState({orderForm:updateOrder,formIsValid:formIsValid});
    };

    render(){
        let orderFormArray = [];
        for(let key in this.state.orderForm){
            orderFormArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form =(
            <form onSubmit={this.orderHandler}>
                {orderFormArray.map(element =>(
                    <Input
                        key={element.id}
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        invalid={!element.config.valid}
                        validation={element.config.validation}
                        touched={element.config.touched}
                        change={(event)=>this.inputChangedHandler(event,element.id)}
                    />
                ))}
                <Button middle="middle" buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if(this.props.loading){
            form = <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h2 style={{marginLeft:'110px'}}>Enter your contact data</h2>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ingrs: state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onBurgerStart: (orderData)=> dispatch(actionOrderReducer.purchaseBurger(orderData))
    }
};




export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandelar(ContactData,axios));

