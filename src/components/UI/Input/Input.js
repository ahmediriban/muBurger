import React from 'react';

import classes from './Input.css';

const Input=(props)=>{
    let inputElement = null;
    const classesArray = [classes.inputElement];
    console.log(props.invalid);
    if(props.invalid && props.validation && props.touched){
        classesArray.push(classes.inValid);
    }

    switch (props.elementType){
        case 'input':
            inputElement = <input
                className={classesArray.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}
            />;
            break;
        case 'textarea':
            inputElement = <textarea
                className={classesArray.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}
            />;
            break;
        case 'select':
            inputElement = <select
                className={classesArray.join(' ')}
                value={props.value}
                onChange={props.change}
            >
                {props.elementConfig.options.map(option=>(
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}
            </select>;
            break;
        default:
            inputElement = <input
                className={classesArray.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.change}
            />;
    }
    return(
        <div className={classes.input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;