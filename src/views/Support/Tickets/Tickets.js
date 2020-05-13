import React from "react";
import Widget02 from "views/Widgets/Widget02";
import {
  Col,
  Row,
  Badge,
  Card,
  CardBody,
  CardHeader,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import AsyncTable from "components/bootstrap-table/AsyncTable";
import { Link } from "react-router-dom";
const moment = require("jalali-moment");

const Tickets = props => {
  const waitingColumns = [
    {
      dataField: "id",
      text: "شناسه",
      remoteFilter: "text"
    },
    {
      dataField: "ticket_title",
      text: "عنوان بخش"
    },
    {
      dataField: "severity",
      text: "اولویت",
      remoteFilter: "select",
      selectOptions: [
        { label: "پایین", name: "low" },
        { label: "فوری", name: "emergency" }
      ]
    },
    {
      dataField: "status",
      text: "وضعیت",
      formatter: (cell, row) => {
        return (
          <div className="text-center">
            <Badge color={getBadge(row["status"])}>{row["status"]}</Badge>
          </div>
        );
      },
      remoteFilter: "select",
      selectOptions: [
        { label: "case 1", name: "case 1" },
        { label: "case 2", name: "case 2" }
      ]
    },
    {
      dataField: "slug",
      text: "پاسخ/ویرایش",
      formatter: (cell, row) => {
        return (
          <UncontrolledDropdown direction="down">
            <DropdownToggle nav>
              <i className="fa fa-ellipsis-h fa-lg text-muted"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <span
                  className="d-flex align-items-center"
                  onClick={() =>
                    props.history.push(
                      `/support/site_comments/edit/${row["slug"]}`
                    )
                  }
                >
                  <i className="fa fa-edit fa-lg"></i>ویرایش
                </span>
              </DropdownItem>
              <DropdownItem>
                <span
                  className="d-flex align-items-center"
                  onClick={() =>
                    props.history.push(
                      `/support/site_comments/reply/${row["slug"]}`
                    )
                  }
                >
                  <i className="fa fa-remove fa-lg"></i>پاسخ
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      }
    },

    {
      dataField: "date",
      text: "تاریخ انتشار",
      formatter: (cell, row) => {
        let jalaliDate = "";
        if (row.date !== "" && row.date) {
          jalaliDate = moment(row["date"])
            .locale("fa")
            .format("YYYY/MM/DD");
        }
        return <div className="text-center">{jalaliDate}</div>;
      }
    }
  ];

  const answeredColumns = [
    {
      dataField: "id",
      text: "شناسه",
      remoteFilter: "text"
    },
    {
      dataField: "ticket_title",
      text: "عنوان بخش"
    },
    {
      dataField: "severity",
      text: "اولویت",
      remoteFilter: "select",
      selectOptions: [
        { label: "پایین", name: "low" },
        { label: "فوری", name: "emergency" }
      ]
    },
    {
      dataField: "status",
      text: "وضعیت",
      formatter: (cell, row) => {
        return (
          <div className="text-right">
            <Badge color={getBadge(row["status"])}>{row["status"]}</Badge>
          </div>
        );
      },
      remoteFilter: "select",
      selectOptions: [
        { label: "case 1", name: "case 1" },
        { label: "case 2", name: "case 2" }
      ]
    },
    {
      dataField: "date",
      text: "تاریخ انتشار",
      formatter: (cell, row) => {
        let jalaliDate = "";
        if (row.date !== "" && row.date) {
          jalaliDate = moment(row["date"])
            .locale("fa")
            .format("YYYY/MM/DD");
        }
        return <div className="text-center">{jalaliDate}</div>;
      }
    }
  ];

  const getBadge = function(status) {
    switch (status) {
      case "انجام شده":
        return "success";
      case "unconfirmed":
        return "warning";
    }
  };
  return (
    <Row>
      <Col xs="12" md="4">
        <Widget02
          header="1.999,50"
          mainText="تعداد تیکت هایه در حال بررسی"
          icon="fa fa-ticket"
          color="primary"
          variant="1"
        />
      </Col>

      <Col xs="12" md="4">
        <Widget02
          header="1.999,50"
          mainText="تعداد تیکت هایه پاسخ داده شده"
          icon="fa fa-ticket"
          color="info"
          variant="1"
        />
      </Col>

      <Col xs="12" md="4">
        <Widget02
          header="1.999,50"
          mainText="تعداد تیکت هایه منتظر پاسخ"
          icon="fa fa-ticket"
          color="warning"
          variant="1"
        />
      </Col>

      <Col xs="12" className="mt-5">
        <Card>
          <CardHeader>تیکت های در حال بررسی و منتظر بررسی</CardHeader>
          <CardBody>
            <AsyncTable columnFilter keyField="id" columns={waitingColumns} />
          </CardBody>
        </Card>
      </Col>

      <Col xs="12" className="mt-5">
        <Card>
          <CardHeader>تیکت های پاسخ داده شده</CardHeader>
          <CardBody>
            <AsyncTable
              columnFilter
              keyField="id"
              columns={answeredColumns}
              url="/tickets"
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Tickets;
