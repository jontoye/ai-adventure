import React, { Component } from "react";
import "./css/ProfileImage.css";

export default class ProfileImage extends Component {
  render() {
    return <img className='preview-image' src={this.props.image} onClick={() => this.props.changeUserImg(this.props.image)} alt='' />;
  }
}
