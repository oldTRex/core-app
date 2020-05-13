import React from "react";
import { toast } from "react-toastify";
import Axios from "axios";
import CustomLoadingOverlay from "components/CustomLoadingOverlay/CustomLoadingOverlay";
import { Container, Input, Label, Card, CardHeader, CardBody, CardFooter, Col, Row, Modal, ModalHeader, ModalFooter, ModalBody, FormGroup } from "reactstrap";
import LaddaButton from "components/laddaButton/LaddaButton";
import { useModal } from "hooks/useModal/useModal";
import { useForm } from "hooks/useForm/useForm";
import { useData } from "hooks/useData/useData";
import Button from "reactstrap/lib/Button";
import { post } from "lib/ajax/post";


const createTagRoute = '/metas'
const fakeHead = {
    meta: [
        { "name": "subject", "content": "پایگاه استعلام سطح‌بندی تجهیزات نظارت تصویری" },
        { "name": "author", "content": "پایگاه استعلام سطح‌بندی تجهیزات نظارت تصویری" },
        { "name": "description", "content": "سامانه مرجع استعلام سطح‌بندی تجهیزات نظارت تصویری؛ برای استعلام سطح کیفیت، امنیت، پایداری و کارایی تجهیزات نظارت تصویری" },
        { "name": "keywords", "content": "استعلام,سطح‌بندی,دوربین مداربسته,کیفیت دوربین,گواهی اتحادیه,گواهی دوربین,خرید دوربین مداربسته,بهترین دوربین مداربسته,CCTV,Video Survillance,CCTV grade,دوربین مداربسته با کیفیت,دوربین مداربسته با کیفیت بالا,اتحادیه الکترونیک,تجهیز,نظارت تصویری,دوربین مداربسته,کیفیت دوربین,گواهی اتحادیه,گواهی دوربین,خرید دوربین مداربسته,بهترین دوربین مداربسته,ای‌گواهی,رتبه بندی دوربین های مداربسته,دوربین های مداربسته در ایران,چه دوربینی بخریم,بهترین دوربین ایرانی,ارزان ترین دوربین مداربسته,دوربین مداربسته ایرانی,استاندارد دوربین های مداربسته,پرفروش ترین دوربین مداربسته,بررسی اصالت دوربین مداربسته,بررسی اصالت قانونی دوربین مداربسته,کدام دوربین مداربسته اصل است,تشخیص اصالت دوربین مداربسته,نصب دوربین مداربسته,کارفرمای های دوربین های مداربسته,شرکت های تجهیزات نظارت تصویری,مناقصه تجهیزات نظارت تصویری,مناقصه دوربین مداربسته,نامه سازمان پدافند غیر عامل به بانک ها,رتبه بندی دی وی ار, دی وی ار در ایران,چه دی وی ار بخریم,بهترین دوربین ایرانی,ارزان ترین دی وی ار,دوربین مداربسته ایرانی,استاندارد دی وی ار,پرفروش ترین دی وی ار,بررسی اصالت دی وی ار,بررسی اصالت قانونی دی وی ار,کدام دی وی ار اصل است,تشخیص اصالت دی وی ار,نصب دی وی ار,کارفرمای های دوربین های مداربسته,شرکت های تجهیزات نظارت تصویری,مناقصه تجهیزات نظارت تصویری,مناقصه دی وی ار,نامه سازمان پدافند غیر عامل به بانک ها" },
    ],
    title: 'واکی'
}

const HeadManager = props => {


    const [fetchLoading, setFetchLoading] = React.useState(false);
    const { modal, toggle } = useModal();

    const createTag = async function () {
        await post(null, null, null, createTagRoute, form);
    }
    const { submitting, form, setForm, bind, handleSubmit: handleCreate, clear } = useForm(createTag, null, {})
    const [head, setHead] = useData('/metas', data => data.data);
    const [title, settitle] = React.useState(  )
    React.useEffect(() => {
        console.log(head != 'null')
        head == 'null' ?? settitle(head.data)
        console.log(title)
        return () => {

        }
    }, [])

    return (
        <CustomLoadingOverlay
            loading={fetchLoading}
        >
            <Container>
                <form onSubmit={handleCreate}>
                    <Card>
                        <CardHeader>
                            <div className="d-flex justify-content-between">
                                <span>تغییر تگ head صفحه landing</span>
                                <Button color="success" onClick={() => { clear(); toggle(); }}>ایجاد تگ</Button>
                            </div>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12" className="mt-4">
                                    <form onSubmit={handleCreate}>
                                        <Label>عنوان سایت</Label>
                                        <Input type="text" required {...bind('title')} value={title} />
                                        <h5 className="my-3">
                                            تگ های متا استفاده شده در لندینگ
                                        </h5>
                                        <div className="ltr text-left">
                                            <pre>
                                                <code className="language-html" data-lang="html">
                                                    <span className="cp">&lt;!doctype html&gt;</span><br />
                                                    <span className="nt">&lt;title</span><span className="nt">&gt;</span>{fakeHead.title}<span className="nt">&lt;title</span><span className="nt">&gt;</span><br />
                                                    {
                                                        fakeHead.meta && fakeHead.meta.map(tag => (
                                                            <a className="cursor-pointer" onClick={() => { setForm(tag); toggle(); }}><span className="nt">&lt;meta</span> <span className="na">name=</span><span className="s">"{tag.name}"</span> <span className="na">content=</span><span className="s">"{tag.content}"</span><span className="nt">&gt;</span><br /></a>
                                                        ))
                                                    }
                                                </code>
                                            </pre>
                                        </div>
                                        <hr className="my-3" />

                                        <LaddaButton loading={submitting} color="primary">تغییر عنوان سایت</LaddaButton>
                                    </form>
                                </Col>
                            </Row>
                        </CardBody>

                    </Card>
                </form>
            </Container>
            <Modal isOpen={modal} toggle={toggle} size="lg" >
                <form onSubmit={handleCreate}>
                    <ModalHeader toggle={toggle}>اطلاعات صورت سفارش</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label>name</Label>
                            <Input type="text" placeholder="نام تگ را وارد کنید" {...bind("name")} />
                        </FormGroup>

                        <FormGroup>
                            <Label>content</Label>
                            <Input type="text" placeholder="محتوای تگ را وارد کنید" {...bind("content")} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <LaddaButton className="ltr" loading={submitting} color="primary" type="submit" size="lg">ایجاد تگ</LaddaButton>{' '}
                    </ModalFooter>
                </form>
            </Modal>
        </CustomLoadingOverlay>
    )
}

export default HeadManager;