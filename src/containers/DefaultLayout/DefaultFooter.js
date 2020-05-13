import React, { Component } from 'react';
import { Col, Row } from "reactstrap";

function DefaultFooter (){
  return (
    <Row className="w-100">
      <Col md="3" xs="12" className="text-center"><a href="#">waki website</a> &copy; 2019 waki</Col>
      <Col md="3" xs="12" className="margin-right-auto text-center">Powered by <a href="#">waki</a></Col>
    </Row>
  );
}

export default DefaultFooter;
