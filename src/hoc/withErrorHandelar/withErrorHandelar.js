import React, { Component } from 'react';

import Model from '../../components/UI/Model/Model';
import Ax from '../Ax';


const withErrorHandelar = (WrappedComponent, axios) =>{
    return class extends Component {
        state = {
            error: null
        };

        componentWillMount = () => {
            axios.interceptors.request.use(req =>{
                this.setState({error: null});
                return req;
            });

            axios.interceptors.response.use(req => req, error => {
                this.setState({error: error});
            })
        };

        confirmedError = () =>{
            this.setState({error: null});
        };

        render(){
            return(
                <Ax>
                    <Model show={this.state.error} clicked={this.confirmedError}>
                        {this.state.error ? this.state.error.message: null}
                    </Model>
                    <WrappedComponent {...this.props}/>
                </Ax>
            );
        }
    }
};


export default withErrorHandelar;