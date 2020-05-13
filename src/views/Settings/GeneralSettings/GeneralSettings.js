import React from "react";
import CardBody from "reactstrap/lib/CardBody";
import CardHeader from "reactstrap/lib/CardHeader";
import Card from "reactstrap/lib/Card";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
import { Link } from "react-router-dom";
import AsyncTable from "components/bootstrap-table/AsyncTable";
import { map } from "leaflet";
import EditRole from "./EditRole";

const GenralSettings = () => {
  // we have two part one is make role and second is make manager

  const roleColumns = [
    {
      dataField: "display_name",
      text: "عنوان"
    },
    {
      dataField: "perms",
      text: "میزان دسترسی",
      formatter: (cell, row) => {

        // return JSON.stringify(row["perms"] )  +  '-';
        return row['perms'].map(perm => <li>{perm.name}</li>)
      }
    },

    {
      dataField: "operation",
      text: "عملیات",
      formatter: (cell, row) => {

        return (
          <Link
            className="btn btn-warning mx-auto"
            to={{
              pathname: `/settings/general/edit_role/${row["name"]}`,

            }}

          >
            ویرایش<i className="fa fa-edit fa-lg text-white mx-2"></i>
          </Link>
        );
      }
    }
  ];
  const managerColumns = [
    {
      dataField: "full_name",
      text: "نام و نام خانوادگی"
    },
    {
      dataField: "role",
      text: "نقش",

    },

    {
      dataField: "username",
      text: "نام کاربری"
    },

    {
      dataField: "phone",
      text: "موبایل"
    },

    {
      dataField: "id",
      text: "ویرایش",
      formatter: (cell, row) => {
        return (
          <Link
            className="btn btn-warning mx-auto"
            to={`/settings/general/edit_manager/${row["username"]}`}
          >
            ویرایش<i className="fa fa-edit fa-lg text-white mx-2"></i>
          </Link>
        );
      }
    },

  ];
  return (
    <Row>
      <Col xs="12">
        <Card>
          <CardHeader>
            <Row className="justify-content-between">
              <Col>تعیین نقش</Col>
              <Col className="text-left">
                <Link
                  to="/settings/general/create_role"
                  className="btn btn-success"
                >
                  ایجاد نقش
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <AsyncTable keyField="id" columns={roleColumns} url="/roles" />
          </CardBody>
        </Card>
      </Col>
      <Col xs="12" className="mt-5">
        <Card>
          <CardHeader>
            <Row className="justify-content-between">
              <Col>تعیین کاربر</Col>
              <Col className="text-left">
                <Link
                  to="/settings/general/create_manager"
                  className="btn btn-success"
                >
                  ایجاد کاربر
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <AsyncTable keyField="id" columns={managerColumns} url="/users" />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default GenralSettings;
