import React from 'react';
import classnames from 'classnames';
import "./style.scss";

const SimpleInput = ({ className, ...props }) => (
    <div className="position-relative">
        <input className={classnames("simple-input", {
            [className]: className
        })} {...props} />
        {props.invalid && <i className="fa fa-times fa-lg invalid-icon"></i>}
        {props.invalid && <p className="text-danger">{props.invalid}</p>}

    </div>
)
export default SimpleInput;