import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Users.css";
import moment from "moment";
import { Link } from "react-router-dom";
import Characters from "./Characters";
import Adventures from "./Adventures";

function Users({ continueAdventure, createAdventure, setCharacter }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/users");
        setUsers(response.data.users);
        return response;
      } catch (err) {
        console.error(err);
      }
    };
    getUsers();
  }, []);

  const scrollLeft = () => {
    document.querySelector(".users-list").scrollLeft += 500;
  };

  const scrollRight = () => {
    document.querySelector(".users-list").scrollLeft -= 500;
  };

  return (
    <>
      <div className='section-explore container-xl my-5'>
        <h1 className='display-4'>Explore</h1>

        {/* <div className='users-list d-flex flex-column align-items-center gap-5 my-5'> */}
        <div className='d-flex align-items-center'>
          <img
            className='scroll-btn'
            src='/images/icons/left-arrow.png'
            onClick={scrollRight}
            alt='left-arrow'
          />
          <div className='users-list d-flex align-items-center gap-5'>
            {users.map((user) => (
              <Link to={`/profile/${user._id}/`} key={user._id}>
                <div className='user-card'>
                  <div className='user-card__img'>
                    <img
                      className='circular-square'
                      src={user.avatar}
                      alt='user-avatar'
                    />
                  </div>
                  <div className='user-card__content mx-2'>
                    <h3>{user.username}</h3>
                    <p>Joined {moment(user.createdAt).fromNow()}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <img
            className='scroll-btn'
            src='/images/icons/right-arrow.png'
            onClick={scrollLeft}
            alt='right-arrow'
          />
        </div>
      </div>

      <Adventures continueAdventure={continueAdventure} />
      <Characters
        createAdventure={createAdventure}
        setCharacter={setCharacter}
      />
    </>
  );
}

export default Users;
