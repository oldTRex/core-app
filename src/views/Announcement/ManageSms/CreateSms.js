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
  Label
} from "reactstrap";
import UserMarketFilter from "components/bootstrap-table/UserMarketFilter";
import { post } from "lib/ajax/post";
import { changeJsonToFormData } from "lib/ajax/changeJsonToFormData";
import Barloader from "components/Loading/Barloader";
import { useForm } from "hooks/useForm/useForm";

const CreateSms = props => {
  const sendSms = async function() {
    await post(null, null, null, "send-sms", changeJsonToFormData(message));
  };
  const { form: message, submitting, bind, handleSubmit } = useForm(sendSms);

  const [filter, setFilter] = React.useState({
    users: {
      checked: false
    },
    markets: {
      checked: false
    }
  });

  return (
    <div>
      <Row>
        <Col xs="12">
          <Barloader loading={submitting} />
        </Col>
        <Col xs="12">
          <Card>
            <div>
              <CardHeader>ایجاد پیامک</CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" md="8">
                    <Label>متن پیامک را وارد کنید</Label>
                    <Input
                      type="textarea"
                      maxlength="180"
                      {...bind("message")}
                    />
                  </Col>

                  <Col xs="12" className="my-4">
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
                <Button color="success" onClick={handleSubmit}>
                  ایجاد پیامک
                </Button>
              </CardFooter>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CreateSms;
