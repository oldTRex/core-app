import React from "react";
import Picker from "emoji-picker-react";

import {
  Row,
  Col,
  CardHeader,
  CardBody,
  Card,
  CardFooter,
  Input,
  Label,
  Form,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import FullLoadingOverlay from "components/CustomLoadingOverlay/FullLoadingOverlay";
import LaddaButton from "components/laddaButton/LaddaButton";
import { put } from "lib/ajax/put";
import { useForm } from "hooks/useForm/useForm";
import { changeJsonToFormData } from "lib/ajax/changeJsonToFormData";

const EditNotif = props => {
  const slug = props.match.params.slug;

  const [chosenEmoji, setChosenEmoji] = React.useState(null);

  const editNotif = async function() {
    console.log("notif", form);
    await put(
      null,
      null,
      null,
      `/notification/${slug}`,
      changeJsonToFormData(form)
    );
  };
  const {
    form,
    submitting,
    setForm,
    bind,
    handleSubmit,
    initfetchloading: loading
  } = useForm(
    editNotif,
    null,
    { notification: "" },
    `/notification/${slug}`,
    data => data.data
  );
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  React.useEffect(() => {
    if (chosenEmoji && "emoji" in chosenEmoji)
      setForm(state => ({
        ...state,
        notification: state.notification + chosenEmoji.emoji
      }));
    console.log("notif", form.notification);
  }, [chosenEmoji]);

  return (
    <div>
      <FullLoadingOverlay loading={loading}>
        <Row>
          <Col xs="12">
            <Card>
              <CardHeader>ویرایش نوتیف</CardHeader>
              <CardBody>
                <Row>
                  <Col md="8" xs="12">
                    <Label>متن نوتیف را وارد کنید</Label>
                    <Input type="textarea" {...bind("notification")} />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <div className="d-flex align-items-center">
                  <LaddaButton
                    loading={submitting}
                    onClick={handleSubmit}
                    color="success"
                    type="submit"
                  >
                    ویرایش نوتیف
                  </LaddaButton>

                  <div className="ml-4">
                    <UncontrolledDropdown>
                      <DropdownToggle tag="a">
                        <i className="fa fa-smile-o fa-lg cursor-pointer" />
                      </DropdownToggle>
                      <DropdownMenu positionFixed={true}>
                        <div className="ltr mt-sm-3">
                          <Picker onEmojiClick={onEmojiClick} />
                        </div>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </FullLoadingOverlay>
    </div>
  );
};

export default EditNotif;
