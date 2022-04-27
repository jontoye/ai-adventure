import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Users.css";
import moment from "moment";
import { Link } from "react-router-dom";
import Characters from "./Characters";
import Adventures from "./Adventures";

function Users() {
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

  return (
    <>
      <div className='section-explore container my-5'>
        <h1>Active Users</h1>

        {/* <div className='users-list d-flex flex-column align-items-center gap-5 my-5'> */}
        <div className='users-list d-flex align-items-center gap-5'>
          {users.map(user => (
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
      </div>

      <Adventures />
      <Characters />
    </>
  );
}

export default Users;
