import React,{useState,useEffect} from "react";
import Table from "react-bootstrap/Table";
import Update from '../../../assets/updateIcon'
import Delete from '../../../assets/Delete'
import api from '../../../adminAxios'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser, UsersList } from "../../../redux/AdminHome";
import 'react-bootstrap'
import './table.css'

function AdminTable() {
  const {usersList} = useSelector(state=>state.admin)
  const disPatch = useDispatch()
  const navigate = useNavigate()
  
    const update=(id)=>{
       navigate('/admin/userUpdate',{state:{id}})
      
    }
    const deleteUser = (id)=>{
     api.post('/delete',{id}).then(response=>{
      if(response.status === 200){
        // console.log(response.data.user);
        const userId = response.data.user._id
        
       disPatch(DeleteUser(userId))
      }
     })
    }
    useEffect(()=>{
      api.get('/home').then((usersData)=>{
        const users = usersData.data.users
        console.log("user daa"+users);
        disPatch(UsersList([...users]));
       }).catch((error)=>{console.log(error.message);})
    },[])
  return (
    <div className="table-box">
      <Table bg='primary' striped bordered hover className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {usersList
            ? usersList.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td onClick={()=> update(user._id)} > <Update /></td>
                    <td onClick={()=> deleteUser(user._id) }><Delete  /></td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminTable;
