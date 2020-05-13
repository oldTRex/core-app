import React from 'react';
import { Row, Col, Card, CardHeader, CardBody } from 'reactstrap';

import Widget02 from 'views/Widgets/Widget02';

import { tabdil } from 'lib/tabdil';
const Dashboard = props => {
    return (
        <Row>
            <Col xs="12" md="6">
                <Widget02 header={tabdil('100')} mainText="میزان فروش" icon="fa fa-ticket" color="info" variant="1" />
            </Col>

            <Col xs="12" md="6">
                <Widget02 header={tabdil('100')} mainText="مبلغ بدهکاری به واکی" icon="fa fa-ticket" color="info" variant="1" onClick={() => alert('should redirect to paying page')} buttonColor="success" buttonText="پرداخت"/>
            </Col>

            <Col xs="12" md="6">
                <Widget02 header={tabdil('100')} mainText="کمیسون واکی" icon="fa fa-ticket" color="info" variant="1" />
            </Col>

            <Col xs="12" md="6">
                <Widget02 header={tabdil('100')} mainText="بستانکاری از واکی" icon="fa fa-ticket" color="info" variant="1" />
            </Col>

            <Col xs="12" md="6">
                <Widget02 header={tabdil('100')} mainText="تعداد مشتریان" icon="fa fa-ticket" color="info" variant="1" />
            </Col>
        </Row>
    )
}

export default Dashboard;