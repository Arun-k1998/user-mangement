import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../../redux/userAuthentification';

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = ()=>{
    const expires = "expires=" + 'Thu, 01 Jan 1970 00:00:01 GMT'
    document.cookie = "admintoken=Bearer "+ ';' + expires +";"+"path=/"
    dispatch(userActions.userLogout())
    navigate('/admin/login')
  }
  return (
    <div className='navbar'>
    
      <div>
        <h3>Dash Board</h3>  
      </div>    
      <div>
        <h3 onClick={handleLogout}>Logout</h3>
      </div>  
     
      
      
    </div>
  )
}

export default Header
