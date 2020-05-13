import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Progress } from 'reactstrap';
import AsyncTable from 'components/bootstrap-table/AsyncTable';

const moment = require('jalali-moment');


const Users = props => {
    const columns = [
        {
            dataField: 'image',
            text: 'عکس',
            formatter: (cell, row) => (
                <img className="img-avatar" width="50px" height="50px" src={row.image} />
            )

        },
        {
            dataField: 'username',
            remoteFilter: 'text',
            text: 'شناسه',

        },

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
            dataField: 'phone',
            remoteFilter: 'text',
            text: 'شماره تماس',

        },



        {
            dataField: 'city',
            remoteFilter: 'text',
            text: 'شهر',
        },

        {
            dataField: 'birthday',
            remoteFilter: 'rangeDatepicker',
            text: 'تاریخ تولد',
            formatter: (cell, row) => {
                let jalaliDate = '';
                if (row.birthday !== '' && row.birthday) {
                    jalaliDate = moment(row['date']).locale('fa').format('YYYY/MM/DD');
                }
                return <div>{jalaliDate}</div>
            }
        },

        {
            dataField: 'gender',
            remoteFilter: 'select',
            selectOptions: [
                { label: 'مرد', name: 'male' },
                { label: 'زن', name: 'female' },
            ],
            text: 'جنسیت',
        },

        {
            dataField: 'steps',
            remoteFilter: 'min_max',
            text: 'قدم',
        },
        {
            dataField: 'height',
            remoteFilter: 'min_max',
            text: 'قد',
        },
        {
            dataField: 'weight',
            remoteFilter: 'min_max',
            text: 'وزن',
        },

        {
            dataField: 'verify_percent',
            remoteFilter: 'text',
            text: 'وضعیت تایید',
            formatter: (cell, row) => {
                return <div>
                    <div className="text-center">{row.verify_percent}%</div>
                    <Progress className="small-progress" value={row.verify_percent} />
                </div>
            }
        },

        {
            dataField: 'role',
            remoteFilter: 'text',
            text: 'نقش',
        },

        {
            dataField: 'invite_code',
            remoteFilter: 'text',
            text: 'کد معرف',
        },

        {
            dataField: 'register',
            remoteFilter: 'rangeDatepicker',
            text: 'تاریخ عضویت',
            formatter: (cell, row) => {
                let jalaliDate = '';
                if (row.birthday !== '' && row.birthday) {
                    jalaliDate = moment(row['date']).locale('fa').format('YYYY/MM/DD');
                }
                return <div>{jalaliDate}</div>
            }
        },

    ]


    const getBadge = function (status) {
        switch (status) {
            case 'confirmed': return 'success';
            case 'ready': return 'success';
            case 'unconfirmed': return 'warning';
            case 'paying': return 'warning';
            case 'pending': return 'danger';
            case 'cancelled': return 'danger';
            case 'paid': return 'danger';
        }
    }

    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            props.history.push(`/users/users_information/${row.slug}`)
        }
    }

    return (
        <Row>
            <Col xs="12">
                <Card>
                    <CardHeader>
                        اطلاعات کاربران
                    </CardHeader>
                    <CardBody>
                        <AsyncTable
                            columnFilter
                            keyField='id'
                            columns={columns}
                            url="/users"
                            hover
                            rowEvents={rowEvents}
                        />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )
}

export default Users;
