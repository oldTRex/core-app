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
  CardBody
} from "reactstrap";
import LaddaButton from "components/laddaButton/LaddaButton";
import { useForm } from "hooks/useForm/useForm";
import FullLoadingOverlay from "components/CustomLoadingOverlay/FullLoadingOverlay";
import { post } from "lib/ajax/post";
import { changeJsonToFormData } from "lib/ajax/changeJsonToFormData";

export default function ApplicationSettings(props) {
  const changeSettings = async function() {
    console.log("form", form);
    await post(
      null,
      null,
      null,
      "/settings",
      changeJsonToFormData({ ...form, setting_type: "application" })
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
    "/settings?setting-type=application",
    data => {
      const newForm = {};
      data.data.forEach(({ option_name, option_value }, i) => {
        console.log("i", i);
        newForm[option_name] = option_value;
      });
      return newForm;
    }
  );
  return (
    <FullLoadingOverlay loading={initfetchloading} text="بارگذاری مقادیر اولیه">
      <Card>
        <CardHeader>تنظیمات اپلیکیشن</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs="12" className="mt-4">
                ارزش هر قدم{" "}
                <Input
                  className="d-inline-block w-25"
                  placeholder="ارزش هر قدم را وارد کنید"
                  type="number"
                  {...bind("STEP_VALUE")}
                />{" "}
                تومان
              </Col>
              <Col xs="12" className="mt-4">
                ضریب ارزش هر قدم (در روزهای بارانی و برفی)
                <Input
                  className="d-inline-block w-25"
                  placeholder="ضریب ارزش هر قدم"
                  {...bind("STEP_RATE_BY_HOUR")}
                />{" "}
                برابر
              </Col>
              <Col xs="12" className="mt-4">
                ضریب ارزش هر قدم بر اساس ساعت
                <Input
                  className="d-inline-block w-25"
                  placeholder="ضریب ارزش هر قدم"
                  {...bind("stepsValueTime")}
                />{" "}
                برابر
              </Col>

              <Col xs="12" className="mt-4">
                <FormGroup>
                  <Label>متن پیامک برای خرید موفقیت امیز</Label>
                  <Input
                    className="w-50"
                    type="textarea"
                    {...bind("SUCCESSFUL_ORDER_MESSAGE")}
                  />
                </FormGroup>
              </Col>

              <Col xs="12" className="mt-4">
                <FormGroup>
                  <Label>متن پیامک برای خرید ناموفق</Label>
                  <Input
                    className="w-50"
                    {...bind("UNSUCCESSFUL_ORDER_MESSAGE")}
                    type="textarea"
                    placeholder="متن را وارد کنید"
                  />
                </FormGroup>
              </Col>

              <Col xs="12" className="mt-4">
                <FormGroup>
                  <Label>متن پیامک برای ارسال کد کاربری</Label>
                  <Input
                    className="w-50"
                    {...bind("sendVerifyCode")}
                    type="textarea"
                    placeholder="متن را وارد کنید"
                  />
                </FormGroup>
              </Col>

              <Col xs="12" className="mt-4">
                هدف درامد روزانه
                <Input
                  className="d-inline-block w-25"
                  placeholder="هدف درامد روزانه را وارد کنید"
                  type="number"
                  {...bind("DAILY_GOAL_AMOUNT")}
                />{" "}
                تومان
              </Col>

              <Col xs="12" className="mt-4">
                جایزه تکمیل پروفایل{" "}
                <Input
                  className="d-inline-block w-25"
                  placeholder="جایزه تکمیل را وارد کنید"
                  type="number"
                  {...bind("PROFILE_COMPLETED_REWARD")}
                />{" "}
                تومان
              </Col>
              <Col xs="12" md="6" className=" mt-3">
                <LaddaButton loading={submitting} color="primary" type="submit">
                  اعمال تغیررات
                </LaddaButton>

                <Button className="ml-2" onClick={clear}>
                  لغو تغییرات
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </FullLoadingOverlay>
  );
}
