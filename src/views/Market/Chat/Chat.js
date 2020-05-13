import React, { useState } from "react";
import Chat from "components/Chat/PopupChat";
import Widget02 from 'views/Widgets/Widget02';
import { Col, Row, Badge, Card, CardBody, CardHeader } from "reactstrap";
import AsyncTable from 'components/bootstrap-table/AsyncTable';
import { Link } from "react-router-dom";
const moment = require('jalali-moment');
export default () => {
    const chats = [
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

    

    return (
        <div>
            <Row>
                <Col xs="12">
                    <Card>
                        <CardHeader>
                            پیام ها
                        </CardHeader>
                        <CardBody>
                            <AsyncTable
                                keyField="id"
                                columns={chats}
                                url="/get-chats"
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>



        </div>
    )
}