import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/Profile.css";
import PictureChanger from "./PictureChanger";
import { Modal, Button, Tooltip, OverlayTrigger } from "react-bootstrap";


function Profile({ currentUser }) {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  }
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState("");
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const handleBioClick = async () => {
    if (edit) {
      // save to database
      await axios.post(`/profile/${currentUser.id}/biography`, {biography: bio}, {headers})
      getUser(params.userId)
    }

    setEdit(!edit)
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  }

  let params = useParams();

  useEffect(() => {
    // Get info for user who's profile currently showing
    getUser(params.userId)
  },[]);

  const getUser = async (id) => {
    axios.get(`/profile/${id}`, {headers})
    .then(response => {
      setUser(response.data.user);
      setBio(response.data.user.biography)
      }) 
      .catch(err => {
        console.error(err);
      })
  };

  const handleFriendClick = () => {
    const addFriend = async () => {
      // adds friend to each user
      await axios.post(`/profile/${params.userId}/addsocial`, {
        user: currentUser.id,
        add: "friend",
      }, {headers});
      await axios.post(`/profile/${currentUser.id}/addsocial`, {
        user: params.userId,
        add: "friend",
      }, {headers});
      getUser(params.userId);
    };
    addFriend();
  };

  const handleUnfriendClick = () => {
    const removeFriend = async () => {
      // removes friends from each user
      await axios.post(`/profile/${params.userId}/removesocial`, {
        user: currentUser.id,
        remove: "friend",
      }, {headers});
      await axios.post(`/profile/${currentUser.id}/removesocial`, {
        user: params.userId,
        remove: "friend",
      }, {headers});
      getUser(params.userId);
    };
    removeFriend();
  };

  const handleFollowClick = () => {
    const addFollower = async () => {
      await axios.post(`/profile/${params.userId}/addsocial`, {
        user: currentUser.id,
        add: "follower",
      }, {headers});
      getUser(params.userId);
    };
    const addFollowing = async () => {
      await axios.post(`/profile/${currentUser.id}/addsocial`, {
        user: params.userId,
        add: "following",
      }, {headers});
    };

    addFollower();
    addFollowing();
  };

  const handleUnfollowClick = () => {
    const removeFollower = async () => {
      await axios.post(`/profile/${params.userId}/removesocial`, {
        user: currentUser.id,
        remove: "follower",
      }, {headers});
      getUser(params.userId);
    };
    const removeFollowing = async () => {
      await axios.post(`/profile/${currentUser.id}/removesocial`, {
        user: params.userId,
        remove: "following",
      }, {headers});
    };

    removeFollower();
    removeFollowing();
  };

  const changeUserImg = async (imgUrl) => {
    await axios.put(`/profile/${currentUser.id}/avatar`, { avatar: imgUrl }, {headers});
    getUser(params.userId);
    setShow(false);
  };

  const renderTooltip_follow = (info) => (
    <Tooltip {...info}>
      Follow me!
    </Tooltip>
  );

  const renderTooltip_unfollow = (info) => (
    <Tooltip {...info}>
      Unfollow me
    </Tooltip>
  );

  const renderTooltip_friend = (info) => (
    <Tooltip {...info}>
      Add me as your friend!
    </Tooltip>
  );

  const renderTooltip_unfriend = (info) => (
    <Tooltip {...info}>
      Unfriend me
    </Tooltip>
  );

  return (
    <div className='section-profile container py-3'>
      {user &&
      <>
        <h1 className="display-2">{user.username}</h1>
        <img
          src={user.avatar}
          alt='profile-img'
          className='profile-img circular-square '
        />

        {params.userId !== currentUser.id && (
          <div className='row mb-5'>
            <div className='profile-buttons d-flex col-6 col-lg-3 mx-auto justify-content-between'>
              {!user.followers.includes(currentUser.id) ? (
                <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip_follow}
                >
                  <div className='social-button d-flex'>
                    <img
                      src='/images/icons/follow.png'
                      alt='follow'
                      onClick={handleFollowClick}
                    />
                  </div>
                </OverlayTrigger>
              ) : (

                <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip_unfollow}
                >
                  <div className='social-button d-flex'>
                    <img
                      src='/images/icons/unfollow.png'
                      alt='unfollow'
                      onClick={handleUnfollowClick}
                    />
                  </div>
                </OverlayTrigger>

              )}
              {!user.friends.includes(currentUser.id) ? (

                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip_friend}
                >
                  <div className='social-button d-flex'>
                    <img
                      src='/images/icons/add-friend.png'
                      alt='friend'
                      onClick={handleFriendClick}
                    />
                  </div>
                </OverlayTrigger>

              ) : (

                <OverlayTrigger
                  placement="right"
                  delay={{ show: 250, hide: 400 }}
                  overlay={renderTooltip_unfriend}
                >
                  <div className='social-button d-flex'>
                    <img
                      src='/images/icons/unfriend.png'
                      alt='unfriend'
                      onClick={handleUnfriendClick}
                    />
                  </div>
                </OverlayTrigger>
     
              )}
            </div>
          </div>
          )}

          {params.userId === currentUser.id && (
            <div>
              <>
                <div className='center-me'>
                  <Button
                    className='center btn-light my-3'
                    variant='primary'
                    onClick={handleShow}
                  >
                    Change Profile Image
                  </Button>
                </div>
                <Modal size='xl' show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Select Your Profile Image</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <PictureChanger
                      changeUserImg={changeUserImg}
                    ></PictureChanger>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>

              <div className='row mb-5'>
                <div className='col-8 mx-auto d-flex justify-content-between'>
                  <Link to='/characters' className='display-6'>
                    My Characters
                  </Link>
                  <Link to='/adventure-list' className='display-6'>
                    My Adventures
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className='row'>
            <div className='profile-connections d-flex col-md-8 mx-auto justify-content-between mb-4'>
              <h4>{user.followers.length} Followers</h4>
              <h4>{user.following.length} Following</h4>
              <h4>{user.friends.length} Friends</h4>
            </div>
          </div>
          <div className='row text-center'>
            <div className='col-12 col-md-10 mx-auto'>
              <div className='display-5 mb-3'>Biography</div>
              {edit &&
                <textarea id="biography-input" rows="10" value={bio} onChange={handleBioChange}></textarea>
              }
              {!edit &&
                <p className="lead" id="biography">
                  {bio}
                </p>
              }
              {params.userId === currentUser.id &&
                <button className="btn btn-light my-3" onClick={handleBioClick}>
                  {edit ? 'Save' : 'Edit Bio'}
                </button>
              }
              <div className='display-6 my-4'>Activity</div>
              <p>Updated adventure [name] (3 mins ago)</p>
              <p>Created adventure [name] (yesterday)</p>
              <p>Created character [name] (2 days ago)</p>
              <div className='display-6'>Achievements</div>
            </div>
          </div>
        </>
        }
    </div>
  );
}

export default Profile;
