import React from "react";
import {
  Row,
  Col,
  CardHeader,
  CardBody,
  Card,
  Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress
} from "reactstrap";
import { unixTimeToJalali } from "lib/date/dateTime";
import AsyncTable from "components/bootstrap-table/AsyncTable";

const AppComments = props => {
  // size per page is static and it is seven
  const columns = [
    {
      dataField: "username",
      text: "نام کاربری"
    },

    {
      dataField: "full_name",
      text: "نام و نام خانوادگی"
    },

    {
      dataField: "comment_brief",
      text: "کامنت"
    },
    {
      dataField: "confirmed",
      text: "وضعیت",
      formatter: (cell, row) => {
        return (
          <div>
            <div className="text-center">{row.confirmed}%</div>
            <Progress className="small-progress" value={row.confirmed} />
          </div>
        );
      }
    },
    {
      dataField: "id",
      text: "پاسخ/تعغیر",
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
                      `/support/app_comments/reply/${row["id"]}`
                    )
                  }
                >
                  <i className="fa fa-reply fa-lg"></i>پاسخ{" "}
                </span>
              </DropdownItem>
              <DropdownItem>
                <span
                  className="d-flex align-items-center"
                  onClick={() =>
                    props.history.push(
                      `/support/app_comments/edit/${row["id"]}`
                    )
                  }
                >
                  <i className="fa fa-edit fa-lg"></i>ویرایش{" "}
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
      formatter: (cell, row) => unixTimeToJalali(row.date)
    }
  ];

  return (
    <Row>
      <Col xs="12">
        <Card>
          <CardHeader>
            <Row className="justify-content-between">نظرات اپلیکیشن</Row>
          </CardHeader>
          <CardBody>
            <AsyncTable
              columns={columns}
              keyField="id"
              url="/comments?comment_type=application"
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AppComments;
