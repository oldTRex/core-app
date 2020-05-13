import React from "react";
import {
  Row,
  Col,
  CardHeader,
  CardBody,
  Card,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from "reactstrap";
import { Link } from "react-router-dom";
import AsyncTable from "components/bootstrap-table/AsyncTable";
import { unixTimeToJalali } from "lib/date/dateTime";
import { remove } from "lib/ajax/delete";
import Barloader from "components/Loading/Barloader";

const Blog = props => {
  const tableRef = React.useRef(null);

  const [deleteLoading, setDeleteLoading] = React.useState(false);

  let columns = [
    {
      dataField: "title",
      text: "عنوان"
    },
    {
      dataField: "published_at",
      text: "تاریخ انتشار",
      formatter: (cell, row) => {
        return <div>{unixTimeToJalali(row.published_at)}</div>;
      }
    },
    {
      dataField: "slug",
      text: "",
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
                      `/announcement/blog/edit_blog/${row["title_slug"]}`
                    )
                  }
                >
                  <i className="fa fa-edit fa-lg"></i>ویرایش بلاگ{" "}
                </span>
              </DropdownItem>
              <DropdownItem>
                <span
                  className="d-flex align-items-center"
                  onClick={() => deleteBlogBySlug(row["title_slug"])}
                >
                  <i className="fa fa-remove fa-lg"></i>حذف بلاگ{" "}
                </span>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );
      }
    }
  ];

  const deleteBlogBySlug = function(slug) {
    setDeleteLoading(true);
    remove(null, null, () => setDeleteLoading(false), `/blogs/${slug}`);
  };

  return (
    <Row>
      <Col xs="12">
        <Barloader loading={deleteLoading} />
      </Col>
      <Col xs="12">
        <Card>
          <CardHeader>
            <Row className="justify-content-between">
              <Col>بلاگ ها</Col>
              <Col className="text-left">
                <Link
                  to="/announcement/blog/create_blog"
                  className="btn btn-success"
                >
                  ایجاد بلاگ
                </Link>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <AsyncTable
              ref={tableRef}
              keyField="id"
              columns={columns}
              url={"/blogs"}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Blog;
