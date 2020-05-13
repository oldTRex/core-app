import React, { useState } from "react";
import Chat from "components/Chat/PopupChat";
import Widget02 from 'views/Widgets/Widget02';
import { Col, Row, Badge, Card, CardBody, CardHeader } from "reactstrap";
import AsyncTable from 'components/bootstrap-table/AsyncTable';
import { Link } from "react-router-dom";
const moment = require('jalali-moment');
export default () => {
    const waitingColumns = [
        {
            dataField: 'type',
            text: 'کاربری'
        },
        // {
        //     dataField: 'id',
        //     text: 'چت',
        //     formatter: (cell, row) => {
        //         return <Chat name="soltan amir" url={`/chats/${row['id']}`} />
        //     }
        // },
        {
            dataField: 'name',
            text: 'تاریخچه',
        },
        {
            dataField: 'date',
            text: 'تاریخ انتشار',
            formatter: (cell, row) => {
                let jalaliDate = '';
                if (row.date !== '' && row.date) {
                    jalaliDate = moment(row['date']).locale('fa').format('YYYY/MM/DD');
                }
                return <div className="text-center">{jalaliDate}</div>
            }
        },


    ];

    const answeredColumns = [
        {
            dataField: 'type',
            text: 'کاربری'
        },
        {
            dataField: 'id',
            text: 'چت',
            formatter: (cell, row) => {
                return <Chat name="soltan amir" url={`/chats/${row['id']}`} />
            }
        },
        {
            dataField: 'date',
            text: 'تاریخ انتشار',
            formatter: (cell, row) => {
                let jalaliDate = '';
                if (row.date !== '' && row.date) {
                    jalaliDate = moment(row['date']).locale('fa').format('YYYY/MM/DD');
                }
                return <div className="text-center">{jalaliDate}</div>
            }
        },


    ];


    return (
        <div>
            <Row>
                <Col xs="12" md="6">
                    <Widget02 header="10" mainText="تعداد چت های پاسخ داده شده" icon="fa fa-ticket" color="success" variant="1" />
                </Col>

                <Col xs="12" md="6">
                    <Widget02 header="100" mainText="تعداد چت های منتظر پاسخ" icon="fa fa-ticket" color="primary" variant="1" />
                </Col>
                <Col xs="12">
                    <Card>
                        <CardHeader>
                            چت های منتظر پاسخ
                    </CardHeader>
                        <CardBody>
                            <AsyncTable
                                keyField="id"
                                columns={answeredColumns}
                                url="/get-chats"
                            />
                        </CardBody>
                    </Card>
                </Col>

                <Col xs="12">
                    <Card>
                        <CardHeader>
                            چت های پاسخ داده شده
                        </CardHeader>
                        <CardBody>
                            <AsyncTable
                                keyField="id"
                                columns={waitingColumns}
                                url="/get-waitingchats"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>



        </div>
    )
}