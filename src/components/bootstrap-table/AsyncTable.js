import React from "react";
import CustomTable from "./index";
import paginationFactory from "react-bootstrap-table2-paginator";
import User from "views/Users/User";
import UserMarketFilter from "./UserMarketFilter";
import ColumnFilter from "./ColumnFilter";
import { Row, Col } from "reactstrap";
import MobileTable from "./MobileTable";
const axios = require("axios").default;

const initialFilter = {
  users: {
    checked: false
  },
  markets: {
    checked: false
  }
};

const initialFilterColumn = {};

export default class AsyncTable extends React.Component {
  state = {
    loading: false,
    data: [],
    page: 1,
    sizePerPage: 7,
    total: 0,
    filter: initialFilter,
    filterColumn: initialFilterColumn
  };
  componentDidMount() {
    var res = this.loadGrid();
  
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.loadGrid();

    }
  }
  fetchData = async () => {
    let params = {
      page: this.state.page,
      limit: this.state.sizePerPage
    };

    if (this.props.params) {
      params = Object.assign({}, params, this.props.params);
    }

    if (this.props.userMarketsFilter) {
      params = Object.assign({}, params, this.state.filter);
    }

    if (this.props.columnFilter) {
      params = Object.assign({}, params, this.state.filterColumn);
    }


    const res = await axios.get(this.props.url, {
      params
    });
    console.log("res from async table", res);
    if ("data" in res && res.data.total !== 0) {
      this.setState({ total: res.data.total });
    }

    // maybe we have diffrent styles
    else if ("data" in res && res.data.count !== 0) {
      this.setState({ total: res.data.count });
    }

    const fetchedData = res.data.data;
      
    return fetchedData && Array.isArray(fetchedData) ? fetchedData : [];

  };
  loadGrid = () => {
    this.setState({ loading: true });
    this.fetchData()
      .then(data => this.setState({ data }))
      .finally(() => {
        this.setState({ loading: false });
      });
  };
  handleTableChange = (type, { page, sizePerPage }) => {
    this.setState({ page });
    this.setState({ sizePerPage });
  };

  // we want to fetch after we update the page

  handleSubmit = e => {
    e.preventDefault();
    console.log("this.state", this.state);

    this.loadGrid();
  };

  handleSubmitColumn = e => {
    e.preventDefault();

    this.loadGrid();
  };
  setFilter = filter => {
    this.setState({ filter });
  };

  setFilterColumn = filterColumn => {
    this.setState({ filterColumn });
  };
  nextPage = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  previousPage = () => {
    this.setState(state => ({ page: state.page - 1 }));
  };

  render() {
    const {
      userMarketsFilter,
      columnFilter,
      columns,
      ...otherProps
    } = this.props;
    const {
      filter,
      filterColumn,
      data,
      page,
      sizePerPage,
      total,
      loading
    } = this.state;
    return (
      <Row>
        <Col xs="12">
          {userMarketsFilter && (
            <UserMarketFilter
              filter={filter}
              setFilter={this.setFilter}
              handleSubmit={this.handleSubmit}
            />
          )}
        </Col>
        <Col xs="12">
          {columnFilter && (
            <ColumnFilter
              columns={this.props.columns}
              filter={filterColumn}
              setFilter={this.setFilterColumn}
              handleSubmit={this.handleSubmitColumn}
            />
          )}
        </Col>

        <Col className="d-lg-none">
          <MobileTable
            data={data}
            nextPage={this.nextPage}
            previousPage={this.previousPage}
            columns={columns.filter(col => !col.notRender)}
            {...otherProps}
          />
        </Col>

        <Col xs="12" className="d-md-down-none">
          <CustomTable
            // keyField='id'
            columns={columns.filter(col => !col.notRender)}
            {...otherProps}
            data={data}
            loading={loading}
            // remote
            pagination={paginationFactory({
              page,
              total,
              sizePerPage,
              sizePerPageList: []
            })}
            onTableChange={this.handleTableChange}
          />
        </Col>
      </Row>
    );
  }
}
