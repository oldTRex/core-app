import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import { Col, Row, Container, Card, CardBody, CardHeader } from "reactstrap";

import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";
import Step3 from "./Step3/Step3";
import Step4 from "./Step4/Step4";
import { Link } from "react-router-dom";
import { tabdil } from "lib/tabdil";
import classnames from "classnames";
import { useModal } from "hooks/useModal/useModal";
const Register = props => {
  const [step, setStep] = React.useState(4);
  const { modal: tooltipOpen, toggle } = useModal();

  const [userInfo, setUserInfo] = React.useState({
    username: "09193211519",
    password: "",
    repeatPassword: "",
    code: "1234",
    market_name: "amir markets",
    pictures: [],
    email: "jramir669@gmail.com",
    lat: 35.715298,
    lng: 51.404343,
    market_id: 1
  });

  const maxSteps = 4;
  const increaseStep = function() {
    if (step < maxSteps) {
      setStep(step + 1);
    } else {
      console.log("max steps excedde");
    }
  };

  const decreaseStep = function() {
    if (step > 1) {
      setStep(step - 1);
    } else {
      console.log("least steps excedde");
    }
  };

  const goToFirstStep = function() {
    setStep(1);
  };

  const getStep = function() {
    switch (step) {
      case 1:
        return (
          <Step1
            increaseStep={increaseStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        );
      case 2:
        return (
          <Step2
            increaseStep={increaseStep}
            decreaseStep={decreaseStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        );
      case 3:
        return (
          <Step3
            increaseStep={increaseStep}
            decreaseStep={decreaseStep}
            goToFirstStep={goToFirstStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        );
      case 4:
        return (
          <Step4
            increaseStep={increaseStep}
            decreaseStep={decreaseStep}
            goToFirstStep={goToFirstStep}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        );
    }
  };

  return (
    <React.Fragment>
      <a href="http://waki.ir/">
        <img
          src={require("assets/img/brand/Logo-Horizental-2.png")}
          className="d-block margin-x-auto logo-register"
        />
      </a>
      <div className="register-container">
        <Container>
          <Card>
            <CardHeader>
              <Col xs="12" md="9" className="w-75 margin-x-auto">
                <div className="d-flex justify-content-between align-items-center wizard-container">
                  <div className={classnames("wizard", { active: step > 0 })}>
                    <span className="fa fa-envelope fa-2x" />
                    <span className="wizard-text">
                      {tabdil("1")}.ارسال پیام
                    </span>
                    <i className="fa fa-chevron-left next-step-icon"></i>
                  </div>
                  <div className={classnames("wizard", { active: step > 1 })}>
                    <span className="fa fa-mobile-phone fa-2x" />
                    <span className="wizard-text">
                      {tabdil("2")}.احراز هویت
                    </span>
                    <i className="fa fa-chevron-left next-step-icon"></i>
                  </div>
                  <div className={classnames("wizard", { active: step > 2 })}>
                    <span className="fa fa-shopping-cart fa-2x" />
                    <span className="wizard-text">{tabdil("3")}.پروفایل</span>
                    <i className="fa fa-chevron-left next-step-icon"></i>
                  </div>
                  <div className={classnames("wizard", { active: step > 3 })}>
                    <span className="fa fa-cog fa-2x" />
                    <span className="wizard-text">{tabdil("4")}.تنظیمات</span>
                  </div>
                </div>
              </Col>
            </CardHeader>
            <CardBody className="p-5">{getStep()}</CardBody>
          </Card>
        </Container>

        <Link
          className="btn btn-info fab-home circle"
          to="/login"
          id="link-login"
        >
          <i className="fa fa-arrow-left fa-2x"></i>
        </Link>
        <Tooltip
          placement="right"
          isOpen={tooltipOpen}
          target="link-login"
          toggle={toggle}
        >
          رفتن به صفحه ورود
        </Tooltip>
      </div>
    </React.Fragment>
  );
};

export default Register;
