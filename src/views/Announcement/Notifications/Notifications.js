import React from "react";
import { Row, Col, CardHeader, CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";
import AsyncTable from "components/bootstrap-table/AsyncTable";
import { unixTimeToJalali } from "lib/date/dateTime";

const Notifications = props => {
  const columns = [
    {
      dataField: "title",
      text: "عنوان"
    },
    {
      dataField: "publish_date",
      text: "تاریخ انتشار",
      formatter: (cell, row) => unixTimeToJalali(row.publish_date)
    },
    {
      dataField: "sent_day",
      text: "تاریخ انتشار",
      formatter: (cell, row) => unixTimeToJalali(row.sent_day)
    },
    {
      dataField: "slug",
      text: "ویرایش",
      formatter: (cell, row) => {
        return (
          <Link
            className="btn btn-warning mx-auto d-block"
            to={`/announcement/blog/edit_blog/${row["slug"]}`}
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
              <Col>نوتیفیکیشن ها</Col>
              <Col className="text-left">
                <Link
                  to="/announcement/notifications/create_notif"
                  className="btn btn-success"
                >
                  ایجاد نوتیفیکیشن
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <AsyncTable
              userMarketsFilter
              keyField="id"
              columns={columns}
              url="/notifications"
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Notifications;
