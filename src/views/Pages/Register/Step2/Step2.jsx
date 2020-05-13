import React from "react";
import {
  Button,
  Input,
  Label,
  FormGroup,
  FormFeedback,
  Row,
  Col
} from "reactstrap";
import LaddaButton from "components/laddaButton/LaddaButton";
import { post } from "lib/ajax/post";
import { useForm } from "hooks/useForm/useForm";
import { changeJsonToFormData } from "lib/ajax/changeJsonToFormData";

export default function Step2(props) {
  const { increaseStep, decreaseStep } = props;
  const validate = values => {
    const error = {};
    if (!values.code) {
      error.code = "رمز را وارد کنید";
    }
    return error;
  };
  const verifyUser = async function() {
    console.log("form", form);
    await post(
      increaseStep,
      null,
      null,
      "/auth/verify-user",
      changeJsonToFormData(form)
    );
  };
  const { form, submitting, handleSubmit, bind, errors: error } = useForm(
    verifyUser,
    validate
  );

  return (
    <Row className="justify-content-center">
      <Col xs="12">
        <h3 className="text-muted font-weight-normal">تایید رمز ارسال شده</h3>
      </Col>
      <Col xs="12" md="6">
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="password"
              {...bind("code")}
              placeholder="کد ارسال شده را وارد کنید"
              autoComplete="new-password"
            />
            <FormFeedback invalid>{error["code"]}</FormFeedback>
            <FormGroup className="mt-4">
              <hr />
              <LaddaButton
                loading={submitting}
                color="primary"
                type="submit"
                type="submit"
                square
              >
                مرحله بعد
              </LaddaButton>
              <LaddaButton className="ml-3" onClick={decreaseStep} square>
                مرحله قبل
              </LaddaButton>
            </FormGroup>
          </FormGroup>
        </form>
      </Col>
    </Row>
  );
}
