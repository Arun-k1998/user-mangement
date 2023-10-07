import React from 'react'
import Header from '../../components/user/Header/Header'
import Profile from '../../components/user/profileDetails/Profile'


function UserProfile() {
  return (
    <div>
      <div className='header'>
       <Header />
      </div>
      <div className='userDetails' >
       <Profile />
      </div>
      
    </div>
  )
}

export default UserProfile
