import React from 'react'
import TodoImg from '../assest/mainTodo.jpg'
import { Link ,useNavigate } from 'react-router-dom'
import {useFormik} from 'formik'
import { signUpSchema } from '../schemas'
import { ref, set } from "firebase/database";
import {app,db} from '../firebaseconfig'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'


const Signup = () => {
  const auth = getAuth(app)
  const  nevigate = useNavigate()
  const {values,errors,handleSubmit,touched,setFieldValue} = useFormik({
initialValues:{
  name:"",
  email:"",
password:""
},
validationSchema: signUpSchema, 

onSubmit: (value,action)=>{

createUserWithEmailAndPassword(auth,value.email,value.password).then(async(res)=>{
let userId = res.user.uid
await set(ref(db,'users/'+userId),{
  userName:value.name,
  email:value.email,
  list:false
})
nevigate("/home")
action.resetForm()
}).catch((error)=>{
alert(error)
})


}

})
   
  const handlecustomizeChange =(event)=>{
const target = event.target
setFieldValue(target.name,target.value)
  }
  

  return (
    <div>
           <div className="main-wrraper">
        <h1>Task Keeper</h1>
        <div className="main-contanier">
            <div className="formcontanier">
                <h1> Sign Up</h1>
<form action="" onSubmit={handleSubmit}>
    <input type="text" value={values.name} name='name'  onChange={handlecustomizeChange} placeholder='Enter UserName'/><br />
    {errors.name && touched.name ?     <p className='from-error'>{errors.name}</p>:null}

    
    <input type="text" value={values.email} name='email' onChange={handlecustomizeChange}  placeholder='Enter your Email'/><br />
 
    {errors.email && touched.email ?     <p className='from-error'>{errors.email}</p>:null}
    <input type="password" value={values.password}name ='password' onChange={handlecustomizeChange}   placeholder='Enter your password'/><br />
  
    {errors.password && touched.password ?     <p className='from-error'>{errors.password}</p>:null}

    <div className="btn-center">
    <button type='submit'>Sign Up</button>  

    </div>
    <p>If you already have an accout <Link to={"/"}>Login</Link></p>

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
  
export default Signup
