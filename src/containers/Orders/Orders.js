import React,{ Component } from 'react';


import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandelar from "../../hoc/withErrorHandelar/withErrorHandelar";
import Spanner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
    state={
        loading: true,
        orders: []
    };

    componentDidMount =()=>{
        axios.get('/orders.json').then(res=>{
            const orders=[];
            for(let key in res.data){
                orders.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({orders: orders,loading: false});
        }).catch(error=>{
            this.setState({loading: false});
        })
    };

    render(){
        let content=this.state.orders.map(el =>{
            return <Order key={el.key} ingredient={el.ingredient} price={+el.price}/>
        });

        console.log(content);
        if(this.state.loading){
            content=<Spanner/>
        }
        return(
            <div>
                {content}
            </div>
        )
    }
}

export default withErrorHandelar(Orders,axios);