import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/Logo-Horizental.png'
import { userContext } from 'contexts/user/user.context';
// import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const DefaultHeader = props => {
  // eslint-disable-next-line
  const { children, ...attributes } = props;
  const { user } = React.useContext(userContext);
  console.log('user', user)
  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      <AppNavbarBrand
        full={{ src: logo, width: 100, height: 100, alt: 'waki log' }}
      />
      <AppSidebarToggler className="d-md-down-none" display="lg" />

      {/* <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink to="/settings/application" className="nav-link">Settings</NavLink>
          </NavItem>
        </Nav> */}
      <Nav className="margin-right-auto" navbar>

        {/* <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav className="mt-2">
            <i className="icon-bell  font-2xl"></i><Badge pill color="danger">5</Badge>
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header tag="div" className="text-center"><strong>new</strong></DropdownItem>
            <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
            <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
            <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
            <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            <img src={'../../assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem header tag="div" className="text-center"><strong>amir karimi</strong></DropdownItem>
            <DropdownItem onClick={e => props.history.push(`/settings/general/edit_manager/${user.slug}`)}><i className="fa fa-user"></i> پروفایل</DropdownItem>
            <DropdownItem onClick={e => props.onLogout(e)}><i className="fa fa-lock"></i> خروج</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
      {/* <AppAsideToggler className="d-md-down-none" /> */}
      {/*<AppAsideToggler className="d-lg-none" mobile />*/}
    </React.Fragment>
  );
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
