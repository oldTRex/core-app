import React from "react";

import {
    Row, Col, CardHeader, CardBody, Card, Button, CardFooter, Input, Label, Form
} from "reactstrap";


const CreateNews = props => {
    const [message, setMessage] = React.useState('');

    const handleSubmit = function (e) {
        e.preventDefault();

        console.log("messages", message);
    }

    const handleChange = function (e) {
        setMessage(e.target.value);
    }

    return (
        <div>
            <Row>
                <Col xs="12">
                    <Card>
                        <Form onSubmit={handleSubmit}>
                            <CardHeader>
                                ایجاد خبرنامه
                            </CardHeader>
                            <CardBody>
                                <Row>
                                    <Col xs="12" md="8">
                                        <Label>متن خبرنامه را وارد کنید</Label>
                                        <Input name="message" type="textarea" maxlength="180" onChange={handleChange} value={message} />
                                    </Col>

                                </Row>

                            </CardBody>
                            <CardFooter>
                                <Button
                                    color="success"
                                    type="submit"
                                >
                                    ایجاد خبرنامه
                            </Button>


                            </CardFooter>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default CreateNews;