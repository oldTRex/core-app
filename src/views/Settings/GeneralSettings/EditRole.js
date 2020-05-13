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
import { PulseLoader } from "react-spinners";
import LoadingOverlay from 'react-loading-overlay';
import Selecto from "components/Selecto/Selecto";
import { useParams } from 'react-router-dom';

function EditRole(props) {
    const { slug } = useParams('slug')

    const [chosenPermissions, setChosenPermissions] = React.useState([]);
    const [selectedOption, setSelectedOption] = React.useState([]);
    const [permissions, setPermissions] = React.useState([]);
    const [title, setTitle] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [loadingOverlay, setOverlayLoading] = React.useState(false);

    React.useEffect(() => {
        // get the Permissions
        setOverlayLoading(true);
        setTitle(slug);
        Axios.get('permissions')
            .then(({ data }) => {

                setPermissions(data.data);

            }).catch(
                () => {
                    toast.error('مشکلی در ارتباط با سرور وجود دارد');
                }
            )

        Axios.get('roles/' + slug)
            .then(({ data }) => {

                setTitle(data.data.display_name)
                setSelectedOption(data.data.perms)
                console.log('Permissions', setSelectedOption);
                // set the initital chosen one
            }).catch(
                () => {
                    toast.error('مشکلی در ارتباط با سرور وجود دارد');
                }
            )
            .finally(() => {
                setOverlayLoading(false);
            })


        console.log(chosenPermissions)
    }, [])
    const callback = React.useCallback(
        (perms, e) => {
            setChosenPermissions(perms)
            setSelectedOption(e)
            console.log(chosenPermissions)
        },
        [chosenPermissions],
    )
    // const handleMultipleChange = function (e) {
    //     var options = e.target.options;
    //     var value = [];
    //     for (var i = 0, l = options.length; i < l; i++) {
    //         if (options[i].selected) {
    //             value.push(Number(options[i].value));
    //         }
    //     }
    //     setChosenPermissions(value);

    // }

    const handleTitleChange = function (e) {

        setTitle(e.target.value);
    }

    const handleEditRole = function (e) {
        e.preventDefault();
        setLoading(true);
        console.log('Permissions', chosenPermissions, e)
        console.log('title', title)
        if (chosenPermissions.length != 0) {
            Axios.put('roles/' + slug, { perms: chosenPermissions, display_name: title })
                .then(({ data }) => {
                    console.log('Permissions', data);

                    // set the initital chosen one
                    toast.success('آپدیت شد')
                }).catch(
                    () => {
                        toast.error('مشکلی در ارتباط با سرور وجود دارد');
                    }
                )
                .finally(() => {
                    setOverlayLoading(false);
                })


        }
        setLoading(false);

    }

    return (
        <>
            <LoadingOverlay
                active={loadingOverlay}
                spinner={<div className="w-100 d-flex justify-content-center align-items-center"><PulseLoader color="gray" /></div>}
                styles={{
                    overlay: base => ({
                        ...base,
                        background: "rgba(255,255,255,0.5)"
                    })
                }}
            >
                <Card className="w-100">
                    <CardHeader>ویرایش  نقش</CardHeader>
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
                                    {/* <Input type="select" name="permissions" multiple onChange={handleMultipleChange}>
                                        {permissions.length ? permissions.map((permission, i) => (
                                            <option selected={chosenPermissions.includes(permission.id)} key={'permissions' + i} value={permission.id}>{permission.name}</option>
                                        )) : <option className='text-center ltr'>loading...</option>}
                                    </Input> */}
                                    <Selecto options={permissions} value={selectedOption} callback={callback} />
                                </FormGroup>

                            </Col>
                        </Row>
                    </CardBody>

                    <CardFooter>
                        <LaddaButton loading={loading} color="primary" onClick={handleEditRole}>ویرایش</LaddaButton>
                    </CardFooter>

                </Card>
            </LoadingOverlay>
        </>
    )
}

export default EditRole;