import React from 'react';

import classes from './SideDrawer.css';
import Logo from "../Logo/Logo";
import NavigationItems from "../Navgiation/NavigationItems/NavigationItems";
import Aux from "../../hoc/Ax";
import Backdrop from "../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
    let sdClass = [classes.SideDrawer, classes.Close].join(' ');
    if(props.show){
        sdClass = [classes.SideDrawer, classes.Open].join(' ');
    }
    return(
        <Aux>
        <Backdrop show={props.show} click={props.click}/>
        <div className={sdClass}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <ul>
                <NavigationItems/>
            </ul>
        </div>
        </Aux>
    );
};

export default SideDrawer;