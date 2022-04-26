import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './css/Profile.css'

function Profile({ currentUser }) {
  const [user, setUser] = useState({});
  let params = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`/profile/${params.userId}`)
        setUser(response.data.user);
        return response;
      } catch (err) {
        console.error(err)
      }
    }
    getUser()
  }, [params.userId])

  return (
    <div className="section-profile container py-3">
      <h1>{user.username}'s Profile Page</h1>
      <img src={user.avatar} alt="profile-img" className="profile-img" />
      
      {params.userId !== currentUser.user.id &&
        <div className="row mb-5">
        <div className="d-flex col-4 mx-auto justify-content-between">
          <Link to="#">
            <div className='social-button d-flex'>
              <img src="/images/icons/add-friend.png" alt="" />
            </div>
          </Link>
          <Link to="#">
            <div className='social-button d-flex'>
              <img src="/images/icons/follow.png" alt="" />
            </div>
          </Link>
        </div>
      </div>
      }
      
      <div className="row">
        <div className="profile-connections d-flex col-7 mx-auto justify-content-between mb-4">
          <h4>0 Followers</h4>
          <h4>0 Following</h4>
          <h4>0 Friends</h4>
        </div>
      </div>

      {params.userId === currentUser.user.id &&
        <div className="row mb-5"> 
          <div className="col-8 mx-auto d-flex justify-content-between">
            <Link to="/characters" className="display-6">My Characters</Link>
            <Link to="/adventure-list" className="display-6">My Adventures</Link>
          </div>
        </div>
      }
      <div className="row text-center">
        <div className="col-6 mx-auto">
          <div className="display-6">
            Biography
          </div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam doloribus, beatae minus aliquam facere hic animi accusamus neque libero, molestias minima ipsa debitis molestiae veritatis obcaecati iste quod et aspernatur?</p>
          <div className="display-6">
            Activity
          </div>
          <p>Updated adventure [name] (3 mins ago)</p>
          <p>Created adventure [name] (yesterday)</p>
          <p>Created character [name] (2 days ago)</p>
          <div className="display-6">
            Achievements
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile