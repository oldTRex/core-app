import React from "react";
import CardHeader from "reactstrap/lib/CardHeader";
import CardBody from "reactstrap/lib/CardBody";
import Card from "reactstrap/lib/Card";
import { Row, Col } from "reactstrap";
import Widget02 from "views/Widgets/Widget02";

import { tabdil } from "lib/tabdil";
import { Doughnut, Line } from "react-chartjs-2";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";

const reports = [
  {
    col: "6", // it is between 1 till 12
    type: "widget",
    data: {
      header: 100,
      mainText: "درامد کل",
      icon: "fa fa-ticket",
      color: "info"
    }
  },
  {
    col: "6",
    type: "widget",
    data: {
      header: 100,
      mainText: "بدهکاری",
      icon: "fa fa-ticket", // font-awesome icon classname
      color: "info" // bootstrap colors like danger success and ...
    }
  },

  {
    col: "6",
    type: "doughnut",
    data: {
      header: "نمودار تفکیک جنسیت",
      labels: ["مرد", "زن"],
      datasets: [
        {
          data: [80, 100],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB"]
        }
      ]
    }
  },

  {
    col: "6",
    type: "line",
    data: {
      header: "هدر نمودار خطی",

      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "تعداد کاربران",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 40]
        }
      ]
    }
  }
];

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
};

const Reports = ({ header, url }) => {
  return (
    <Row>
      <Col xs="12">
        <h3 className="font-weight-light th my-4">{header}</h3>
      </Col>
      <Col xs="12">
        <Row>
          {reports &&
            reports.map(report => {
              switch (report.type) {
                case "widget":
                  return (
                    report.data && (
                      <Col xs="12" md={report.col}>
                        <Widget02
                          {...report.data}
                          header={tabdil(report.data.header)}
                          variant="1"
                        />
                      </Col>
                    )
                  );

                case "doughnut":
                  return (
                    report.data && (
                      <Col xs="12" md={report.col}>
                        <Card>
                          <CardHeader>{report.data.header}</CardHeader>
                          <CardBody className="static-card-body">
                            <div className="chart-wrapper">
                              {<Doughnut data={report.data} />}
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    )
                  );
                case "line":
                  return (
                    report.data && (
                      <Col xs="12" md={report.col}>
                        <Card>
                          <CardHeader>{report.data.header}</CardHeader>
                          <CardBody className="static-card-body">
                            <div className="chart-wrapper">
                              {<Line data={report.data} options={options} />}
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    )
                  );
              }
            })}
        </Row>
      </Col>
    </Row>
  );
};

export default Reports;
