import React from "react";

import { Input } from "reactstrap";
const SimpleSelect = ({ options, ...props }) => (
    <Input
        type="select"
        {...props}
    >
        {
           options && options.map(
                (option, index) => (
                    <option key={'select_option' + index} value={option.name || option.value}>{option.label}</option>
                )
            )
        }
    </Input>
)

export default SimpleSelect;