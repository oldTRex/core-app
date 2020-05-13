import React from "react";

import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

import CardHeader from "reactstrap/lib/CardHeader";
import CardBody from "reactstrap/lib/CardBody";
import Card from "reactstrap/lib/Card";
import { Row, Col } from "reactstrap";
import { Doughnut, Line } from "react-chartjs-2";
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import Widget02 from 'views/Widgets/Widget02';

import { tabdil } from 'lib/tabdil';
import CustomLoadingOverlay from "components/CustomLoadingOverlay/CustomLoadingOverlay";
import { useData } from "hooks/useData/useData";
import { useForm } from "hooks/useForm/useForm";
import SimpleSelect from "components/Form/SimpleSelect/SimpleSelect";
const line = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'تعداد کاربران',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
        },
    ],
};

const options = {
    tooltips: {
        enabled: false,
        custom: CustomTooltips
    },
    maintainAspectRatio: false
}
const doughnut = {
    labels: [
        'مرد',
        'زن',
    ],
    datasets: [
        {
            data: [80, 100],
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
            ],
        }],
};
// const selectOptions = [{ name: '1', label: 'سالیانه' }, { name: '2', label: 'هفتگی' }, { name: '3', label: 'روزانه' }]
const selectOptions = [{ name: '1', label: 'ماهانه' }, { name: '2', label: 'هفتگی' }]
const DashboardUsers = props => {
    const { form: timeFilter, bind } = useForm(null, null, {
        step: '2',
        membership: '2'
    })
    const [steps, , loading,] = useData(`get-statistics2?type=1&time_filter=${timeFilter.step}`);
    const [purchase, , loadingPurchase,] = useData(`get-statistics2?type=2`);
    const [membership, , loadingmembership,] = useData(`get-statistics2?type=3&time_filter=${timeFilter.membership}`);
    const [sex, , loadingsex,] = useData(`get-statistics2?type=4`);
    const [age, , loadingage,] = useData(`get-statistics2?type=5`);
    const [os, , loadingos,] = useData(`get-statistics2?type=6`);


    const [mapOptions, setMapOptions] = React.useState({
        center: [35.715298, 51.404343],
        zoom: 12,
    });
    React.useEffect(() => {
       
        if ("geolocation" in navigator) {
            console.log("Available");
            navigator.geolocation.getCurrentPosition(function (position) {
                console.log("Latitude is :", position.coords.latitude);
                console.log("Longitude is :", position.coords.longitude);
                setMapOptions({ center: [position.coords.latitude, position.coords.longitude] })
            });

        } else {
            console.log("Not Available");
        }
    } , []);

    return (
        <Row>
            <Col xs="12" md="6">
                <CustomLoadingOverlay loading={loading} text="بارگزاری اطلاعات">
                    <Card>
                        <CardHeader>
                            <div className="d-flex justify-content-between">
                                <span className="flex-grow-1">تعداد قدم ها</span>
                                <SimpleSelect className="w-50" options={selectOptions} {...bind('step')} />
                            </div>
                        </CardHeader>
                        <CardBody className="static-card-body">
                            {steps && <Line data={steps} options={options} />}
                        </CardBody>
                    </Card>
                </CustomLoadingOverlay>
            </Col>
            <Col xs="12" md="6">
                <CustomLoadingOverlay loading={loadingPurchase}>
                    <Card>
                        <CardHeader>
                            خرید های کاربران در سه حالت
                      </CardHeader>
                        <CardBody className="static-card-body">
                            {purchase && <Line data={purchase} options={options} />}
                        </CardBody>
                    </Card>
                </CustomLoadingOverlay>
            </Col>


            <Col xs="12" md="6">
                <CustomLoadingOverlay loading={loadingmembership}>
                    <Card>
                        <CardHeader>
                            <div className="d-flex justify-content-between">
                                <span className="flex-grow-1">عضویت کاربران</span>
                                <SimpleSelect className="w-50" options={selectOptions} {...bind('membership')} />
                            </div>
                        </CardHeader>
                        <CardBody className="static-card-body">
                            {membership && <Line data={membership} options={options} />}
                        </CardBody>
                    </Card>
                </CustomLoadingOverlay>
            </Col>

            <Col xs="12" md="6">
                <CustomLoadingOverlay loading={loadingsex}>
                    <Card>
                        <CardHeader>
                            جنسیت کاربران
                        </CardHeader>
                        <CardBody className="static-card-body">
                            <div className="chart-wrapper">
                                {sex && <Doughnut data={sex} />}
                            </div>
                        </CardBody>
                    </Card>
                </CustomLoadingOverlay>
            </Col>

            <Col xs="12" md="6">
                <CustomLoadingOverlay loading={loadingage}>
                    <Card>
                        <CardHeader>
                            سنی
                    </CardHeader>
                        <CardBody className="static-card-body">
                            <div className="chart-wrapper">
                                {age && <Doughnut data={age} />}
                            </div>
                        </CardBody>
                    </Card>
                </CustomLoadingOverlay>
            </Col>

            <Col xs="12" md="6">
                <CustomLoadingOverlay loading={loadingos}>
                    <Card>
                        <CardHeader>
                            سیستم عامل
                    </CardHeader>
                        <CardBody className="static-card-body">
                            <div className="chart-wrapper">
                                {os && <Doughnut data={os} />}
                            </div>
                        </CardBody>
                    </Card>
                </CustomLoadingOverlay>
            </Col>

            <Col xs="12" className="mt-4 mb-6 md-5" style={{ height: '500pt' }}>

                <LeafletMap
                    center={mapOptions.center}
                    zoom={mapOptions.zoom}
                    maxZoom={30}
                    attributionControl={true}
                    zoomControl={true}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                >
                    <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <Marker
                        position={mapOptions.center}

                    >
                        <Popup>
                            شما اینجا هستید
                      </Popup>
                    </Marker>
                </LeafletMap>
            </Col>
        </Row>

    )
}

export default DashboardUsers;
