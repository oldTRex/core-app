import React from "react";
import LoadingOverlay from "react-loading-overlay";
import "./full.style.scss";

const FullLoadingOverlay = ({ loading,children, ...props }) => (
    <LoadingOverlay
        spinner
        active={loading}
        classNamePrefix="full"
       
        text='بارگذاری اطلاعات ...'
        {...props}
    >
        {children}
    </LoadingOverlay>
)


export default FullLoadingOverlay;