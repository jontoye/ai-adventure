import React, { Component } from "react";

export default class ProfileImage extends Component {
  render() {
    return <img className='preview-image' src={this.props.image} alt='' />;
  }
}
