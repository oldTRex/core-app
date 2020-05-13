import React from "react";

import {
  Row,
  Col,
  CardHeader,
  CardBody,
  Card,
  Button,
  CardFooter,
  Input,
  Label,
  Form
} from "reactstrap";
import { DateRangePicker } from "react-advance-jalaali-datepicker";
import UserMarketFilter from "components/bootstrap-table/UserMarketFilter";
import { useForm } from "hooks/useForm/useForm";
import { post } from "lib/ajax/post";

const CreateEvent = props => {
  const [filter, setFilter] = React.useState({
    users: {
      checked: false
    },
    markets: {
      checked: false
    }
  });

  const createEvent = async function() {
    if (filter.users) {
      // we have users filter
    }

    if (filter.markets) {
      // we have markets filter
    }
    // check the filter then make req
    console.log("event", event);

    await post(null, null, null, "/create_event", event);
  };
  const {
    form: event,
    setForm: setEvent,
    submitting,
    bind,
    handleSubmit
  } = useForm(createEvent);

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
      <Row>
        <Col xs="12">
          <Card>
            <Form onSubmit={handleSubmit}>
              <CardHeader>ایجاد رویداد</CardHeader>
              <CardBody className="mb-3">
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
                  <Col xs="12" className="mt-4">
                    <UserMarketFilter
                      filter={filter}
                      setFilter={setFilter}
                      handleSubmit={e =>
                        console.log("filter inside of create", filter)
                      }
                    />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Button color="success" type="submit">
                  ایجاد رویداد
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateEvent;
