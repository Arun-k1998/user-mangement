import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import './Profile.css'


function Profile() {
  const { userId } = useSelector((state) => state.user);
  const [name,setName] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [email,setEmail] = useState('')
  const [image, setImage] = useState("");
  const [serverImage, setServerImage] = useState("");
  const addImage = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("image", image);
    form.append("id", userId);
    axios
      .post("/profileUpdate", form, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.status) {
          setServerImage(response.data.image);
        }
      });
  };

  useEffect(() => {
    axios.get(`/userProfile`).then((response) => {
      if (response.data.status) {
        const {name,email,phoneNumber,image} = response.data.user
        setServerImage(image);
       setName(name)
       setEmail(email)
       setPhoneNumber(phoneNumber)
      }
    });
  }, []);
  return (
    <div className="profile">

      <div className="detail">
          <div className="left">
            <div className="individual">
              <p>Name : </p>
            <p>{name}</p>
            </div>
            <div className="individual">
              <p>Email : </p>
            <p>{email}</p>
            </div>
            <div className="individual">
              <p>Phone Number : </p>
            <p>{phoneNumber}</p>
            </div>
          </div>
          <div className="right">
          <Card style={{ width: "18rem" }}>
            <form onSubmit={addImage}>
              <Card.Img
              className="image"
                variant="top"
                src={image?URL.createObjectURL(image):
                  process.env.REACT_APP_SERVER_BASE_URL +
                  "images/" +
                  serverImage
                }
              />
              <br />
              <div className="buttons">
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <br />
              <Button type="submit" variant="primary">Update</Button>
              </div>
              
            </form>
        
       
          
        
      </ Card>
          </ div>
      </div>

      
    </ div>
  );
}

export default Profile;
