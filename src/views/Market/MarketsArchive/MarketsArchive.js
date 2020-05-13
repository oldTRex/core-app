import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import AsyncTable from "components/bootstrap-table/AsyncTable";

const moment = require("jalali-moment");

const Markets = props => {
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      props.history.push("/market/edit/" + row["slug"]);
    }
  };

  const columns = [
    {
      dataField: "background_image",
      text: "لوگو",
      formatter: (cell, row) => {
        return (
          <img
            src={row["background_image"]}
            alt={row["market_name"]}
            className="img-avatar"
          />
        );
      }
    },

    {
      dataField: "id",
      remoteFilter: "text",
      text: "شناسه",
      notRender: true
    },
    {
      dataField: "market_name",
      remoteFilter: "text",
      text: "نام"
    },

    {
      dataField: "phone",
      remoteFilter: "text",
      text: "شماره تماس"
    },
    {
      dataField: "address",
      text: "ادرس"
    },
    {
      dataField: "barcode_number",
      text: "بارکد",
      remoteFilter: "text"
    },

    {
      dataField: "total_discount_percent",
      text: "درصد تخفیف",
      remoteFilter: "min_max"
    },

    {
      dataField: "rate",
      text: "rate",
      remoteFilter: "min_max",
      notRender: true
    }
    // {
    //     dataField: 'category',
    //      route:'/init'
    //     text: 'دسته بندی',
    //     remoteFilter: 'select',
    //     selectOptions:[
    //         {value:'رستوران', label:'1'}
    //     ],
    //     notRender: true,
    // },
  ];

  return (
    <Row>
      <Col xs="12">
        <Card>
          <CardHeader>اطلاعات مارکت ها</CardHeader>
          <CardBody>
            <AsyncTable
              columnFilter
              keyField="id"
              columns={columns}
              url="/get-markets"
              rowEvents={rowEvents}
              hover
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Markets;
