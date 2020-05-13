import React from "react";
import {
    Row, Col, Label, Input, Button
} from "reactstrap";
import {
    DateRangePicker,
} from "react-advance-jalaali-datepicker";


const ColumnFilter = props => {
    const { columns, filter, setFilter, handleSubmit } = props;

    const handleChange = function (e) {
        const name = e.target.name;
        const value = e.target.value;
        setFilter({ ...filter, [name]: value })
    }

    function changeStart(dateField, unix, formatted) {
        console.log(unix); // returns timestamp of the selected value, for example.
        console.log(formatted); // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".

        setFilter({ ...filter, ['min_' + dateField]: unix })

    }


    function changeEnd(dateField, unix, formatted) {
        console.log(unix); // returns timestamp of the selected value, for example.
        console.log(formatted); // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".

        setFilter({ ...filter, ['max_' + dateField]: unix })

    }

    const handleSelectChange = function (dataField, data, option) {
        console.log('selected', data)
        setFilter({ ...filter, [dataField]: data.name })
        // }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Row className="align-items-center">
                {
                    columns.map((column, index) => {
                        switch (column.remoteFilter) {
                            case 'text':
                                return (
                                    <Col xs="12" md="4" key={"filter_col" + index} className="my-3">
                                        <Label>{column.text}</Label>
                                        <Input
                                            name={column.dataField}
                                            value={filter[column.dataField]}
                                            onChange={handleChange}
                                            placeholder={`${column.text} را وارد کنید`}
                                        />
                                    </Col>
                                )
                            case "min_max":
                                return (
                                    <Col xs="12" md="4" key={'min_max_filter' + index}>
                                        <Label>{column.text}</Label>
                                        <Row>
                                            <Col>
                                                <Input type="number" min="1" name={"min_" + column.dataField} value={filter["min_" + column.dataField]} onChange={handleChange} placeholder='از' />
                                            </Col>
                                            <Col>
                                                <Input type="number" min="1" name={"max_" + column.dataField} value={filter["max_" + column.dataField]} onChange={handleChange} placeholder='تا' />
                                            </Col>
                                        </Row>
                                    </Col>
                                )

                            case "rangeDatepicker":
                                return (
                                    <Col xs="12" md="4" key={'date_picker' + index} className="px-1 my-3">
                                        <Label>{column.text}</Label>
                                        <Row className="justify-content-start pl-2">
                                            <DateRangePicker
                                                placeholderStart="تاریخ شروع"
                                                placeholderEnd="تاریخ پایان"
                                                format="jYYYY/jMM/jDD"

                                                onChangeStart={(...args) => { changeStart(column.dataField, ...args) }}
                                                onChangeEnd={(...args) => { changeEnd(column.dataField, ...args) }}
                                                idStart={"rangePickerStart" + column.dataField}
                                                idEnd={"rangePickerEnd" + column.dataField}
                                                containerClass="datepicker-input"
                                            />

                                        </Row>
                                    </Col>

                                )
                            case "select":
                                return (
                                    <Col xs="12" md="4" key={'select' + index} className="my-3">
                                        <Label>{column.text}</Label>
                                        <Input
                                            type="select"
                                            name={column.dataField}
                                            onChange={handleChange}
                                            placeholder={`نوع ${column.text} را واردکنید`}
                                        >
                                            {
                                                column.selectOptions.map(
                                                    (option, index) => (
                                                        <option key={'select_option' + index} value={option.name}>{option.label}</option>
                                                    )
                                                )
                                            }
                                        </Input>
                                    </Col>

                                )
                        }
                    })
                }

            </Row>
            <Button color="primary" type="submit" className="my-2">اعمال فیلتر</Button>
        </form>
    )


}

export default ColumnFilter;