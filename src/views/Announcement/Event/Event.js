import React from "react";
import { Row, Col, CardHeader, CardBody, Card } from "reactstrap";
import { Link } from "react-router-dom";
import AsyncTable from "components/bootstrap-table/AsyncTable";
import { unixTimeToJalali } from "lib/date/dateTime";

const Event = props => {
  const columns = [
    {
      dataField: "event_name",
      text: "عنوان"
    },
    {
      dataField: "created_at",
      text: " زمان ارسال",
      formatter: (cell, row) => unixTimeToJalali(row.date)
    },

    {
      dataField: "start_timestamp",
      text: "از تاریخ",
      formatter: (cell, row) => unixTimeToJalali(row.beginDate)
    },

    {
      dataField: "end_timestamp",
      text: "تا تاریخ",
      formatter: (cell, row) => unixTimeToJalali(row.endDate)
    },
    {
      dataField: "id",
      text: "ویرایش",
      formatter: (cell, row) => {
        return (
          <Link
            className="btn btn-warning mx-auto d-block"
            to={`/announcement/events/edit_event/${row["id"]}`}
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
              <Col>رویداد</Col>
              <Col className="text-left">
                <Link
                  to="/announcement/events/create_event"
                  className="btn btn-success"
                >
                  ایجاد رویداد
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <AsyncTable
              userMarketsFilter
              keyField="id"
              columns={columns}
              url="/events"
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Event;
