import React from "react";
import { Input, FormGroup, FormFeedback, Label, Row, Col } from "reactstrap";
import LaddaButton from "components/laddaButton/LaddaButton";
import { post } from "lib/ajax/post";
import { useForm } from "hooks/useForm/useForm";
import { isPhone } from "lib/validator/isPhone";
export default function Step1(props) {
  const { increaseStep, userInfo } = props;
  const validate = values => {
    let newError = {};
    if (!values.username) {
      newError.username = "شماره تلفن وارد شده اشتباه است!";
    }
    if (!isPhone(values.username)) {
      newError.username = "فرمت نام کاربری اشتباه است";
    }
    if (!values.password) {
      newError.password = "لطفا رمز عبور را وارد کنید!";
    }

    if (!values.repeatPassword) {
      newError.repeatPassword = "لطفا رمز عبور را تکرار کنید!";
    }

    if (values.repeatPassword !== values.password) {
      newError.repeatPassword = "رمز تکرار شده درست نمیباشد";
      newError.password = "رمز تکرار شده درست نمیباشد";
    }
    return newError;
  };
  const makeUser = async function() {
    const formData = new FormData();
    console.log("form", form);
    Object.entries(form).map(([key, value]) => formData.append(key, value));
    await post(increaseStep, null, null, "/auth/make-user", formData);
  };
  const {
    form,
    submitting,
    handleSubmit,
    bind,
    errors: error
  } = useForm(makeUser, validate, { ...userInfo });
  return (
    <Row className="justify-content-center">
      <Col xs="12">
        <h3 className="text-muted font-weight-normal">ارسال پیام</h3>
      </Col>
      <Col xs="12" md="6">
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>شماره تلفن</Label>

            <Input
              type="text"
              placeholder="شماره تلفن خود را وارد کنید"
              {...bind("username")}
            />
            <FormFeedback invalid>{error["username"]}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>رمز عبور</Label>
            <Input type="password" {...bind("password")} placeholder="پسورد" />
            <FormFeedback invalid>{error["password"]}</FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label>تکرار رمز عبور</Label>
            <Input
              type="password"
              {...bind("repeatPassword")}
              placeholder="تکرار پسورد"
            />
            <FormFeedback invalid>{error["repeatPassword"]}</FormFeedback>
          </FormGroup>

          <FormGroup className="mt-4">
            <hr />
            <LaddaButton
              loading={submitting}
              color="primary"
              type="submit"
              style={{ paddingRight: 20 }}
              square
            >
              مرحله بعد
            </LaddaButton>
          </FormGroup>
        </form>
      </Col>
    </Row>
  );
}
