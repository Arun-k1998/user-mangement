import React from "react";
import { useSelector } from "react-redux";
import { Navigate,useNavigate } from "react-router-dom";
import login from "../../../Pages/admin/login";
import getCookies from "../../../helpers/getCookies";
import axios from "../../../axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../../redux/userAuthentification";

const Verification = ({ children,accessBy }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userName);

  if (accessBy === "non-Authorised") {
    const cookies = getCookies();
  
    if (!user && !cookies['id'] && !cookies['token']) {
      console.log('not user');
      return children;
    }else if(cookies && cookies['id'] && cookies['token']){
      console.log('user');
      axios
      .get("/userProfile")
      .then((response) => {
        if (!response.data.user) throw new Error();
        dispatch(
          userActions.userLogin({
            name: response.data.user.name,
            _id: response.data.user._id,
          })
        );
        return navigate('/')
      })
      .catch((error) => {
        console.log(error.message);
        <Navigate to="/login"></Navigate>;
      });

      
    }
  } else if (accessBy === "Authorised") {
    const cookies = getCookies();

    if (user) {
      return children;
    } else if (cookies && cookies["id"] && cookies["token"]) {
      axios
        .get("/userProfile")
        .then((response) => {
          if (!response.data.user) throw new Error();
          dispatch(
            userActions.userLogin({
              name: response.data.user.name,
              _id: response.data.user._id,
            })
          );

          console.log("hai")

          return children;
        })
        .catch((error) => {
          <Navigate to="/"></Navigate>;
        });
    } else {
      console.log("from here");
      window.location.href = "/"
    }
  }
}

export default Verification;
