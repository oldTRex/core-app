import React from "react";
import AsyncTable from "components/bootstrap-table/AsyncTable";
import {
  Button,
  Input,
  Row,
  Col,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  FormFeedback,
  Badge,
  Card,
  CardBody,
  CardHeader,
  CardFooter
} from "reactstrap";

import Axios from "axios";
import { toast } from "react-toastify";
import SimpleSelect from "components/Form/SimpleSelect/SimpleSelect";
import { useForm } from "hooks/useForm/useForm";
import LaddaButton from "components/laddaButton/LaddaButton";
import { post } from "lib/ajax/post";
import { remove } from "lib/ajax/delete";
import { DatePicker } from "react-advance-jalaali-datepicker";

const moment = require("jalali-moment");

const MarketInvoices = () => {
  const [modal, setModal] = React.useState(false);
  const [date, setDate] = React.useState({
    start: "",
    end: ""
  });

  const cancelInvoice = async function() {
    await remove(null, null, null, `/invoices/${selectedInvoice.factor_code}`);
  };

  const changeInvoice = async function() {
    console.log("selectedInvoice", selectedInvoice);
    await post("/start-pusher", {
      factor_code: selectedInvoice.factor_code,
      factor_amount: selectedInvoice.price,
      status_type: selectedInvoice.factor_status
    });
  };
  const {
    submitting,
    form: selectedInvoice,
    setForm: setSelectedInvoice,
    bind,
    handleSubmit
  } = useForm(changeInvoice, null, {});
  const totalInvoicesColumns = [
    {
      dataField: "status",
      text: "وضعیت",
      formatter: (cell, row) => {
        return (
          <div>
            <Badge color={getBadge(row["status"])}>{row["status"]}</Badge>
          </div>
        );
      }
    },
    {
      dataField: "today",
      text: "امروز"
    },

    {
      dataField: "this_week",
      text: "این هفته"
    },
    {
      dataField: "this_month",
      text: "این ماه"
    },

    {
      dataField: "this_year",
      text: "سال جاری"
    },

    {
      dataField: "all",
      text: "همه زمان ها"
    },

    {
      dateField: "start",
      headerFormatter: () => (
        <div className="datepicker-input">
          <DatePicker
            placeholder="انتخاب تاریخ شروع"
            format="jYYYY/jMM/jDD"
            onChange={unix => setDate(state => ({ ...state, start: unix }))}
          />
        </div>
      )
    },

    {
      dateField: "end",
      headerFormatter: () => (
        <div className="datepicker-input">
          <DatePicker
            placeholder="انتخاب تاریخ شروع"
            format="jYYYY/jMM/jDD"
            onChange={unix => setDate(state => ({ ...state, end: unix }))}
          />
        </div>
      )
    }
  ];

  const lastInvoicesColumns = [
    {
      dataField: "factor_status",
      text: "وضعیت سفارش",
      formatter: (cell, row) => {
        return (
          <div>
            <Badge color={getBadge(row["factor_status"])}>
              {row["factor_status"]}
            </Badge>
          </div>
        );
      },
      remoteFilter: "select",
      selectOptions: [
        { name: "all", label: "همه" },
        { name: "pending", label: "در حال انتظار" },
        { name: "confirmed", label: "تکمیل شده" }
      ]
    },

    {
      dataField: "factor_code",
      text: "شناسه سفارش",
      remoteFilter: "text"
    },

    {
      dataField: "price",
      text: "مبلغ سفارش",
      remoteFilter: "min_max"
    },

    {
      dataField: "full_name",
      text: "نام کاربر",
      remoteFilter: "text"
    },

    {
      dataField: "name",
      text: "نام مارکت",
      remoteFilter: "text"
    },
    {
      dataField: "payment_way",
      text: "شیوه پرداخت",
      remoteFilter: "text"
    },
    {
      dataField: "date",
      text: "زمان ایجاد",
      formatter: (cell, row) => {
        let jalaliDate = "";
        if (row.date !== "" && row.date) {
          jalaliDate = moment(row["date"])
            .locale("fa")
            .format("YYYY/MM/DD");
        }
        return <div>{jalaliDate}</div>;
      },
      remoteFilter: "rangeDatepicker"
    }
  ];

  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      setSelectedInvoice(row);
      console.log("selected invoice", row);
      toggle();
    }
  };
  const toggle = function() {
    setModal(!modal);
  };

  const getBadge = function(status) {
    switch (status.trim()) {
      case "confirmed":
        return "primary";
      case "ثبت شده":
        return "primary";

      case "paying":
        return "warning";
      case "در حال پرداخت":
        return "warning";

      case "pending":
        return "success";
      case "پرداخت شده":
        return "success";
      // case 'paid': return 'success';
    }
  };

  // const formIsOk = () => {
  //     let isValid = true;
  //     let newerror = {};
  //     if (selectedInvoice.name.trim() === '') {
  //         newerror.name = 'لطفا نام مارکت را وارد کنید!';
  //         isValid = false;
  //     }

  //     if (selectedInvoice.full_name.trim() === '') {
  //         newerror.full_name = 'لطفا نام را وارد کنید!';
  //         isValid = false;
  //     }
  //     if (selectedInvoice['phone'].trim() === '') {
  //         newerror['phone'] = 'لطفا شماره تلفن را وارد کنید!';
  //         isValid = false;
  //     }

  //     if (selectedInvoice.email.trim() === '') {
  //         newerror.email = 'لطفا ایمیل را وارد کنید!';
  //         isValid = false;
  //     }

  //     setError(newerror);

  //     return isValid;
  // }

  return (
    <Row>
      <Col xs="12">
        <Card>
          <CardHeader>مجموع سفارشات</CardHeader>

          <CardBody>
            <AsyncTable
              keyField="id"
              columns={totalInvoicesColumns}
              url={`/get-invoices?startDate=${date.start}&endDate=${date.end}`}
            />
          </CardBody>
        </Card>
      </Col>

      <Col xs="12">
        <Card>
          <CardHeader>اخرین سفارشات</CardHeader>

          <CardBody>
            <AsyncTable
              keyField="id"
              columns={lastInvoicesColumns}
              columnFilter
              url="/get-last-invoices"
              rowEvents={rowEvents}
              hover
            />
            {/* modal to change the invoice */}
            <Modal isOpen={modal} toggle={toggle} className={"change-invoice"}>
              <form onSubmit={handleSubmit}>
                <ModalHeader toggle={toggle}>اطلاعات صورت سفارش</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label>نام و نام خانوادگی</Label>
                    <Input
                      type="text"
                      placeholder="نام و نام خانوادگی را وارد کنید"
                      {...bind("full_name")}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>ایمیل</Label>
                    <Input
                      type="email"
                      placeholder="ایمیل را وارد کنید"
                      {...bind("email")}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>شماره تلفن</Label>
                    <Input
                      type="text"
                      placeholder="شماره تلفن را وارد کنید"
                      {...bind("phone")}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>نام فروشگاه</Label>
                    <Input
                      readonly="readonly"
                      type="text"
                      placeholder="نام فروشگاه را وارد کنید"
                      {...bind("name")}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>مبلغ سفارش (تومان)</Label>
                    <Input
                      type="number"
                      placeholder="مبلغ را وارد کنید"
                      {...bind("price")}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label>وضعیت سفارش</Label>
                    <SimpleSelect
                      options={[
                        { label: "تایید شده شده", name: "confirmed" },
                        { label: "درحال پرداخت", name: "pending" },
                        { label: "تکیمیل شده", name: "payed" }
                      ]}
                      placeholder="دسته بندی را وارد کنید"
                      {...bind("factor_status")}
                    />
                  </FormGroup>

                  {/* <FormGroup>
                                        <Label>کمیسیون واکی</Label>
                                        <Input readonly='readonly' type="number" name="commision"placeholder="کمیسیون واکی را وارد کنید" />
                                    </FormGroup> */}

                  <FormGroup>
                    <Label>شیوه پرداخت</Label>
                    <SimpleSelect
                      options={[
                        { label: "انلاین", name: "online" },
                        { label: "نقدی", name: "cash" }
                      ]}
                      {...bind("payment_way")}
                    />
                  </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button
                    style={{ marginLeft: 10, marginRight: 10 }}
                    color="danger"
                    onClick={cancelInvoice}
                  >
                    لغو سفارش
                  </Button>
                  <LaddaButton
                    className="ltr"
                    loading={submitting}
                    color="primary"
                    type="submit"
                  >
                    اعمال تعغیر
                  </LaddaButton>
                </ModalFooter>
              </form>
            </Modal>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default MarketInvoices;
