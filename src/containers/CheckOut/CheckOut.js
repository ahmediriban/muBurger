import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckOutOrderSummary from "../../components/Order/CheckOutOrderSummary/CheckOutOrderSummary";
import ContactData from "../../components/Order/ContactData/ContactData";
import * as actionOrderReducer from "../../store/actions";


class CheckOut extends Component{

    componentWillMount(){
        this.props.onPurchase();
    };

    returnBackHandler=()=>{
        this.props.history.goBack();
    };

    sendDataHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    };

    render(){
        let summary = <Redirect to="/"/>;
        if(this.props.ingrs){
            const redirectPurchase = this.props.purchase ? <Redirect to="/"/>  : null;
            summary = (
                <div>
                    {redirectPurchase}
                    <CheckOutOrderSummary
                        ingredient={this.props.ingrs}
                        returnBack={this.returnBackHandler}
                        sendData={this.sendDataHandler}
                    />
                    <Route path={this.props.match.path + "/contact-data"} component={ContactData}/>
                </div>
            )
        }
        return summary;
    }
}

const mapStateToProps = state =>{
    return{
        ingrs: state.burgerBuilder.ingredient,
        purchase: state.order.purchase
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onPurchase: ()=> dispatch(actionOrderReducer.purchaseInit())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(CheckOut);