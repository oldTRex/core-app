import React from "react";

import {
    Row, Col, CardHeader, CardBody, Card, Button, CardFooter, Input, Label, Form
} from "reactstrap";

import Axios from "axios";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import LoadingOverlay from 'react-loading-overlay';
import { useForm } from "hooks/useForm/useForm";
import FullLoadingOverlay from "components/CustomLoadingOverlay/FullLoadingOverlay";
import LaddaButton from "components/laddaButton/LaddaButton";
import { put } from "lib/ajax/put";

const EditNews = props => {
    const slug = props.match.params.slug;

    const editNews = async function (e) {
        console.log("messages", form);
        await put(null, null, null, `/newsletter/${slug}`, form);
    }
    const { form, submitting, bind, handleSubmit, initfetchloading: loading } = useForm(editNews, null, {}, `/newsletter/${slug}`, data => data.data);

    return (
        <div>
            <FullLoadingOverlay
                loading={loading}
            >
                <Row>
                    <Col xs="12">
                        <Card>
                            <Form onSubmit={handleSubmit}>
                                <CardHeader>
                                    ویرایش خبرنامه
                               </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="12" md="8">
                                            <Label>متن خبرنامه را وارد کنید</Label>
                                            <Input type="textarea" maxlength="180" {...bind('newsletter')} />
                                        </Col>
                                    </Row>
                                </CardBody>
                                <CardFooter>
                                    <LaddaButton
                                        loading={submitting}
                                        color="success"
                                        type="submit"
                                    >
                                        ویرایش خبرنامه
                                    </LaddaButton>


                                </CardFooter>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </FullLoadingOverlay>

        </div>
    )
}

export default EditNews;