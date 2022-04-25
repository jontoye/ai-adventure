import React from 'react'
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
      <div className="row">
        <div className="col-6 mx-auto">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam doloribus, beatae minus aliquam facere hic animi accusamus neque libero, molestias minima ipsa debitis molestiae veritatis obcaecati iste quod et aspernatur?</p>
        </div>
      </div>
    </div>
  )
}

export default Profile