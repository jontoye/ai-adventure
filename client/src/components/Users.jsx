import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Users.css'
import moment from 'moment';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data.users);
        return response;
      } catch (err) {
        console.error(err);
      }
    }
    getUsers();
  }, [])


  return (
    <div className='section-explore container'>
      <h1>Explore Current Users</h1>

      <div className='users-list d-flex flex-column align-items-center gap-5 my-5'>
        {users.map(user => (
          <div className='user-card d-flex align-items-center justify-content-between' key={user._id}>
            <div className='user-card__img'>
              <img src={user.avatar} alt='user-avatar' />
            </div>
            <Link to={`/profile/${user._id}/`}>
              <div className='user-card__content mx-5'>
                <h3 className='p-2'>{user.username}</h3>
                <p className='p-2'>Joined {moment(user.createdAt).fromNow()}</p>
                <p>{user._id}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Users