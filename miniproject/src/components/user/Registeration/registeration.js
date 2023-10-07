import React,{useState,useEffect} from 'react'
import axios from '../../../axios'
import { useNavigate } from 'react-router-dom'
import './registeration.css'

function Registeration() {
    
    const navigate = useNavigate()
    const initialValues = {name:"",email:"",password:"",phoneNumber:"",confirmPassword:""}
    const [formValues,setFormValues] = useState(initialValues)
    const [formError,setFormError] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)
    
    
    const handleChange = (e)=>{
      const {name,value} = e.target
      setFormValues({...formValues,[name]:value})
    }

    const handleSubmit= async( e )=>{
        e.preventDefault()
        setFormError(validate(formValues))
        setIsSubmit(true) 
    }
    
    const validate = (values)=>{
      const error = {}
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if(!values.name.trim()){
        error.name = 'Username is required'
      }
      if(!values.email){
        error.email  = 'Email is required'
      }else if(!regex.test(values.email)){
        error.email = "Not a valid email"
      }
      if(!values.phoneNumber){
        error.phoneNumber = "Phone number is required"
      }else if( values.phoneNumber.length > 10 || values.phoneNumber.length < 10 ){
        error.phoneNumber = "Enter a Valid Phone number"
      }
      if(!values.password){
        error.password = "Enter password"
      }else if(values.password.length < 4){
        error.password = "Password should be greater than 4 character"
      }else if(values.password.length > 8){
        error.password = "Password must be less than 8 character"
      }
      if(!values.confirmPassword){
        error.confirmPassword = "Confirm password is required"
      }else if(values.password !== values.confirmPassword){
        error.confirmPassword = "Passowrd does not Match"
      }
      return error

    }

    useEffect(()=>{
      console.log(formError)
      if(Object.keys(formError).length === 0 && isSubmit ){
        axios.post('/signup',{...formValues}).then((response)=>{
          if(response.data.status){
            navigate('/login')
        }else{
            alert(response.data.message)
        }
        })
      }
    },[formError])

  return (
    
    <div className='SignUpWrapper'>
      <h1>SIGN UP</h1>
      <form className='SignUpForm' onSubmit={handleSubmit}>
       
        <input
        className='SignUp-input'
        type='text' 
        placeholder='Enter your name'
        value={formValues.name}
        name="name"
      
        onChange={handleChange}
        />
        <br />
        <p>{formError.name}</p>
      
        <input
        className='SignUp-input'
        type='email' 
        placeholder='Enter your mail'
        value={formValues.email}
        name="email"
        
        onChange={handleChange}
        />
        <br />
        <p>{formError.email}</p>
        
        <input
        className='SignUp-input'
        type='tel' 
        placeholder='Enter your Phone Number'
        value={formValues.phoneNumber}
        name="phoneNumber"
       
        onChange={handleChange}
        />
        <br />
        <p>{formError.phoneNumber}</p>
       
        <input
        className='SignUp-input'
        type='password' 
        placeholder='password...'
        value={formValues.password}
        name="password"
        onChange={handleChange}
        />
        <br />
        <p>{formError.password}</p>
        
        <input
        className='SignUp-input'
        type='password' 
        placeholder='confirm Password'
        value={formValues.confirmPassword}
        name="confirmPassword"
        onChange={handleChange}
        />
        <br />
        <p>{formError.confirmPassword}</p>
        <button className='SignUp-btn' type='submit'>submit</button>
      </form>
    </div>
  )
}

export default Registeration
