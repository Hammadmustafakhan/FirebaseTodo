import React from 'react'
import './pages.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAuth, signOut, } from 'firebase/auth'
import { Edit, cancel, firebaseUid, getInputValue, setLoading, todoUpdate } from '../redux/Todoslices'
import { db } from '../firebaseconfig'
import { useNavigate } from 'react-router-dom'
import { ref, update } from 'firebase/database'
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiEdit } from 'react-icons/fi'



const Home = () => {

  const dispatch = useDispatch()
  const auth = getAuth()
  const nevigate = useNavigate()
    const data = useSelector((state)=>state.Todo)
    const removeAll = ()=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to Remove All Lists",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then( async(result) =>{
     if(result.isConfirmed){
      await update(ref(db,"users/"+data?.uid),{
        list:false
      }).catch((error)=>{
alert(error)
      })
     }
      } )
     }
    const addList = async(e)=>{
      e.preventDefault()
await update(ref(db,"users/"+data?.uid),{
  list:[...data?.list,data?.input.trim()]
})

  } 
 

  const deleteTodo = async (id)=>{
    let newList = data.list.filter((elem,index)=>index !== id )
    console.log(newList,"new");
    await update(ref(db,"users/"+data?.uid),{
      list:newList
    })
  }

  const  updatetodo = async (e)=>{
    e.preventDefault()
    dispatch(todoUpdate())
    let newList =[...data?.list]
    newList[data?.index]=data?.input.trim()
    await update(ref(db,"users/"+data?.uid),{
      list:newList
    })
  }
  const editTodo = (i)=>{
dispatch(Edit(i))
  }
  const cancelupdate =  ()=>{
    dispatch(cancel)
  }
  
const SignOut = ()=>{
  Swal.fire({
    title: 'Are you sure?',
    text: "You want to SignOut",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
     signOut(auth).then(()=>{
      nevigate("/")
      return(
        dispatch(firebaseUid(false)))
     }).catch((error)=>{
       alert(error)
     })
      }
  })
  

}

  return (
    <>
      <div className="bg-contanier">
<nav>
    <div className="logo">
        <h1>Task Keeper</h1>
    </div>
<div className="right">
<button disabled>Hi ! {data?.userName}</button>
<button onClick={SignOut}> Log Out</button>
</div>
</nav>

<div className="input-form">
    <h1>Add your Todos</h1>
    <div className="form-wrapper">
        <form action="" onSubmit={data?.index === false ? addList:updatetodo}>
            <input type="text" placeholder='Enter your Todo' value={data?.input} onChange={(e)=>dispatch(getInputValue(e.target.value))}/>
            <div className="add-btn">

            <div className="buttoncontanier "><button disabled={!data.input} className='addButton'>{data?.index === false ? "Add":"Update"}</button>
            {data.index!==false &&(
            <div className="cancel">
              <button className='addButton' onClick={cancelupdate} >cancel</button>
            </div>
          )}</div>
            </div>
        </form>
    </div>
</div>
<div className="list-contanier">
{
            data?.list?.map((elem,i)=>{
              return(
                <li key={i}>
                  <div className="text-contanier">
                  {elem}
                  <div className="button-contanier2">


                    <button disabled={data?.index!==false} onClick={()=>deleteTodo(i)} className='btn-child'>
                      
                    <RiDeleteBin6Line className='delete' />
 
                       </button>
                       <button onClick={()=>editTodo(i)} className='btn-child'>
                       <FiEdit  className='edit' />
                       </button>

                  </div>
                  </div>
                  </li>
              )
            })
           }    
</div>
{
              data?.list?.length>0 && (
                <div className="remove-center">
                <button    disabled={data?.index!==false} onClick={()=>removeAll()}>Remove All</button>
              </div>
           
              )
            }
      </div>
    </>
  )
}

export default Home
