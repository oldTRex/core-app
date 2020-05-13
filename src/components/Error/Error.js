import React, { Component } from "react";

/**
 * it is a wrapper handle when component get errror show error component
 * @extends Component
 */
class Error extends Component {
  state = {
    error: false
  };
  componentDidCatch(error, info) {
    this.setState({
      error
    });
  }
  render() {
    const { error } = this.state;
    const { children } = this.props;
    return error ? (
      <h2>oops sth went wrong please refresh the browser</h2>
    ) : (
      children
    );
  }
}

export default Error;
