import React from 'react';

import classes from './Button.css';

const Button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.buttonType], classes[props.middle]].join(' ')}
        onClick={props.clicked}
    >
        {props.children}
    </button>
);

export default Button;