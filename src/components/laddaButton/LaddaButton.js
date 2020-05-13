import React from "react";
import { PulseLoader } from "react-spinners";
import { Button } from "reactstrap";
import classnames from 'classnames';
export default props => {
    const { children, loading, square, className, ...ohterProps } = props;
    return (
        <Button {...ohterProps} className={classnames({ [className]: className, 'btn-square': square })}>
            <div className={classnames({ 'invisible': loading })}>{children}</div>
            <div className={classnames("ladda-spinner-container", { 'invisible': !loading })}><PulseLoader color={'#ddd'} /></div>
        </Button>
    )
}