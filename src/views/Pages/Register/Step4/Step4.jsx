import React from "react";
import {
  Button,
  FormGroup,
  Input,
  Row,
  Col,
} from "reactstrap";
import Select from "react-select";
import LaddaButton from "components/laddaButton/LaddaButton";
import { toast } from "react-toastify";
import { useData } from "hooks/useData/useData";
import { useForm } from "hooks/useForm/useForm";
import { post } from "lib/ajax/post";
import SimpleSelect from "components/Form/SimpleSelect/SimpleSelect";
import CustomTable from "components/bootstrap-table";
import { changeJsonToFormData } from "lib/ajax/changeJsonToFormData";

// Tehran, Iran Latitude and longitude coordinates are: 35.715298, 51.404343

const weekDays = [
  { name: "staurday", label: "شنبه" },
  { name: "sunday", label: "یکشنبه" },
  { name: "monday", label: "دوشنبه" },
  { name: "tuesday", label: "سه شنبه" },
  { name: "Wednesday", label: "چهارشنبه" },
  { name: "thursday", label: "پنجشنبه" },
  { name: "friday", label: "جمعه" }
];
export default function Step4(props) {
  const { decreaseStep, userInfo } = props;
  const [{ businesses, facilities }, , loading] = useData(
    "/init",
    data => data,
    {}
  );
  const setSettings = async function() {
    console.log("form", form);
    await post(null, null, null, "/auth/verify-market", changeJsonToFormData(form));
  };
  const validate = values => {
    let newerror = {};
    if (!values.business_type) {
      newerror.category = "لطفا دسته بندی را انتخاب کنید";
    }

    if (!values.facs) {
      newerror.features = "لطفا ویژگی ها را پر کنید";
    }

    if (!values["discount"]) {
      newerror["discount"] = "لطفا میزان تخفیف را وارد کنید";
    }
    return newerror;
  };
  const {
    form,
    setForm,
    submitting,
    handleSubmit,
    bind,
    errors: error
  } = useForm(setSettings, validate, {
    ...userInfo,
    weeksDay: [],
    day: "saturday"
  });

  const addTime = () => {
    if (!form.start && !form.end) {
      toast.error("لطفا همه فیلد ها را پر کنید");
      return;
    }
    setForm(state => ({
      ...state,
      weeksDay: [
        ...state.weeksDay,
        {
          day: state.day,
          start: state.start,
          end: state.end
        }
      ],
      start: "",
      end: ""
    }));
  };

  const deleteTime = index => {
    let { weeksDay } = form;
    weeksDay.splice(index - 1, 1);
    setForm(state => ({
      ...state,
      weeksDay
    }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-muted font-weight-normal">تنظیمات</h3>
      <Row className="align-items-center mb-4">
        <Col xs="12" className="mt-4">
          <p>دسته بندی</p>
          <Select
            isLoading={loading}
            onChange={({ label, value }) => {
              setForm(state => ({
                ...state,
                business_type: value
              }));
            }}
            options={businesses}
            placeholder="دسته بندی را وارد کنید"
            isSearchable={false}
            isRtl
          />
          {error.category && (
            <p className="invalid-feedback d-block">{error.category}</p>
          )}
        </Col>
        <Col xs="12" className="mt-4">
          <p>ویژگی ها</p>
          <Select
            isLoading={loading}
            onChange={args => {
              // now problem is facilities dont have value property
              console.log("args", args);
              if (!Array.isArray(args)) {
                setForm(state => ({ ...state, facilities: [] }));
                return;
              }
              const array = [];
              args.forEach(arg => array.push(arg.value));

              setForm(state => ({
                ...state,
                facilities: array
              }));
            }}
            options={facilities}
            placeholder="ویژگی ها را وارد کنید"
            isSearchable={false}
            isRtl
            isMulti
          />
          {error.features && (
            <p className="invalid-feedback d-block">{error.features}</p>
          )}
        </Col>

        <Col xs="12">
          <p className="mt-4">ساعت اریه خدمات از طریق واکی</p>
          <Row className="justify-content-between">
            <Col xs="12" md="2">
              <SimpleSelect options={weekDays} {...bind("day")} />
            </Col>
            <Col xs="12" md="6">
              <FormGroup>
                <Row>
                  <Col className="d-flex">
                    <span className="m-2">از</span>
                    <Input type="time" {...bind("start")} />
                  </Col>
                  <Col className="d-flex">
                    <span className="m-2">تا</span>
                    <Input type="time" {...bind("end")} />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs="12" md="2">
              <LaddaButton onClick={addTime} color="success" square>
                اضافه کردن
              </LaddaButton>
            </Col>

            <Col xs="12" className="mt-3">
              {Boolean(form.weeksDay.length) && (
                <CustomTable
                  columns={[
                    {
                      dataField: "day",
                      text: "روز هفته"
                    },

                    {
                      dataField: "start",
                      text: "از ساعت"
                    },
                    {
                      dataField: "end",
                      text: "تا"
                    }
                  ]}
                  data={form.weeksDay}
                  keyField="id"
                  hover
                  rowEvents={{
                    onClick: (e, row, index) => {
                      deleteTime(index);
                    }
                  }}
                />
              )}
            </Col>
          </Row>
        </Col>

        <Col xs="12" className="mt-4">
          <p>میزان تخفیف</p>

          <Input
            type="number"
            placeholder="میزان تخفیف را وارد کنید"
            min="1"
            {...bind("discount")}
          />
          {error.discount && (
            <p className="invalid-feedback d-block">{error.discount}</p>
          )}
        </Col>
      </Row>
      <div className="mt-4">
        <hr />
        <LaddaButton
          loading={submitting}
          color="primary"
          type="submit"
          type="submit"
        >
          اتمام
        </LaddaButton>
        <Button className="ml-3" onClick={decreaseStep}>
          مرحله قبل
        </Button>
      </div>
    </form>
  );
}
