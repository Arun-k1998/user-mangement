import React from "react";
import "./Header.css";
import Profil from "../../../assets/Profil";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../redux/userAuthentification";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName } = useSelector((state) => state.user);
  const handleLogOut = () => {
    const expires = "expires=" + 'Thu, 01 Jan 1970 00:00:01 GMT';
    // Thu, 01 Jan 1970 00:00:01 GMT
    document.cookie =
        "token=Bearer "+";" + expires + "; path=/";
      document.cookie =
        "id="+ ";" + expires + "; path=/";
    dispatch(userActions.userLogout());
    navigate("/login");
  };
  return (
    <div className="outer">
      <div id="header">
        <div className="left">
          <h3>{userName?userName:'Welcome'}</h3>
        </div>
        <div className="right">
          {userName ? (
            <>
              <div>
                <span onClick={handleLogOut}>Logout</span>
              </div>
              <div onClick={() => navigate("/profile")}>
                <Profil />
              </div>
            </>
          ) : (
            <>
            <div>
            <span onClick={()=>navigate('/login')} >Login</span>
            </div>
            <div onClick={() => navigate("/login")}>
              <Profil />
            </div>
            </>
            
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
