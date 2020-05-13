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
import { put } from "lib/ajax/put";
import FullLoadingOverlay from "components/CustomLoadingOverlay/FullLoadingOverlay";
import SimpleSelect from "components/Form/SimpleSelect/SimpleSelect";
import { useForm } from "hooks/useForm/useForm";
import classnames from "classnames";
import { changeJsonToFormData } from "lib/ajax/changeJsonToFormData";

const EditBlog = props => {
  const slug = props.match.params.slug;

  const editBlog = async function() {
    console.log("edit blog", form);
    await put(null, null, null, `/blogs/${slug}`, changeJsonToFormData(form));
  };

  const {
    files,
    bindFile,
    form,
    setForm,
    submitting,
    bind,
    handleChange,
    handleSubmit,
    initfetchloading: loading
  } = useForm(
    editBlog,
    null,
    { language: "fa" },
    `/blogs/${slug}`,
    data => data.data
  );

  return (
    <div>
      <FullLoadingOverlay loading={loading}>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>تغیرات خود را اعمال کنید</CardHeader>
            <CardBody>
              <Row>
                <Col xs="12" className="mb-4">
                  <Row>
                    <Col xs="12" md="6">
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
                    data={form.description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                      setForm(state => ({ ...state, description: data }));
                    }}
                  />
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <LaddaButton loading={submitting} color="primary" type="submit">
                اعمال تغیرات
              </LaddaButton>
            </CardFooter>
          </form>
        </Card>
      </FullLoadingOverlay>
    </div>
  );
};

export default EditBlog;
