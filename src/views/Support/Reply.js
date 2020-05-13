import React from "react";
import Picker from "emoji-picker-react";

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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { useForm } from "hooks/useForm/useForm";
import { post } from "lib/ajax/post";
import { changeJsonToFormData } from "lib/ajax/changeJsonToFormData";
import { useData } from "hooks/useData/useData";
import LaddaButton from "components/laddaButton/LaddaButton";
import { put } from "lib/ajax/put";
import Barloader from "components/Loading/Barloader";
const Appreply = props => {
  const slug = props.match.params.slug;
  const [chosenEmoji, setChosenEmoji] = React.useState(null);

  const reply = async function() {
    await put(null, null, null, `/comments/${slug}`, {
      ...form,
      confirmed: true
    });
  };
  const {
    form,
    setForm,
    bind,
    submitting,
    handleSubmit,
    initfetchloading: loading
  } = useForm(
    reply,
    null,
    { reply: "", comment_message: "", full_name: "", parent_id: slug },
    `comments/${slug}`,
    data => data.data
  );

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  React.useEffect(() => {
    if (chosenEmoji && "emoji" in chosenEmoji)
      setForm(state => ({
        ...state,
        reply: state.reply + chosenEmoji.emoji
      }));
    console.log("notif", form.reply);
  }, [chosenEmoji]);
  return (
    <div>
      <Row>
        <Col xs="12">
          <Barloader loading={submitting || loading} />
          <Card>
            <div>
              <CardHeader>جواب خود را بنویسید</CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <blockquote className="blockquote">
                      {form.comment_message && (
                        <React.Fragment>
                          <p className="mb-0">{form.comment_message}</p>
                          <footer className="blockquote-footer">
                            {form.full_name}
                          </footer>
                        </React.Fragment>
                      )}
                    </blockquote>
                  </Col>
                  <Col md="8" xs="12">
                    <Label>متن جواب را وارد کنید</Label>
                    <Input type="textarea" {...bind("reply")} />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <div className="d-flex align-items-center">
                  <LaddaButton
                    loading={submitting}
                    color="primary"
                    onClick={handleSubmit}
                  >
                    فرستادن
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
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Appreply;
