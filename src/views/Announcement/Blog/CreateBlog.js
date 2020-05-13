import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Row,
  Col,
  CardHeader,
  CardBody,
  Card,
  CardFooter,
  Input,
  Label,
  FormGroup
} from "reactstrap";
import FileInput from "components/Form/FileInput/FileInput";
import LaddaButton from "components/laddaButton/LaddaButton";

import { DatePicker } from "react-advance-jalaali-datepicker";
import { post } from "lib/ajax/post";
import SimpleSelect from "components/Form/SimpleSelect/SimpleSelect";
import { useForm } from "hooks/useForm/useForm";
import classnames from "classnames";

import { changeJsonToFormData } from "lib/ajax/changeJsonToFormData";

const CreateBlog = props => {
  const createBlog = async function() {
    console.log("form", form);
    await post(null, null, null, "/blogs", changeJsonToFormData(form));
  };

  const {
    files,
    bindFile,
    form,
    setForm,
    submitting,
    bind,
    handleSubmit
  } = useForm(createBlog, null, {
    language: "fa",
    title: ""
  });

  function changeDate(unix, formatted) {
    console.log(unix); // returns timestamp of the selected value, for example.
    console.log(formatted); // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".
    setForm(state => ({ ...state, published_at: unix }));
  }

  return (
    <div>
      <Row>
        <Col xs="12">
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>ایجاد بلاگ</CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12" className="mb-4">
                    <Row>
                      <Col xs="12" md="2">
                        <FormGroup>
                          <Label>زبان</Label>
                          <SimpleSelect
                            options={[
                              { name: "fa", label: "فارسی" },
                              { name: "en", label: "انگلیسی" }
                            ]}
                            required
                            {...bind("language")}
                          />
                        </FormGroup>
                      </Col>

                      <Col xs="12" md="6">
                        <FormGroup>
                          <Label>برای بلاگ یک عنوان انتخاب کنید:</Label>
                          <Input
                            placeholder="عنوان"
                            {...bind("title")}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col xs="12" md="4">
                        <FormGroup>
                          <Label>زمان انتشار را وارد کنید</Label>
                          <DatePicker
                            placeholder="انتخاب تاریخ"
                            format="jYYYY/jMM/jDD"
                            onChange={changeDate}
                            id="datePicker"
                            containerClass="datepicker-input"
                          />
                        </FormGroup>
                      </Col>

                      <Col xs="12">
                        <FileInput
                          label="عکس را وارد کنید"
                          {...bindFile("image")}
                        />
                      </Col>

                      {files.image && (
                        <Col xs="12" className="mt-5">
                          <img
                            src={files.image}
                            alt="image for blog"
                            height="430px"
                            width="100%"
                          />
                        </Col>
                      )}
                    </Row>
                  </Col>
                  <Col
                    xs="12"
                    className={classnames({ [form.language]: form.language })}
                  >
                    <CKEditor
                      editor={ClassicEditor}
                      config={{
                        ckfinder: {
                          // Upload the images to the server using the CKFinder QuickUpload command.
                          // uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
                        }
                      }}
                      // data="<p>Hello from CKEditor 5!</p>"
                      data={form.description}
                      onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setForm(state => ({ ...state, description: data }));
                      }}
                      onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                      }}
                    />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <LaddaButton loading={submitting} color="primary" type="submit">
                  + ایجاد بلاگ
                </LaddaButton>
              </CardFooter>
            </form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default CreateBlog;
