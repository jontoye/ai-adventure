import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/Profile.css";
import PictureChanger from "./PictureChanger";
import { Modal, Button } from "react-bootstrap";

function Profile({ currentUser }) {
  const [user, setUser] = useState({
    friends: [],
    followers: [],
    following: [],
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let params = useParams();

  useEffect(() => {
    // Get info for user who's profile currently showing
    getUser(params.userId);
  }, [params.userId]);

  const getUser = async (id) => {
    try {
      const response = await axios.get(`/profile/${id}`);
      setUser(response.data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFriendClick = () => {
    const addFriend = async () => {
      // adds friend to each user
      await axios.post(`/profile/${params.userId}/addsocial`, {
        user: currentUser.id,
        add: "friend",
      });
      await axios.post(`/profile/${currentUser.id}/addsocial`, {
        user: params.userId,
        add: "friend",
      });
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
      });
      await axios.post(`/profile/${currentUser.id}/removesocial`, {
        user: params.userId,
        remove: "friend",
      });
      getUser(params.userId);
    };
    removeFriend();
  };

  const handleFollowClick = () => {
    const addFollower = async () => {
      await axios.post(`/profile/${params.userId}/addsocial`, {
        user: currentUser.id,
        add: "follower",
      });
      getUser(params.userId);
    };
    const addFollowing = async () => {
      await axios.post(`/profile/${currentUser.id}/addsocial`, {
        user: params.userId,
        add: "following",
      });
    };

    addFollower();
    addFollowing();
  };

  const handleUnfollowClick = () => {
    const removeFollower = async () => {
      await axios.post(`/profile/${params.userId}/removesocial`, {
        user: currentUser.id,
        remove: "follower",
      });
      getUser(params.userId);
    };
    const removeFollowing = async () => {
      await axios.post(`/profile/${currentUser.id}/removesocial`, {
        user: params.userId,
        remove: "following",
      });
    };

    removeFollower();
    removeFollowing();
  };

  const changeUserImg = async (imgUrl) => {
    await axios.put(`/profile/${currentUser.id}/avatar`, { avatar: imgUrl });
    getUser(params.userId);
    setShow(false);
  };

  return (
    <div className='section-profile container py-3'>
      <h1>{user.username}'s Profile Page</h1>
      <img
        src={user.avatar}
        alt='profile-img'
        className='profile-img circular-square '
      />

      {params.userId !== currentUser.id && (
        <div className='row mb-5'>
          <div className='d-flex col-4 mx-auto justify-content-between'>
            {!user.followers.includes(currentUser.id) ? (
              <Link to='#'>
                <div className='social-button d-flex'>
                  <img
                    src='/images/icons/follow.png'
                    alt='follow'
                    onClick={handleFollowClick}
                  />
                </div>
              </Link>
            ) : (
              <Link to='#'>
                <div className='social-button d-flex'>
                  <img
                    src='/images/icons/unfollow.png'
                    alt='unfollow'
                    onClick={handleUnfollowClick}
                  />
                </div>
              </Link>
            )}
            {!user.friends.includes(currentUser.id) ? (
              <Link to='#'>
                <div className='social-button d-flex'>
                  <img
                    src='/images/icons/add-friend.png'
                    alt='add-friend'
                    onClick={handleFriendClick}
                  />
                </div>
              </Link>
            ) : (
              <Link to='#'>
                <div className='social-button d-flex'>
                  <img
                    src='/images/icons/unfriend.png'
                    alt='remove-friend'
                    onClick={handleUnfriendClick}
                  />
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      <div className='row'>
        <div className='profile-connections d-flex col-7 mx-auto justify-content-between mb-4'>
          <h4>{user.followers.length} Followers</h4>
          <h4>{user.following.length} Following</h4>
          <h4>{user.friends.length} Friends</h4>
        </div>
      </div>

      {params.userId === currentUser.id && (
        <div>
          <>
            <Button className='center' variant='primary' onClick={handleShow}>
              Change Profile Image
            </Button>

            <Modal size='xl' show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Select Your Profile Image</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <PictureChanger changeUserImg={changeUserImg}></PictureChanger>
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                  Close
                </Button>
                <Button variant='primary' onClick={handleClose}>
                  Save Changes
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
      <div className='row text-center'>
        <div className='col-6 mx-auto'>
          <div className='display-6'>Biography</div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            doloribus, beatae minus aliquam facere hic animi accusamus neque
            libero, molestias minima ipsa debitis molestiae veritatis obcaecati
            iste quod et aspernatur?
          </p>
          <div className='display-6'>Activity</div>
          <p>Updated adventure [name] (3 mins ago)</p>
          <p>Created adventure [name] (yesterday)</p>
          <p>Created character [name] (2 days ago)</p>
          <div className='display-6'>Achievements</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
