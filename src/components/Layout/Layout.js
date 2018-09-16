import React, { Component } from 'react';

import Aux from '../../hoc/Ax';
import classes from './Layout.css';
import Toolbar from '../Navgiation/Toolbar/Toolbar';
import SideDrawer from "../SideDrawer/SideDrawer";


class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    updateSD = () =>{
        this.setState({showSideDrawer: false});
    };


    swapShowSD = () => {
        this.setState((prevState) => {
            return{showSideDrawer:!prevState.showSideDrawer}
        });
    };
    render(){
        return(
            <Aux>
                <Toolbar showSD={this.swapShowSD}/>
                <SideDrawer
                    show={this.state.showSideDrawer}
                    click={this.updateSD}
                />
                <main className={classes.Contants}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
