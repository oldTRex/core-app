import React, { Component, Fragment } from 'react';

import Select from 'react-select';


export default function DropDownCompoent(props) {


    const handleChange = (e) => {
        var selectedOption;
        selectedOption = e.value;
        console.log(`Option selected:`, selectedOption)
        props.callback(selectedOption);
    }
    return (
        <Fragment>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={props.options[0]}
                isLoading={false}
                isClearable={false}
                isRtl={true}
                isSearchable={true}
                name="color"
                options={props.options}
                onChange={handleChange}
            />

        </Fragment>
    );

}
