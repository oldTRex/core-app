import React from "react";

import {
  Row,
  Col,
  CardHeader,
  CardBody,
  Card,
  CardFooter,
  Input,
  Label,
  Form
} from "reactstrap";
import { DateRangePicker } from "react-advance-jalaali-datepicker";
import FullLoadingOverlay from "components/CustomLoadingOverlay/FullLoadingOverlay";
import LaddaButton from "components/laddaButton/LaddaButton";
import { post } from "lib/ajax/post";
import { useForm } from "hooks/useForm/useForm";

const EditEvent = props => {
  const slug = props.match.params.slug;
  const editEvent = async function() {
    console.log("event", event);
    await post(null, null, null, "/create_event", event);
  };
  const {
    form: event,
    setForm: setEvent,
    submitting,
    bind,
    handleSubmit,
    initfetchloading: loading
  } = useForm(editEvent, null, {}, `/initialEvetn/${slug}`, data => data);

  function changeStart(unix, formatted) {
    console.log(unix); // returns timestamp of the selected value, for example.
    console.log(formatted); // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".
    setEvent({ ...event, startDate: unix });
  }

  function changeEnd(unix, formatted) {
    console.log(unix); // returns timestamp of the selected value, for example.
    console.log(formatted); // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".
    setEvent({ ...event, endDate: unix });
  }

  return (
    <div>
      <FullLoadingOverlay loading={loading}>
        <Row>
          <Col xs="12">
            <Card>
              <Form onSubmit={handleSubmit}>
                <CardHeader>ویرایش رویداد</CardHeader>
                <CardBody>
                  <Row>
                    <Col xs="12" md="6">
                      <Label>زمان را وارد کنید</Label>
                      <DateRangePicker
                        placeholderStart="تاریخ شروع"
                        placeholderEnd="تاریخ پایان"
                        format="jYYYY/jMM/jDD"
                        onChangeStart={changeStart}
                        onChangeEnd={changeEnd}
                        idStart="rangePickerStart"
                        idEnd="rangePickerEnd"
                        containerClass="datepicker-input"
                      />
                    </Col>

                    <Col xs="12" md="3">
                      <Label>ارزش هر قدم</Label>
                      <Input type="number" {...bind("value")} min="0" />
                    </Col>
                  </Row>
                  <div className="mt-4" />
                </CardBody>
                <CardFooter>
                  <LaddaButton
                    loading={submitting}
                    color="success"
                    type="submit"
                  >
                    ویرایش رویداد
                  </LaddaButton>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </FullLoadingOverlay>
    </div>
  );
};

export default EditEvent;
