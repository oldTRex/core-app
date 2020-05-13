import React from "react";
import Axios from "axios";
import { toast } from "react-toastify";

import CardBody from "reactstrap/lib/CardBody";
import CardHeader from "reactstrap/lib/CardHeader";
import Card from "reactstrap/lib/Card";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import FormGroup from "reactstrap/lib/FormGroup";
import LaddaButton from "components/laddaButton/LaddaButton";
import CardFooter from "reactstrap/lib/CardFooter";
import Selecto from "components/Selecto/Selecto";

const CreateRole = props => {

    const [chosenPermissions, setChosenPermissions] = React.useState([]);
    const [selectedOption, setSelectedOption] = React.useState([]);
    const [permissions, setPermissions] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [loadingOverlay, setOverlayLoading] = React.useState(false);

    React.useEffect(() => {
        // get the roles

        // get the Permissions
        setOverlayLoading(true);

        Axios.get('permissions')
            .then(({ data }) => {
                setPermissions(data.data);
            }).catch(
                () => {
                    toast.error('مشکلی در ارتباط با سرور وجود دارد');
                }
            )

    }, [])

    const callback = React.useCallback(
        (perms, e) => {
            setChosenPermissions(perms)
            setSelectedOption(e)
            console.log(chosenPermissions)
        },
        [chosenPermissions],
    )

    const handleTitleChange = function (e) {
        setTitle(e.target.value);
    }

    const handleCreateRole = function (e) {
        e.preventDefault();
        setLoading(true);
        console.log('Permissions', chosenPermissions, e)
        console.log('title', title)
        if (chosenPermissions.length != 0) {
            Axios.post('roles', { perms: chosenPermissions, display_name: title })
                .then(({ data }) => {
                    console.log('Permissions', data);

                    // set the initital chosen one
                    toast.success(' ساخته شد')
                }).catch(
                    () => {
                        toast.error('نقش وجود دارد');
                    }
                )
                .finally(() => {
                    setOverlayLoading(false);
                })


        }
        setLoading(false);

    }

    return (
        <Card className="w-100">
            <CardHeader>ایجاد دسترسی</CardHeader>
            <CardBody>


                <Row>
                    <Col xs="12" >
                        <FormGroup className="w-50">
                            <Label>عنوان</Label>
                            <Input type="text" name="title" onChange={handleTitleChange} placeholder="عنوان را وارد کنید" value={title} />
                        </FormGroup>
                    </Col>
                    <Col xs="12" className="mt-5" >
                        <FormGroup className="w-50">
                            <Label>دسترسی ها را وارد کنید</Label>
                            <Selecto options={permissions} value={selectedOption} callback={callback} />
                        </FormGroup>
                    </Col>
                </Row>
            </CardBody>

            <CardFooter>
                <LaddaButton loading={loading} color="success" onClick={handleCreateRole}>ایجاد</LaddaButton>
            </CardFooter>
        </Card>
    )
}

export default CreateRole;