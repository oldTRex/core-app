import React from "react";
import {
  Form,
  FormGroup,
  Button,
  Input,
  Row,
  Col,
  Label,
  Card,
  CardHeader,
  CardBody,
  ListGroupItem,
  ListGroup
} from "reactstrap";
import LaddaButton from "components/laddaButton/LaddaButton";
import Select from "react-select";
import Axios from "axios";
import CustomLoadingOverlay from "components/CustomLoadingOverlay/CustomLoadingOverlay";
import { useForm } from "hooks/useForm/useForm";
import FullLoadingOverlay from "components/CustomLoadingOverlay/FullLoadingOverlay";
import { useData } from "hooks/useData/useData";
import { post } from "lib/ajax/post";
import CustomTable from "components/bootstrap-table";
import { changeJsonToFormData } from "lib/ajax/changeJsonToFormData";

export default function MarketsSettings(props) {
  const changeSettings = async function(e) {
    console.log("form in change settings", form);
    await post(
      null,
      null,
      null,
      "/settings",
      changeJsonToFormData({ ...form, setting_type: "market" })
    );
  };
  const {
    form,
    submitting,
    handleSubmit,
    bind,
    clear,
    initfetchloading
  } = useForm(
    changeSettings,
    null,
    {},
    "/settings?setting_type=market",
    data => {
      const newForm = {};
      data.data.forEach(({ option_name, option_value }, i) => {
        console.log("i", i);
        newForm[option_name] = option_value;
      });
      return newForm;
    }
  );

  const [businessType, setBusinessType, isLoading] = useData(
    "/init",
    data => data.businesses,
    []
  );
  const [ActiveBussinessType, setActiveBussinessType] = React.useState({});
  const [
    features,
    setFeatures,
    fetchFeaturesLoading,
    setFeaturesLoading
  ] = useData(
    `/init/${ActiveBussinessType.value}`,
    data => data.businesses,
    {}
  );

  const [newFeature, setNewFeature] = React.useState("");

  const columns = [
    {
      dataField: "label",
      text: "دسته بندی"
    },

    {
      dataField: "commision",
      text: "درصد کمیسیون کسر شده",
      formatter: (cell, row) => {
        return (
          <Input
            type="number"
            {...bind("WAKI_COMMISSION_" + row.value)}
            min="1"
          />
        );
      }
    },

    {
      dataField: "minDebt",
      text: "حد اولیه بدهکاری",
      formatter: (cell, row) => {
        return (
          <Input type="number" {...bind("MINIMUM_DEBT_" + row.value)} min="1" />
        );
      }
    },

    {
      dataField: "maxDebt",
      text: "سقف اولیه بدهکاری",
      formatter: (cell, row) => {
        return (
          <Input type="number" {...bind("MAXIMUM_DEBT_" + row.value)} min="1" />
        );
      }
    },

    {
      dataField: "MINIMUM_DISCOUNT_",
      text: "حد اولیه تخفیف",
      formatter: (cell, row) => {
        return (
          <Input
            type="number"
            {...bind("MINIMUM_DISCOUNT_" + row.value)}
            min="1"
          />
        );
      }
    }
  ];

  const data = businessType.map((b, i) => ({
    ...b,
    commision: "",
    minDebt: "",
    maxDebt: "",
    minDiscount: "",
    id: i
  }));

  const deleteFeature = function(name) {
    setFeaturesLoading(true);
    Axios.delete(`/init/${name}`)
      .then(({ data }) => {
        if (data.status) {
          // setBusinessType(data.businesses)
          setFeatures(data.facilities);
        }
      })
      .finally(() => setFeaturesLoading(false));
  };
  const createFeature = function() {
    setFeaturesLoading(true);
    const fd = new FormData();
    fd.append("feature", newFeature);
    Axios.post(`/route for changing features`, fd)
      .then(({ data }) => {
        if (data.status) {
          // setBusinessType(data.businesses)
          setFeatures(data.facilities);
        }
      })
      .finally(() => setFeaturesLoading(false));
  };

  return (
    <FullLoadingOverlay loading={initfetchloading}>
      <Card>
        <CardHeader>تنظیمات مارکت ها</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs="12" className="my-5">
                <CustomLoadingOverlay loading={isLoading}>
                  <CustomTable columns={columns} data={data} keyField="id" />
                </CustomLoadingOverlay>
              </Col>

              <Col xs="12" className="my-5">
                <Row>
                  <Col xs="12" md="2">
                    <p>ویژگی های دسته</p>
                  </Col>
                  <Col xs="12" md="5">
                    <Select
                      onChange={data => {
                        setActiveBussinessType(data);
                      }}
                      options={businessType}
                      isLoading={isLoading}
                      placeholder="دسته بندی را وارد کنید"
                      isSearchable={false}
                      isRtl
                    />
                    <ListGroup flush className="pr-0 mt-3">
                      <CustomLoadingOverlay loading={fetchFeaturesLoading}>
                        {features &&
                          features.length &&
                          features.map(({ id, label }, key) => (
                            <ListGroupItem className="d-flex" key={id}>
                              <p className="flex-grow-1">{label}</p>
                              <span
                                className="cui-delete icons font-2xl cursor-pointer"
                                onClick={() => deleteFeature(id)}
                              ></span>
                            </ListGroupItem>
                          ))}
                      </CustomLoadingOverlay>
                    </ListGroup>
                  </Col>
                  <Col xs="12" md="5">
                    <Row>
                      <Col xs="7">
                        <Input
                          type="text"
                          onChange={e => setNewFeature(e.target.value)}
                          placeholder="ویژگی جدید را وارد کنید"
                        />
                      </Col>
                      <Col xs="5">
                        <Button color="success" onClick={createFeature}>
                          ایجاد ویژگی{" "}
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>

              <Col xs="12" className="mt-4">
                <FormGroup>
                  <Label>متن پیامک برای ارسال کد فعال سازی</Label>
                  <Input
                    className="w-50"
                    type="textarea"
                    placeholder="متن را وارد کنید"
                    {...bind("CONFIRM_CODE_MESSAGE")}
                  />
                </FormGroup>
              </Col>

              <Col xs="12" className="mt-4">
                <FormGroup>
                  <Label>متن پیامک برای خرید موفقیت امیز</Label>
                  <Input
                    className="w-50"
                    type="textarea"
                    placeholder="متن را وارد کنید"
                    {...bind("SUCCESSFUL_ORDER_MESSAGE")}
                  />
                </FormGroup>
              </Col>

              <Col xs="12" className="mt-4">
                <FormGroup>
                  <Label>متن پیامک برای خرید ناموفقیت </Label>
                  <Input
                    className="w-50"
                    type="textarea"
                    placeholder="متن را وارد کنید"
                    {...bind("UNSUCCESSFUL_ORDER_MESSAGE")}
                  />
                </FormGroup>
              </Col>

              <Col xs="12" className="mt-4">
                <FormGroup>
                  <Label>متن پیامک برای ثبت صدور فاکتور</Label>
                  <Input
                    className="w-50"
                    type="textarea"
                    placeholder="متن را وارد کنید"
                    {...bind("SUBMIT_ORDER_MESSAGE")}
                  />
                </FormGroup>
              </Col>

              <Col xs="12" className="mt-4">
                <FormGroup>
                  <Label>متن پیامک برای حد اولیه بدهکاری</Label>
                  <Input
                    className="w-50"
                    type="textarea"
                    placeholder="متن را وارد کنید"
                    {...bind("MINIMUM_DEBT_MESSAGE")}
                  />
                </FormGroup>
              </Col>

              <Col xs="12" className="mt-4">
                <FormGroup>
                  <Label>متن پیامک برای سقف بدهکاری</Label>
                  <Input
                    className="w-50"
                    type="textarea"
                    placeholder="متن را وارد کنید"
                    {...bind("MAXIMUM_DEBT_MESSAGE")}
                  />
                </FormGroup>
              </Col>

              <Col xs="12" md="6" className=" mt-3">
                <LaddaButton
                  loading={submitting}
                  color="primary"
                  type="submit"
                  className="ml-3"
                >
                  اعمال تغیررات
                </LaddaButton>

                <Button className="ml-2" onClick={clear}>
                  خالی کردن همه فیلدها
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </FullLoadingOverlay>
  );
}
