import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

import "./css/Banner.css";
import "./css/Profile.css";
import ProfileImage from "./ProfileImage";

function ImageSelect({ currentUser, setImage }) {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  const [redirect, setRedirect] = useState(false);

  const images = [
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
  ];

  //   let params = useParams();
  //   useEffect(() => {
  //   }, [params.userId]);

  const changeUserImg = async (imgUrl) => {
    await axios.put(
      `/profile/${currentUser.id}/avatar`,
      { avatar: imgUrl },
      { headers }
    );
    setImage(imgUrl);
    setRedirect(true);
  };

  const imageList = images.map((image, index) => {
    return (
      <ProfileImage image={image} key={index} changeUserImg={changeUserImg} />
    );
  });
  return (
    <div className='imageSelectScreen'>
      <h1>Select your profile image</h1>

      <div className='images-holder2'>{imageList}</div>
      <div>{redirect && <Navigate to='/' replace={true} />}</div>
    </div>
  );
}

export default ImageSelect;
