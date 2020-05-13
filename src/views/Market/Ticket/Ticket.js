import React from "react";

import { Col, Row, Card, CardBody, CardHeader, Input, Label, CardFooter, Button, FormGroup } from "reactstrap";
import Axios from "axios";
import Select from "react-select";
import LaddaButton from "components/laddaButton/LaddaButton";
import { toast } from "react-toastify";
import { post } from "lib/ajax/post";
import SimpleSelect from "components/Form/SimpleSelect/SimpleSelect";
import { useForm } from "hooks/useForm/useForm";
import FileInput from "components/Form/FileInput/FileInput";
import { changeJsonToFormData } from "lib/ajax/changeJsonToFormData";
const Ticket = prop => {
    const createTicket = async function () {
        console.log('new ticket', form);
        await post(null, null, null, '/create_ticket', changeJsonToFormData(form));
    }
    const { form, submitting, handleSubmit, bind, bindFile, clear } = useForm(createTicket, null, { status: 'low' });

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <CardHeader>تیکت</CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="6" md="5">
                            <FormGroup>
                                <Label>اولویت</Label>
                                <SimpleSelect
                                    options={[
                                        { label: 'کم', name: 'low' },
                                        { label: 'فوری', name: 'emergency' },
                                    ]}

                                    {...bind("priority")}
                                />
                            </FormGroup>
                        </Col>
                        <Col xs="6" md="6">
                            <FormGroup>
                                <Label>شناسه</Label>
                                <Input type="text" placeholder="شناسه را وارد کنید" required {...bind("id")} />
                            </FormGroup>
                        </Col>

                        <Col xs="12" md="11" className="mt-3">
                            <FormGroup>
                                <Input type="text" placeholder="موضوع را وارد کنید" required {...bind("title")} />
                            </FormGroup>
                        </Col>

                        <Col xs="12" md="11" className="mt-3">
                            <FormGroup>
                                <Input type="textarea" placeholder="متن را وارد کنید" required {...bind("text")} />
                            </FormGroup>
                        </Col>

                        <Col xs="12" md="11" className="mt-3">
                            <FileInput type="file" {...bindFile('attachment')} placeholder="لوگو" />
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <LaddaButton loading={submitting} color="primary" type="submit">
                        ثبت تیکت
                    </LaddaButton>

                    <Button onClick={clear} style={{marginLeft:10, marginRight:10}}>
                        از نو شروع کنید
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

export default Ticket;