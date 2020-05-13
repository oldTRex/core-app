import React from "react";
import { Card, CardHeader, CardBody, Button, Input, Row, Col, Label, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, FormFeedback } from 'reactstrap';
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import LaddaButton from "components/laddaButton/LaddaButton";
import FileInput from "components/Form/FileInput/FileInput";
import { put } from "lib/ajax/put";
import { useForm } from "hooks/useForm/useForm";
import { useModal } from "hooks/useModal/useModal";
import FullLoadingOverlay from "components/CustomLoadingOverlay/FullLoadingOverlay";

// Tehran, Iran Latitude and longitude coordinates are: 35.715298, 51.404343

export default function MarketsProfile(props) {
    const slug = props.match.params.slug;
    const validate = (values) => {
        let newerror = {};

        if (!values.market_name) {
            newerror.market_name = 'لطفا نام مارکت را وارد کنید!';
        }

        if (!values.logo) {
            newerror.logo = 'لطفا لوگو را وارد کنید';
        }

        if (!values['phone-1']) {
            newerror['phone-1'] = 'لطفا شماره تلفن را وارد کنید!';
        }
        if (!values.email) {
            newerror.email = 'لطفا ایمیل را وارد کنید!';
        }
        return newerror;
    }

    const chnageMarketProfile = async function () {
        const formData = new FormData();
        console.log('userinfo', form)
        Object.entries(form).map(([key, value]) => formData.append(key, value))
        await put(null, null, null, `/auth/market/${slug}`, formData)

    }
    const { files, form, setForm, submitting, handleSubmit, bind, initfetchloading, errors: error, bindFile } = useForm(chnageMarketProfile, null, {}, `/markets/${slug}`, data => ({ ...data.market }))

    const { modal, toggle } = useModal();

    const [mapOptions, setMapOptions] = React.useState({
        center: [35.715298, 51.404343],
        zoom: 12,
        markerPosition: [35.715298, 51.404343],
    });
    const markerRef = React.useRef();

    React.useEffect(() => {
        if (form.lat && form.lng) {
            setMapOptions(
                {
                    ...mapOptions,
                    center: [form.lat, form.lng],
                    markerPosition: [form.lat, form.lng],
                }
            )
        }
    }, [form])
    const updatePosition = function () {
        const marker = markerRef.current;
        const { lat, lng } = marker.leafletElement.getLatLng()
        setForm(state => ({
            ...state, lat, lng
        }))
        if (marker != null) {
            setMapOptions({
                ...mapOptions,
                markerPosition: [lat, lng]
            })

        }
    }

    return (
        <FullLoadingOverlay loading={initfetchloading}>
            <Card>
                <CardHeader>
                    پروفایل
            </CardHeader>
                <CardBody>
                    <Form onSubmit={handleSubmit}>
                        <Row className="align-items-start mb-4">
                            <Col xs="12" md="6" className="mt-4">
                                <Label>نام فروشگاه</Label>
                                <Input invalid={error.market_name} type="text" {...bind("market_name")} placeholder="نام فروشگاه را وارد کنید" />
                                <FormFeedback>{error['market_name']}</FormFeedback>

                            </Col>
                            <Col xs="12" md="6" className="mt-4">
                                <Row>
                                    <Col xs="8">
                                        <Label>لوگو</Label>
                                        <Input type="file" {...bindFile('logo')} placeholder="لوگو" />
                                        <FormFeedback>{error['logo']}</FormFeedback>
                                    </Col>
                                    <Col xs="2">
                                        {
                                            files.logo && <img src={files.logo} className="circle" width="50px" height="50px" alt="logo" />
                                        }
                                    </Col>
                                </Row>
                            </Col>

                            <Col xs="12" className="mt-4">
                                <Label>ادرس فروشگاه</Label>
                                <Input type="text" {...bind("market_address")} placeholder="ادرس فروشگاه رو وارد کنید" />
                            </Col>

                            <Col xs="12" md="6" className="mt-4">
                                <Label>کد پستی</Label>
                                <Input type="text" {...bind("postal_code")} placeholder="کد پستی را وارد کنید" />
                            </Col>

                            <Col xs="12" md="6" className="mt-4">
                                <p>انتخاب لوکیشن

                                    <Button onClick={toggle} className="text-white circle ml-3" color="primary" style={{ width: 50, height: 50 }}>
                                        <i className="cui-location-pin icons font-2xl d-block"></i>
                                    </Button>
                                </p>

                                <Modal isOpen={modal} toggle={toggle} className={'modal-classname'}>
                                    <ModalHeader toggle={toggle}>انتخاب لوکیشن</ModalHeader>
                                    <ModalBody>
                                        <LeafletMap
                                            center={mapOptions.center}
                                            zoom={mapOptions.zoom}
                                            maxZoom={30}
                                            attributionControl={true}
                                            zoomControl={true}
                                            doubleClickZoom={true}
                                            scrollWheelZoom={true}
                                            dragging={true}
                                            animate={true}
                                            easeLinearity={0.35}
                                        >
                                            <TileLayer
                                                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                                            />
                                            <Marker
                                                draggable
                                                onDragend={updatePosition}
                                                ref={markerRef}
                                                position={mapOptions.markerPosition}
                                            >
                                                <Popup>
                                                    شما اینجا هستید
                                                </Popup>
                                            </Marker>
                                        </LeafletMap>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" onClick={toggle}>اعمال</Button>{' '}
                                    </ModalFooter>
                                </Modal>
                            </Col>

                            <Col xs="12">
                                <Row>
                                    <Col xs="12" md="6">
                                        <Row>
                                            <Col xs="12" className="mt-2">
                                                <Label>شماره موبایل 1</Label>
                                                <Input type="text" {...bind('mobile-1')} placeholder="شماره موبایل را وارد کنید" />
                                            </Col>

                                            <Col xs="12" className="mt-4">
                                                <Label>شماره تلفن ثابت 1</Label>
                                                <Input type="text" {...bind('phone-1')} placeholder="شماره تلفن ثابت را وارد کنید" />
                                                <FormFeedback>{error['phone-1']}</FormFeedback>

                                            </Col>

                                            <Col xs="12" className="mt-4">
                                                <Label>شماره موبایل 2</Label>
                                                <Input type="text" {...bind("mobile-2")} placeholder="شماره موبایل را وارد کنید" />
                                            </Col>

                                            <Col xs="12" className="mt-4">
                                                <Label>شماره تلفن ثابت 2</Label>
                                                <Input type="text" {...bind("phone-2")} placeholder="شماره تلفن ثابت را وارد کنید" />
                                            </Col>


                                        </Row>
                                    </Col>
                                    <Col xs="12" md="6" className="mt-2">
                                        <Row>
                                            <Col xs="12" className="mt-2">
                                                <Label>توضیحات درباره کسب و کار</Label>
                                                <Input type="textarea" {...bind('description')} placeholder="توضیحات را وارد کنید" />
                                            </Col>

                                            <Col xs="12" className="mt-4">
                                                <Label>ادرس ایمیل</Label>
                                                <Input type="email"{...bind('email')} placeholder="ادرس ایمیل خود را وارد کنید" />
                                                <FormFeedback>{error['email']}</FormFeedback>
                                            </Col>

                                        </Row>

                                    </Col>
                                </Row>
                            </Col>


                            <Col xs="12" md="6" className="mt-4">
                                <Label>شماره موبایل 3</Label>
                                <Input type="text" {...bind('mobile-3')} placeholder="شماره موبایل را وارد کنید" />
                            </Col>

                            <Col xs="12" md="6" className="mt-4">
                                <Label>شماره تلفن ثابت 3</Label>
                                <Input type="text" {...bind('phone-3')} placeholder="شماره تلفن ثابت را وارد کنید" />
                            </Col>
                            <Col xs="12" className="mt-4">
                                <Row className="align-items-center">
                                    <Col xs="12">
                                        <Col xs="12">
                                            <FileInput label="گالری تصاویر" multiple {...bindFile('pictures')} />
                                        </Col>
                                    </Col>

                                    <Col xs="12 mt-4">
                                        <FormGroup className="d-flex flex-wrap">
                                            <Row>
                                                {files.pictures && Array.from(files.pictures).map(uri => (
                                                    <Col xs="4" md="1">
                                                        <img src={uri} key={"uri-" + uri} className="img-thumbnail m-1" height="100%" width="100%" />
                                                    </Col>
                                                ))}
                                            </Row>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                        <FormGroup className="mt-4">
                            <hr />
                            <LaddaButton loading={submitting} color="primary" type="submit" square>اعمال تعقیررات</LaddaButton>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </FullLoadingOverlay>

    )
}