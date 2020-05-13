import React from "react";
import {
    Row, Col, Label, Input, FormGroup, Button, Collapse
} from "reactstrap";
import Switch from "react-switch";

import classnames from "classnames";
import Checkbox from "components/Checkbox/Checkbox";
import Axios from "axios";
import Select from "react-select";
let counter = 0;

const userFilterOptions = {
    sex: {
        value: false,
        label: 'جنسیت',
        type: 'options',
        options: [
            {
                label: 'پسر',
                name: 'boy'
            },
            {
                label: 'دختر',
                name: 'girl'
            },

        ]
    },
    age: {
        label: 'سن',
        value: false,
        type: 'min_max'
    },

    salary: {
        label: 'درامد',
        value: false,
        type: 'min_max'
    },

    step: {
        label: 'قدم',
        value: false,
        type: 'min_max'
    },

    platform: {
        label: 'پلتفرم',
        value: false,
        type: 'options',
        options: [
            {
                label: 'اندروید',
                name: 'android'
            },
            {
                label: 'ios',
                name: 'ios'
            },

        ]
    }
}

const marketFilterOptions = {
    category: {
        value: false,
        label: 'دسته بندی',
        type: 'select-category',
        
        
    },
    sale: {
        label: 'فروش',
        value: false,
        type: 'min_max'
    },

    discount: {
        label: 'درصد تخفیف',
        value: false,
        type: 'min_max'
    },

    benifit: {
        label: 'سود',
        value: false,
        type: 'min_max'
    },

    debt: {
        label: 'بدهکاری به واکی',
        value: false,
        type: 'min_max',

    }
}

const Dummy = props => {

    const { filter, setFilter, handleSubmit } = props;
    const [userIsOpen, setUserIsOpen] = React.useState(false);
    const [marketIsOpen, setMarketIsOpen] = React.useState(false);

    const [businessType, setBusinessType] = React.useState([]);
    const [bussinessLoading, setBussinesLoading] = React.useState(false);


    React.useState(() => {
        // we should fetch select options
        setBussinesLoading(true);
        Axios.get('/init').then(
            ({ data }) => {
                if (data.status) {
                    setBusinessType(data.businesses)
                }
            }
        ).finally(() => setBussinesLoading(false))

    }, [])

    const handleUsersChange = function (e) {
        if (!filter.users.checked) {
            setFilter({ ...filter, users: { checked: false } });
            return;
        }
        if (e.target.type === 'checkbox') {
            const name = e.target.name;
            const checked = e.target.checked;
            setFilter({
                ...filter, users: {
                    ...filter.users,
                    [name]: checked
                }
            })
        }

        else if (e.target.type === 'number') {
            const name = e.target.name;
            const value = e.target.value;
            setFilter({
                ...filter, users: {
                    ...filter.users,
                    [name]: value
                }
            })
        }
    }

    const handleMarketsChange = function (e) {
        if (!filter.markets.checked) {
            setFilter({ ...filter, markets: { checked: false } });
            return
        }
        if (e.target.type === 'checkbox') {
            const name = e.target.name;
            const checked = e.target.checked;
            setFilter({
                ...filter, markets: {
                    ...filter.markets,
                    [name]: checked
                }
            })
        }

        else if (e.target.type === 'number') {
            const name = e.target.name;
            const value = e.target.value;
            setFilter({
                ...filter, markets: {
                    ...filter.markets,
                    [name]: value
                }
            })
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Row className="shadow rounded mb-4 mx-1">
                <Col xs="12" className="padding-x-3">
                    <FormGroup className={classnames("d-flex justify-content-between w-100 h-100 align-items-center px-0", { 'border-bottom': userIsOpen })}>
                        <span className="text-muted">
                            کاربران
                        </span>
                        {/* <Input type="checkbox" name="users" checked={filter.users.checked} onChange={(e) => setFilter({ ...filter, users: { checked: e.target.checked } })} /> */}

                        <Switch
                            checked={filter.users.checked}
                            onChange={(checked) => {
                                setUserIsOpen(checked)
                                setFilter({ ...filter, users: { checked } })
                            }}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                        // className="react-switch"
                        />
                    </FormGroup>
                </Col>
                <Collapse
                    isOpen={userIsOpen}
                >
                    <Row className="padding-x-3 py-2 justify-content-between mt-3">
                        {
                            Object.entries(userFilterOptions).map(([key, value], index) => {
                                switch (value.type) {
                                    case "options":
                                        return (
                                            <Col xs="12" lg="2" key={'options' + index} className="mb-3">
                                                <Checkbox name={key} checked={filter.users[key] && filter.users.checked} onChange={handleUsersChange} label={value.label} />
                                                {
                                                    value.options.map(option => (
                                                        <Checkbox disabled={(!filter.users[key] || !filter.users.checked)} name={option.name} checked={filter.users[option.name] && filter.users[key] && filter.users.checked} onChange={handleUsersChange} label={option.label} />
                                                    ))
                                                }
                                            </Col>
                                        );
                                    case "min_max":
                                        return (
                                            <Col xs="12" lg="2" key={'min_max' + index} className="mb-3">
                                                <Checkbox label={value.label} name={key} checked={(filter.users[key] && filter.users.checked)} onChange={(e) => filter.users.checked ? handleUsersChange(e) : e.preventDefault()} />
                                                <Row>
                                                    <Col>
                                                        <Input disabled={(!filter.users.checked || !filter.users[key])} type="number" min="1" name={"min_" + key} value={filter["min_" + key]} onChange={handleUsersChange} placeholder='از' />
                                                    </Col>
                                                    <Col>
                                                        <Input disabled={(!filter.users.checked || !filter.users[key])} type="number" min="1" name={"max_" + key} value={filter["max_" + key]} onChange={handleUsersChange} placeholder='تا' />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        );
                                }

                            })
                        }
                    </Row>
                </Collapse>
            </Row>

            {/* for markets */}
            <Row className="shadow rounded mb-4 mx-1">
                <Col xs="12" className="padding-x-3">
                    <FormGroup className={classnames("d-flex justify-content-between w-100 h-100 align-items-center px-0", { 'border-bottom': marketIsOpen })}>
                        <span className="text-muted">
                            مارکت ها
                        </span>
                        {/* <Input type="checkbox" name="markets" checked={filter.markets.checked} onChange={(e) => setFilter({ ...filter, markets: { checked: e.target.checked } })} /> */}
                        <Switch
                            checked={filter.markets.checked}
                            onChange={(checked) => {
                                setMarketIsOpen(checked)
                                setFilter({ ...filter, markets: { checked } })
                            }}
                            onColor="#86d3ff"
                            onHandleColor="#2693e6"
                            handleDiameter={30}
                            uncheckedIcon={false}
                            checkedIcon={false}
                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                            height={20}
                            width={48}
                        // className="react-switch"
                        />
                    </FormGroup>
                </Col>
                <Collapse
                    isOpen={marketIsOpen}
                >
                    <Row className="padding-x-3 py-2 justify-content-between mt-3">

                        {
                            Object.entries(marketFilterOptions).map(([key, value], index) => {
                                switch (value.type) {
                                    case "options":
                                        return (
                                            <Col xs="12" lg="2" key={'markets_options' + index} className="mb-3">
                                                <Checkbox label={value.label} name={key} checked={filter.markets[key] && filter.markets.checked} onChange={(e) => filter.markets.checked ? handleMarketsChange(e) : e.preventDefault()} />
                                                {
                                                    value.options.map((option, index) => (
                                                        <Checkbox label={option.label} disabled={!filter.markets[key] || !filter.markets.checked} name={option.name} checked={filter.markets[option.name] && filter.markets[key] && filter.markets.checked} onChange={handleMarketsChange} />
                                                    ))
                                                }
                                            </Col>
                                        );
                                    case "min_max":
                                        return (
                                            <Col xs="12" lg="2" key={'markets_min_max' + index} className="mb-3">
                                                <Checkbox label={value.label} name={key} checked={filter.markets[key] && filter.markets.checked} onChange={(e) => filter.markets.checked ? handleMarketsChange(e) : e.preventDefault()} />
                                                <Row>
                                                    <Col>
                                                        <Input disabled={!filter.markets[key] || !filter.markets.checked} type="number" min="1" name={"min_" + key} value={filter["min_" + key]} onChange={handleMarketsChange} placeholder='از' />
                                                    </Col>
                                                    <Col>
                                                        <Input disabled={!filter.markets[key] || !filter.markets.checked} type="number" min="1" name={"max_" + key} value={filter["max_" + key]} onChange={handleMarketsChange} placeholder='تا' />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        );


                                    case "select-category":
                                        return (
                                            <Col xs="12" key={'select' + index} className="mb-3">
                                                <Select
                                                    isLoading={bussinessLoading}
                                                    onChange={(args) => {
                                                        if (!filter.markets.checked) {
                                                            setFilter({ ...filter, markets: { checked: false } });
                                                            return
                                                        }
                                                        // now problem is fasc dont have value property 
                                                        if (!Array.isArray(args)) {
                                                            setFilter({
                                                                ...filter, markets: {
                                                                    ...filter.markets,
                                                                    bussinessTypes: []
                                                                }
                                                            })
                                                            return ;
                                                        }

                                                        const array = [];
                                                        args.forEach(arg => array.push(arg.value))

                                                        setFilter({
                                                            ...filter, markets: {
                                                                ...filter.markets,
                                                                bussinessTypes: array
                                                            }
                                                        })
                                                    }}
                                                    options={businessType}
                                                    placeholder="دسته بندی را وارد کنید"
                                                    isSearchable={false}
                                                    isRtl
                                                    isMulti
                                                />
                                            </Col>
                                        );
                                }

                            })
                        }
                    </Row>
                </Collapse>
            </Row>
            <Button color="primary" type="submit" className="mb-5 mx-1">اعمال فیلتر</Button>
        </form>
    )
}

export default Dummy;