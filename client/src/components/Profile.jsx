import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/Banner.css";
import "./css/Profile.css";
import PictureChanger from "./PictureChanger";
import { Modal, Button, Tooltip, OverlayTrigger, Card } from "react-bootstrap";
import Axios from "axios";

export default function Profile({ currentUser, setMessage }) {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
  const [user, setUser] = useState();
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [bio, setBio] = useState("");
  const [achievement, setAchievement] = useState({
    title: "",
    img: "",
    description: "",
  });
  const [badges, setBadges] = useState({
    badge1: "achievement-badge unachieved",
    badge2: "achievement-badge unachieved",
    badge3: "achievement-badge unachieved",
    badge4: "achievement-badge unachieved",
    badge5: "achievement-badge unachieved",
    badge6: "achievement-badge unachieved",
    badge7: "achievement-badge unachieved",
    badge8: "achievement-badge unachieved",
    badge9: "achievement-badge unachieved",
  });

  let params = useParams();

  useEffect(() => {
    // Get info for user who's profile currently showing
    // loadAchievements();
    getUser(params.userId);
  }, [params.userId]);

  const achievement1 = (e) => {
    e.preventDefault();
    setAchievement({
      title: "Create a Character",
      img: "images/badges/rank-1.png",
      description: "Created your first Character! Good luck on your adventure",
    });
    setShow(true);
  };
  const achievement2 = (e) => {
    e.preventDefault();
    setAchievement({
      title: "Start an Adventure",
      img: "images/badges/ninja-heroic-stance.png",
      description:
        "The first step is always the hardest, but you've taken it. You've began an amazing adventure!",
    });
    setShow(true);
  };
  const achievement3 = (e) => {
    e.preventDefault();
    setAchievement({
      title: "I would code 100 miles",
      img: "images/badges/rank-2.png",
      description: "Played through 100 events",
    });
    setShow(true);
  };
  const achievement4 = (e) => {
    e.preventDefault();
    setAchievement({
      title: "Pro Adventurer",
      img: "images/badges/rank-3.png",
      description:
        "You have played for over 5 hours. Remember to take a break!",
    });
    setShow(true);
  };
  const achievement5 = (e) => {
    e.preventDefault();
    setAchievement({
      title: "10 Minutes in Heaven",
      img: "images/badges/dragon-head.png",
      description: "Play your first 10 minutes of AI Dungeon",
    });
    setShow(true);
  };
  const achievement6 = (e) => {
    e.preventDefault();
    setAchievement({
      title: "Copycat",
      img: "images/badges/sabers-choc.png",
      description: "Copy somone elses noble quest",
    });
    setShow(true);
  };
  const achievement7 = (e) => {
    e.preventDefault();
    setAchievement({
      title: "Doppleganger",
      img: "images/badges/sabers-choc.png",
      description: "Clone somone else character",
    });
    setShow(true);
  };
  const achievement8 = (e) => {
    e.preventDefault();
    setAchievement({
      title: "Play as Saad",
      img: "images/badges/drink-me.png",
      description: "Play as our brave leader throughout your mission",
    });
    setShow(true);
  };
  const achievement9 = (e) => {
    e.preventDefault();
    setAchievement({
      title: "Play as Marty",
      img: "images/badges/drink-me-2.png",
      description:
        "Play as the Marty, the brash warrior ready to conquer any quest",
    });
    setShow(true);
  };
  // const achievement10 = () => {
  //   setAchievement({
  //     title: "Play 5 adventures",
  //     img: "images/badges/wheat.png",
  //     description: "Thanks for joining us on your adventures!",
  //   });
  //   setShow(true);
  // };

  // const loadAchievements = async () => {
  //   Axios.get("users", {
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //     // id: params.userId,
  //   })
  //     .then((response) => {
  //       console.log("axios test", response);
  //       // console.log("currentUser.id", currentUser.id);
  //       console.log("params.userId", params.userId);
  //       let user = response.data.users.filter(
  //         (user) => currentUser.id === user._id
  //       );

  //     })
  //     .catch((err) => {
  //       console.log("Error fetching users.");
  //       console.log(err);
  //     });
  // };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBioClick = async () => {
    if (edit) {
      // save to database
      await axios.post(
        `/profile/${currentUser.id}/biography`,
        { biography: bio },
        { headers }
      );
      getUser(params.userId);
    }

    setEdit(!edit);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
    // getUser(params.userId)
  };

  const getUser = async (id) => {
    axios
      .get(`/profile/${id}`, { headers })
      .then((response) => {
        response.data.user.activity = response.data.user.activity.reverse();
        setUser(response.data.user);
        setBio(response.data.user.biography);
        let tempBadges = badges;
        for (let i = 1; i < 12; i++) {
          if (response.data.user.achievements.includes(i.toString())) {
            console.log("achievement detected:", i);
            let badgeID = `badge${i}`;

            tempBadges = {
              ...tempBadges,
              [badgeID]: "achievement-badge",
            };
            // console.log(tempBadges);
          }
        }
        setBadges({
          ...tempBadges,
        });
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.message, "danger");
      });
  };

  const handleFriendClick = () => {
    const addFriend = async () => {
      // adds friend to each user
      await axios
        .post(
          `/profile/${params.userId}/addsocial`,
          {
            user: currentUser.id,
            add: "friend",
          },
          { headers }
        )
        .catch((error) => {
          console.log(error);
        });
      await axios.post(
        `/profile/${currentUser.id}/addsocial`,
        {
          user: params.userId,
          add: "friend",
        },
        { headers }
      );
      getUser(params.userId);
    };
    addFriend();
  };

  const handleUnfriendClick = () => {
    const removeFriend = async () => {
      // removes friends from each user
      await axios
        .post(
          `/profile/${params.userId}/removesocial`,
          {
            user: currentUser.id,
            remove: "friend",
          },
          { headers }
        )
        .catch((error) => {
          console.log(error);
        });
      await axios.post(
        `/profile/${currentUser.id}/removesocial`,
        {
          user: params.userId,
          remove: "friend",
        },
        { headers }
      );
      getUser(params.userId);
    };
    removeFriend();
  };

  const handleFollowClick = () => {
    const addFollower = async () => {
      await axios.post(
        `/profile/${params.userId}/addsocial`,
        {
          user: currentUser.id,
          add: "follower",
        },
        { headers }
      );
      getUser(params.userId);
    };
    const addFollowing = async () => {
      await axios.post(
        `/profile/${currentUser.id}/addsocial`,
        {
          user: params.userId,
          add: "following",
        },
        { headers }
      );
    };

    addFollower();
    addFollowing();
  };

  const handleUnfollowClick = () => {
    const removeFollower = async () => {
      await axios.post(
        `/profile/${params.userId}/removesocial`,
        {
          user: currentUser.id,
          remove: "follower",
        },
        { headers }
      );
      getUser(params.userId);
    };
    const removeFollowing = async () => {
      await axios.post(
        `/profile/${currentUser.id}/removesocial`,
        {
          user: params.userId,
          remove: "following",
        },
        { headers }
      );
    };

    removeFollower();
    removeFollowing();
  };

  const changeUserImg = async (imgUrl) => {
    await axios.put(
      `/profile/${currentUser.id}/avatar`,
      { avatar: imgUrl },
      { headers }
    );
    getUser(params.userId);
    setShow(false);
  };

  const renderTooltip_follow = (info) => (
    <Tooltip {...info}>Follow me!</Tooltip>
  );

  const renderTooltip_unfollow = (info) => (
    <Tooltip {...info}>Unfollow me</Tooltip>
  );

  const renderTooltip_friend = (info) => (
    <Tooltip {...info}>Add me as your friend!</Tooltip>
  );

  const renderTooltip_unfriend = (info) => (
    <Tooltip {...info}>Unfriend me</Tooltip>
  );

  return (
    <div className='section-profile container py-3'>
      {user && (
        <>
          <div className='profile-header container-fluid'>
            <h1 className='display-2 profile-title py-3'>{user.username}</h1>
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
                      placement='right'
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
                      placement='right'
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
                      placement='right'
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
                      placement='right'
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
                      className='center btn-light btn-lg my-3'
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
                  <div className='col-md-9 col-xl-6 mx-auto d-flex justify-content-between'>
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
          </div>

          <div className='row text-center py-5'>
            <div className='col-12 col-md-10 mx-auto'>
              <div className='display-5 mb-3'>About Me</div>
              {edit && (
                <textarea
                  id='biography-input'
                  rows='10'
                  value={bio}
                  onChange={handleBioChange}
                ></textarea>
              )}
              {!edit && (
                <p className='lead' id='biography'>
                  {bio}
                </p>
              )}
              {params.userId === currentUser.id && (
                <button
                  className='btn btn-light my-3 edit-btn'
                  onClick={handleBioClick}
                >
                  {edit ? "Save" : "Edit Bio"}
                </button>
              )}
              <div className='display-6 my-4'>Recent Activity</div>
              <div className='activity-log'>
                {user.activity &&
                  user.activity
                    .slice(0, 10)
                    .map((event, index) => <p key={index}>{event}</p>)}
              </div>
              <div className='achievement-list'>
                <Card className='banner__achievement-card'>
                  <Card.Body>
                    <h2>Achievements</h2>
                    <div className='achievement-list'>
                      <button id='achievement-button' onClick={achievement1}>
                        <img
                          className={badges.badge1}
                          src='/images/badges/rank-1.png'
                          alt='Achievement 1'
                          title='Create a Character'
                        />
                      </button>
                      <button id='achievement-button' onClick={achievement2}>
                        <img
                          className={badges.badge2}
                          src='/images/badges/ninja-heroic-stance.png'
                          alt='Achievement 2'
                          title='Start an Adventure'
                        />
                      </button>
                      <button id='achievement-button' onClick={achievement3}>
                        <img
                          className={badges.badge3}
                          src='/images/badges/rank-2.png'
                          alt='Achievement 3'
                          title='I would code 100 miles'
                        />
                      </button>
                      <button id='achievement-button' onClick={achievement4}>
                        <img
                          className={badges.badge4}
                          src='/images/badges/rank-3.png'
                          alt='Achievement 4'
                          title='Pro Adventurer'
                        />
                      </button>
                      <button id='achievement-button' onClick={achievement5}>
                        <img
                          className={badges.badge5}
                          src='/images/badges/dragon-head.png'
                          alt='Achievement 5'
                          title='10 Minutes in Heaven'
                        />
                      </button>
                      <button id='achievement-button' onClick={achievement6}>
                        <img
                          className={badges.badge6}
                          src='/images/badges/sabers-choc.png'
                          alt='Achievement 6'
                          title='Copycat'
                        />
                      </button>
                      <button id='achievement-button' onClick={achievement7}>
                        <img
                          className={badges.badge7}
                          src='/images/badges/drink-me.png'
                          alt='Achievement 7'
                          title='Doppleganger'
                        />
                      </button>
                      <button id='achievement-button' onClick={achievement8}>
                        <img
                          className={badges.badge8}
                          src='/images/badges/drink-me-2.png'
                          alt='Achievement 8'
                          title='Saad'
                        />
                      </button>
                      <button id='achievement-button' onClick={achievement9}>
                        <img
                          className={badges.badge9}
                          src='/images/badges/wheat.png'
                          alt='Achievement 9'
                          title='Martin'
                        />
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </>
      )}
      <Modal show={show} onHide={handleClose} id='achievement-modal'>
        <Modal.Header closeButton>
          <Modal.Title>{achievement.title}</Modal.Title>
        </Modal.Header>
        <img
          width='300px'
          id='achievement-image'
          src={"/" + achievement.img}
          alt='achievement-img'
        />
        <Modal.Body>{achievement.description}</Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

// export default Profile;
