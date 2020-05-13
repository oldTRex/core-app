import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import AsyncTable from 'components/bootstrap-table/AsyncTable';

const moment = require('jalali-moment');


const Customers = props => {
    const columns = [
        {
            dataField: 'first_name',
            remoteFilter: 'text',
            text: 'نام',

        },

        {
            dataField: 'last_name',
            remoteFilter: 'text',
            text: 'نام خانوادگی',

        },
        {
            dataField: 'amount',
            remoteFilter: 'min_max',
            text: 'مبلغ خرید',

        },

        {
            dataField: 'date',
            remoteFilter: 'rangeDatepicker',
            text: 'تاریخ',
            formatter: (cell, row) => {
                let jalaliDate = '';
                if (row.birthday !== '' && row.birthday) {
                    jalaliDate = moment(row['date']).locale('fa').format('YYYY/MM/DD');
                }
                return <div>{jalaliDate}</div>
            }
        },
        {
            dataField: 'commision',
            remoteFilter: 'min_max',
            text: 'کمیسیون واکی',
        },

    ]

    return (
        <Row>
            <Col xs="12">
                <Card>
                    <CardHeader>
                        اطلاعات مشتری ها
                    </CardHeader>
                    <CardBody>
                        <AsyncTable
                            columnFilter
                            keyField='id'
                            columns={columns}
                            url="/get-market-users"
                        />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Customers;
