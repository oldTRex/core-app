import React from "react";
import { Row, Col, CardHeader, CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";
import AsyncTable from "components/bootstrap-table/AsyncTable";
import { unixTimeToJalali } from "lib/date/dateTime";

const ManageSms = props => {
  const columns = [
    {
      dataField: "title",
      text: "عنوان"
    },
    {
      dataField: "date",
      text: " زمان ارسال",
      formatter: (cell, row) => unixTimeToJalali(row.date)
    },

    {
      dataField: "slug",
      text: "ویرایش",
      formatter: (cell, row) => {
        return (
          <Link
            className="btn btn-warning mx-auto d-block"
            to={`/announcement/sms/edit_sms/${row["slug"]}`}
          >
            ویرایش<i className="fa fa-edit fa-lg text-white mx-2"></i>
          </Link>
        );
      }
    },
    {
      dataField: "send",
      text: "ارسال شده به"
    }
  ];

  return (
    <Row>
      <Col xs="12">
        <Card>
          <CardHeader>
            <Row className="justify-content-between">
              <Col>مدیریت پیامک</Col>
              <Col className="text-left">
                <Link
                  to="/announcement/sms/create_sms"
                  className="btn btn-success"
                >
                  ایجاد پیامک
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <AsyncTable
              userMarketsFilter
              keyField="id"
              columns={columns}
              url="/get_sms"
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default ManageSms;
