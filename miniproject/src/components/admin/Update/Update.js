import React,{useState,useEffect} from 'react'
import './Update.css'
import { useLocation } from 'react-router-dom'
import axios from '../../../adminAxios'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { updateUser} from '../../../redux/AdminHome'

function Update() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const {state}= location//state.id
    const {usersList} = useSelector(store=> store.admin)
    
    
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('/userUpdate',{email,name,phoneNumber,id:state.id}).then((response)=>{
            if(response.data.status){
                dispatch(updateUser({userId:state.id,updatedUser:response.data.user}))
                navigate('/admin/home')
            } 
        })

    }
    useEffect(()=>{
        if(!state) navigate('/admin/home')
        else if(usersList.length>=1 ){
        const userDetail = usersList.filter((user)=> user._id === state.id)
        setEmail(userDetail[0].email)
        setName(userDetail[0].name)
        setPhoneNumber(userDetail[0].phoneNumber)
      }else{
        axios.get(`/userDetails?id=${state.id}`).then((res)=>{
          if(res.data.status){
            const user = res.data.user
            setEmail(user.email)
            setName(user.name)
            setPhoneNumber(user.phoneNumber)
          }
        })
      }
    },[])
  return (
    <div className='updateFormWrapper'>
        <form className='SignUpForm' onSubmit={handleSubmit}>
       
       <input
       className='SignUp-input'
       type='text' 
       placeholder='Enter your name'
       value={name}
       name="name"
       required
       onChange={(e)=>setName(e.target.value)}
       />
       <br />
       
       <input
       className='SignUp-input'
       type='email' 
       placeholder='Enter your mail'
       value={email}
       name="email"
       required
       onChange={(e)=>setEmail(e.target.value)}
       />
       <br />  
       <input
       className='SignUp-input'
       type='tel' 
       placeholder='Enter your Phone Number'
       value={phoneNumber}
       name="PhoneNumber"
       required
       onChange={(e)=>setPhoneNumber(e.target.value)}
       />
       <br />
       <button className='SignUp-btn' type='submit'>submit</button>
     </form>
    </div>
  )
}

export default Update
