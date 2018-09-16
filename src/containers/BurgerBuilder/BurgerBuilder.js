import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Ax'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Model from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandelar from "../../hoc/withErrorHandelar/withErrorHandelar";
import * as burgerBuilderReducer from '../../store/actions/index';


class BurgerBuilder extends Component {
    state = {
        purchasing : false
    };


    updatePurchasable(ingredient){
        const sum = Object.keys(ingredient).map(el => {
            return ingredient[el]
        }).reduce((sum, el) => {
            return sum + el;
        },0);
        return sum > 0
    }
    /*
    addIngredientHandlers = (type) => {
        const oldCount = this.state.ingredient[type];
        const newCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredient
        };
        updatedIngredient[type] = newCount;
        const oldTotal = this.state.totalPrice;
        const price = INGREDIENT_PRICE[type];
        const updatedTotal = oldTotal + price ;
        this.setState({ingredient: updatedIngredient, totalPrice: updatedTotal});
        this.updatePurchasable(updatedIngredient);
    };

    removeIngredientHandlers = (type) => {
        const oldCount = this.state.ingredient[type];
        if(oldCount <= 0){
            return;
        }
        const newCount = oldCount - 1;
        const updatedIngredient = {
            ...this.state.ingredient
        };
        updatedIngredient[type] = newCount;
        const oldTotal = this.state.totalPrice;
        const price = INGREDIENT_PRICE[type];
        const updatedTotal = oldTotal - price ;
        this.setState({ingredient: updatedIngredient, totalPrice: updatedTotal});
        this.updatePurchasable(updatedIngredient);
    };*/

    updatePurchasing = () => {
        this.setState({purchasing : true})
    };

    cancelPurchasing = () => {
        this.setState({purchasing : false})
    };

    continuePurchasing = () =>{
        /*
        let queryParams = [];
        for(let i in this.props.ingrs){
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingrs[i]));
        }
        queryParams.push('price='+this.props.price);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
        */
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');

    };

    componentDidMount(){
        this.props.onInitiIngredient();
    };

    render(){
        //console.log([...Array(this.state.ingredient['meat'])].map({null}));
        const disabledInfo = {
            ...this.props.ingrs
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredient can't be loaded</p> : <Spinner/>;
        if(this.props.ingrs){
            burger = (
                <Aux>
                    <Burger ingredient={this.props.ingrs}/>
                    <BuildControls
                        addIngredient={this.props.onIngredientAdd}
                        removeIngredient={this.props.onIngredientRemove}
                        disabled={disabledInfo}
                        price={this.props.price}
                        orderd={this.updatePurchasing}
                        update={this.updatePurchasable(this.props.ingrs)}
                    />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredient={this.props.ingrs}
                cancel={this.cancelPurchasing}
                continue={this.continuePurchasing}
                price={this.props.price}/>;
        }


        return(
            <Aux>
                <Model show={this.state.purchasing} clicked={this.cancelPurchasing}>
                    {orderSummary}
                </Model>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return{
        ingrs: state.burgerBuilder.ingredient,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdd: (ingrName) => dispatch(burgerBuilderReducer.addIngredient(ingrName)),
        onIngredientRemove: (ingrName) => dispatch(burgerBuilderReducer.removeIngredient(ingrName)),
        onInitiIngredient: () => dispatch(burgerBuilderReducer.initiIngredient()),
        onPurchaseInit: ()=>dispatch(burgerBuilderReducer.purchaseInit())
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandelar(BurgerBuilder, axios));