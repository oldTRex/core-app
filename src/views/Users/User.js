import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Label, Input, CardFooter } from 'reactstrap';
import { useForm } from 'hooks/useForm/useForm';
import Axios from 'axios';
import { toast } from 'react-toastify';
import CustomLoadingOverlay from 'components/CustomLoadingOverlay/CustomLoadingOverlay';
import LaddaButton from 'components/laddaButton/LaddaButton';
import { post } from 'lib/ajax/post';
import FullLoadingOverlay from 'components/CustomLoadingOverlay/FullLoadingOverlay';


const User = props => {
  const slug = props.match.params.slug;
  const onSubmit = async () => {
    await post(null, null, null, `/users/${slug}`, userData);
  }
  const validate = (values) => {
    const e = {};
    if (!values.password) {
      e.password = 'رمز را وارد کنید';
    }

    else if (!values.repeat_password) {
      e.repeat_password = 'رمز را وارد کنید';
    }
    else {
      if (values.password.trim() !== values.repeat_password.trim()) {
        e.password = 'رمز تکرار شده درست نمیباشد.';
        e.repeat_password = 'رمز تکرار شده درست نمیباشد.';
      }

    }

    if(!values.name) {
      e.name = 'نام را وارد کنید'
    }

    if(!values.email) {
      e.email = 'ایمیل را وارد کنید'
    }

    return e;
  }
  const { form: userData, setForm, submitting, handleSubmit, bind, initfetchloading, errors } = useForm(onSubmit, validate, {}, `/users/${slug}`, data => ({ ...data.user }))
  console.log('errors', errors)
  return (
    <FullLoadingOverlay loading={initfetchloading}>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <div>
              <img src={userData.image} className="img-avatar ml-2" alt={userData.first_name} />
              {userData.first_name + '' + userData.last_name}
            </div>
          </CardHeader>

          <CardBody>
            <Row>
              <Col xs="12" md="6">
                <Label>نام </Label>
                <Input type="text" {...bind('name')} />
              </Col>

              <Col xs="12" md="6">
                <Label>نام کاربری</Label>
                <Input type="text" {...bind('username')} />
              </Col>

              <Col xs="12" md="6">
                <Label>رمز عبور</Label>
                <Input type="password" {...bind('password')} />
              </Col>

              <Col xs="12" md="6">
                <Label> تکرار رمز عبور</Label>
                <Input type="password" {...bind('repeat_password')} />
              </Col>

              <Col xs="12" md="6">
                <Label>ایمیل</Label>
                <Input type="email" {...bind('email')} />
              </Col>

              
              <Col xs="12" md="6">
                <Label>تلفن</Label>
                <Input type="text" {...bind('phone')} />
              </Col>
            </Row>
          </CardBody>
          <CardFooter>
            <LaddaButton loading={submitting} color="primary" type="submit">
              اعمال تعغییر
            </LaddaButton>
          </CardFooter>
        </form>
      </Card>
    </FullLoadingOverlay>
  )
}
export default User;
