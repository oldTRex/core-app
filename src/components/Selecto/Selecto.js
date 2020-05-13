import { useState } from 'react';
import Select from 'react-select';
import React from 'react'



export default function Selecto(props) {


    const handleChange = function (e) {
        var perms = [];
        //e = props.value
        if (e) {
            e.forEach(element => {
                perms.push(Number(element.value))
            });
        }

        console.log(`Option selected:`, perms)
        console.log(props.callback(perms, e));
    };

    return (
        <>
            <Select
                isMulti
                name="perms"
                options={props.options}
                value={props.value}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
            />

        </>
    )

}