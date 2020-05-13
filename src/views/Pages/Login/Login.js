import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Row
} from "reactstrap";
import { userContext } from "contexts/user/user.context";
import { parseJwt } from "lib/parseJwt";
import LaddaButton from "components/laddaButton/LaddaButton";
import SimpleInput from "components/Form/SimpleInput/SimpleInput";
import { useForm } from "hooks/useForm/useForm";
import { post } from "lib/ajax/post";
import { changeJsonToFormData } from "lib/ajax/changeJsonToFormData";

const loginUrl = "/auth/login";

function Login(props) {
  const { setUser } = React.useContext(userContext);

  const validate = state => {
    const errors = {};
    if (state.username.trim() === "") {
      errors.username = "لطفا نام کاربری را وارد کنید!";
    }

    if (state.password.trim() === "") {
      errors.password = "لطفا رمز عبور را وارد کنید!";
    }
    return errors;
  };
  const login = async function() {
    const success = data => {
      const info = parseJwt(data.data.token);
      setUser({
        token: data.data.token,
        perms: data.data.perms,

        ...info
      });
      props.history.push("/");
    };
    await post(success, null, null, loginUrl, changeJsonToFormData(form));
  };
  const { form, bind, submitting, handleSubmit, errors: error } = useForm(
    login,
    validate,
    {
      username: "",
      password: ""
    }
  );

  return (
    <div className="app flex-column align-items-center">
      <a href="http://waki.ir/">
        <img
          src={require("assets/img/brand/Logo-Horizental-2.png")}
          className="d-block margin-x-auto logo-register"
        />
      </a>
      <Container className="mt-sm-5 mt-3">
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <h1>ورود</h1>
                    <p className="text-muted">ورود به حساب کاربری</p>

                    <SimpleInput
                      type="text"
                      {...bind("username")}
                      placeholder="نام کاربری"
                      autoComplete="username"
                    />
                    <SimpleInput
                      type="password"
                      placeholder="رمز عبور"
                      {...bind("password")}
                      autoComplete="current-password"
                    />

                    <Row>
                      <Col
                        xs="12"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <LaddaButton
                          color="primary"
                          loading={submitting}
                          type="submit"
                          className="mt-2"
                          block
                        >
                          ورود
                        </LaddaButton>
                      </Col>
                      <Col xs="12" className="d-md-none">
                        <Link
                          className="btn btn-block btn-success my-2"
                          to="/register"
                        >
                          ثبت نام
                        </Link>
                      </Col>
                      <Col
                        xs="12"
                        className="d-flex align-items-center justify-content-center"
                      >
                        <Button color="link">
                          رمز خود را فراموش کرده اید؟
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CardBody className="text-center">
                  <div>
                    <h2>ثبت نام</h2>
                    <p>مارکت خود را در واکی ثبت کنید</p>
                    <Link to="/register">
                      <Button
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        همین حالا ثبت نام کنید!
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
