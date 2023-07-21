import React from 'react'
import TodoImg from '../assest/mainTodo.jpg'
import './pages.css'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import { logInschema } from '../schemas'
import{useNavigate} from 'react-router-dom'
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebaseconfig';

const Login = () => {
  const nevigate = useNavigate()
  const auth = getAuth(app)
   const {values,errors,touched,handleSubmit,setFieldValue ,}=useFormik({
initialValues:{
  email:"",
  password:"",
},
validationSchema:logInschema,
onSubmit:(values,action)=>{
  signInWithEmailAndPassword(auth,values.email,values.password).then(async(res)=>{
    nevigate("/home")
action.resetForm()
  })
  .catch((error)=>{
 alert(error.message)
  })  
}
   })


const customizeOnchange =(event)=>{
  const target = event.target
  setFieldValue(target.name,target.value.trim())
}


  return (
    <div>
      <div className="main-wrraper">
        <h1>Task Keeper</h1>
        <div className="main-contanier">
            <div className="formcontanier">
                <h1> Log In</h1>
<form action="" onSubmit={handleSubmit}> 
    <input type="text" value={values.email}  name='email' onChange={customizeOnchange} placeholder='Enter your Email'/><br />
    {errors.email && touched.email ?     <p className='from-error'>{errors.email}</p>:null}

    <input type="password" value={values.password}  name='password' onChange={customizeOnchange} placeholder='Enter your password'/><br />
    {errors.password && touched.password ?     <p className='from-error'>{errors.password}</p>:null}

    <div className="btn-center">
    <button type='submit'>Log In</button>

    </div>
    <p>If you don't have an accout <Link to={"/signUp"}>Signup</Link></p>

</form>
            </div>
            <div className="login-img">
              <img width={"400px"} 
               src={TodoImg} alt="" />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Login
