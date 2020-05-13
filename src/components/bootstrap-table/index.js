import React from "react";
import LoadingOverlay from 'react-loading-overlay';
import BootstrapTable from 'react-bootstrap-table-next';
import { PulseLoader } from "react-spinners";

const CustomTable = (props) => {
    console.log(props)
    const { loading = false, ...otherProps } = props;
    return (
        <LoadingOverlay
            active={loading}
            spinner={<div className="w-100 d-flex justify-content-center align-items-center"><PulseLoader color="gray" /></div>}
            styles={{
                overlay: base => ({
                    ...base,
                    background: "rgba(255,255,255,0.5)"
                })
            }}
        >
            <BootstrapTable
                bootstrap4
                noDataIndication={() => <div>موردی پیدا نشد!</div>}
                // responsive
                wrapperClasses="table-responsive"
                // classes="table"
                bordered={false}
                remote
                {...otherProps} />

        </LoadingOverlay>
    )

}


export default CustomTable;