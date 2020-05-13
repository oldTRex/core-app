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
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import FullLoadingOverlay from "components/CustomLoadingOverlay/FullLoadingOverlay";
import LaddaButton from "components/laddaButton/LaddaButton";
import { put } from "lib/ajax/put";
import { useForm } from "hooks/useForm/useForm";
import { changeJsonToFormData } from "lib/ajax/changeJsonToFormData";
import Barloader from "components/Loading/Barloader";
import { remove } from "lib/ajax/delete";

const EditComment = props => {
  const slug = props.match.params.slug;
  const [chosenEmoji, setChosenEmoji] = React.useState(null);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const editComment = async function() {
    console.log("notif", form);
    await put(
      null,
      null,
      null,
      `/comments/${slug}`,
      changeJsonToFormData({ ...form, confirmed: true })
    );
  };
  const deleteComment = function() {
    setDeleteLoading(true);
    remove(null, null, () => setDeleteLoading(false), `/comments/${slug}`);
  };
  const {
    form,
    submitting,
    setForm,
    bind,
    handleSubmit,
    initfetchloading: loading
  } = useForm(
    editComment,
    null,
    { comment_message: "", parent_id: slug },
    `/comments/${slug}`,
    data => data.data
  );
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  React.useEffect(() => {
    if (chosenEmoji && "emoji" in chosenEmoji)
      setForm(state => ({
        ...state,
        comment: state.comment + chosenEmoji.emoji
      }));
    console.log("notif", form.comment);
  }, [chosenEmoji]);

  console.log("submittinh", submitting);
  return (
    <div>
      <FullLoadingOverlay loading={false}>
        <Row>
          <Col xs="12">
            <Barloader loading={submitting || deleteLoading} />
          </Col>
          <Col xs="12">
            <Card>
              <CardHeader>ویرایش کامنت</CardHeader>
              <CardBody>
                <Row>
                  <Col md="8" xs="12">
                    <Label>متن کامنت را وارد کنید</Label>
                    <Input type="textarea" {...bind("comment_message")} />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <div className="d-flex align-items-center">
                  <LaddaButton
                    loading={submitting}
                    onClick={handleSubmit}
                    color="success"
                    square
                    type="submit"
                  >
                    ویرایش کامنت
                  </LaddaButton>

                  <LaddaButton
                    color="danger"
                    className="ml-4"
                    square
                    onClick={deleteComment}
                  >
                    حذف کامنت
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

export default EditComment;
