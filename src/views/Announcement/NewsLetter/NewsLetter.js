import React from "react";
import {
    Row, Col, CardHeader, CardBody, Card,
} from "reactstrap";
import { Link } from "react-router-dom";
import AsyncTable from "components/bootstrap-table/AsyncTable";
import Label from "reactstrap/lib/Label";
import Input from "reactstrap/lib/Input";
import FormGroup from "reactstrap/lib/FormGroup";
import Form from "reactstrap/lib/Form";
import Button from "reactstrap/lib/Button";

const moment = require('jalali-moment');

const NewsLetter = props => {
    const columns = [
        {
            dataField: 'title',
            text: 'عنوان'
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
        {
            dataField: 'id',
            text: 'ویرایش',
            formatter: (cell, row) => {
                return <Link className="btn btn-warning mx-auto" to={`/announcement/newsletter/edit_news/${row['id']}`}>ویرایش<i className="fa fa-edit fa-lg text-white mx-2"></i></Link>
            }
        },
        {
            dataField: 'send',
            text: 'ارسال شده به',
        }


    ];


    return (
        <Row>
            <Col xs="12">
                <Card>
                    <CardHeader>
                        <Row className="justify-content-between">
                            <Col>خبرنامه</Col>
                            <Col className="text-left">
                                <Link to="/announcement/newsletter/create_news" className="btn btn-success">ایجاد خبرنامه</Link>
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <AsyncTable
                            keyField='id'
                            userMarketsFilter
                            columns={columns}
                            url="/newsletter"
                        />
                    </CardBody>
                </Card>
            </Col>
        </Row>
    )

}

export default NewsLetter;