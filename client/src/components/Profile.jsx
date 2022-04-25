import React from 'react'
import { Link } from 'react-router-dom'
import './css/Profile.css'

function Profile({ user }) {

  return (
    <div className="section-profile container py-3">
      <h1>{user.user.name}'s Profile Page</h1>
      <img src="/images/user-default-img.png" alt="profile-img" className="profile-img" />
      <div className="row">
        <div className="profile-connections d-flex col-7 mx-auto justify-content-between mb-4">
          <h4>0 Followers</h4>
          <h4>0 Following</h4>
          <h4>0 Friends</h4>
        </div>
      </div>
      <div className="row mb-5"> 
        <div className="col-8 mx-auto d-flex justify-content-between">
          <Link to="/characters" className="display-6">My Characters</Link>
          <Link to="#" className="display-6">My Adventures</Link>
        </div>
      </div>
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