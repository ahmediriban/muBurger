import React from 'react';

import classes from './Logo.css';
import LogoIcon from '../../assets/Images/127 burger-logo.png'

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={LogoIcon} alt='Burger'/>
    </div>
);

export default Logo;