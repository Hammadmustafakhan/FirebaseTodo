import React from 'react'
import Login from './pages/login';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Signup from './pages/Signup';
import Home from './pages/Home';
import {useSelector } from 'react-redux'
import ButtonSpinner from './pages/Buttonspinner';
const Routers = () => {
  const state = useSelector((state) => state.Todo);


if(state.loader)
  return(
<div className="spin-center">
<ButtonSpinner/>
</div>
  )


  return (
    <>

      <BrowserRouter> {
    state.uid?(
      <Routes>
         <Route path='/Home' element={<Home/>}/>
         <Route path='*' element={<Home/>}/>
      </Routes>
    )
    :
    <Routes >
              <Route path='/' element={<Login/>} ></Route>
              <Route path='*' element={<Login/>} ></Route>
        <Route path='/signUp' element={<Signup/>}></Route>
        </Routes>
  }

</BrowserRouter>
    </>
  )
}

export default Routers
