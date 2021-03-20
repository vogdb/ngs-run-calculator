import React from 'react';


export default class ConfirmButton extends React.Component {

  static RESET_TIME_MS = 3000;

  state = {
    clicked: false
  };

  timeout: number;

  handleClick = () => {
    clearTimeout(this.timeout);
    if (this.state.clicked) {
      this.reset();
    } else {
      this.timeout = setTimeout(() => this.reset(), ConfirmButton.RESET_TIME_MS) as unknown as number;
      this.setState({clicked: true})
    }
  };

  reset = () => {
    this.setState({clicked: false})
  };

  render = () => {
    const children = this.props.children;
    if (children && typeof children === 'function') {
      return <span onClick={this.handleClick}>{children(this)}</span>;
    } else {
      return null;
    }
  }
}