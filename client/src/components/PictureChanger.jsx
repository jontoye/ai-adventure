import React, { Component } from "react";
import ProfileImage from "./ProfileImage";
import "./css/PictureChanger.css";

export default class PictureChanger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [
        "/images/profiles/user2.png",
        "/images/profiles/user3.png",
        "/images/profiles/user5.png",
        "/images/profiles/user6.png",
        "/images/profiles/user7.png",
        "/images/profiles/user8.png",
        "/images/profiles/user9.png",
        "/images/profiles/user10.png",
        "/images/profiles/user11.png",
        "/images/profiles/user12.png",
        "/images/profiles/user13.png",
        "/images/profiles/user14.png",
        "/images/profiles/user15.png",
        "/images/profiles/user16.png",
        "/images/profiles/user17.png",
        "/images/profiles/user18.png",
        "/images/profiles/user19.png",
        "/images/profiles/user20.png",
        "/images/profiles/user21.png",
        "/images/profiles/user22.png",
        "/images/profiles/user23.png",
        "/images/profiles/user24.png",
        "/images/profiles/user25.png",
        "/images/profiles/user26.jpg",
      ],
    };
  }

  render() {
    const images = this.state.images.map((image, index) => {
      return (
        <ProfileImage image={image} changeUserImg={this.props.changeUserImg} />
      );
    });
    return <div className='images-holder'>{images}</div>;
  }
}
