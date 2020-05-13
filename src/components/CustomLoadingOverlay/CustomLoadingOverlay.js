import LoadingOverlay from 'react-loading-overlay';
import { PulseLoader } from "react-spinners";
import React from "react";

export default function CustomLoadingOverlay({loading, ...props}) {
    return (
        <LoadingOverlay
            active={loading}
            spinner={<div className="w-100 d-flex justify-content-center align-items-center"><PulseLoader color="#ddd" /></div>}
            styles={{
                overlay: base => ({
                    ...base,
                    background: "rgba(255,255,255,0.5)"
                })
            }}
            {...props}
        >
            {props.children}
        </LoadingOverlay>
    )
}