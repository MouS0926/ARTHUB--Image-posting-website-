import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Component/Home'
import { Checkout } from '../Component/Checkout'
import Login from '../Component/login'
import Signup from '../Component/signup'
import AllProducts from '../components/AllProducts'
import Login2 from '../Component/Login2'
import AddPost from '../Component/AddPost'
import PrivateRoute from './PrivateRoute'
import Mypost from '../Component/Mypost'
import EditPost from '../Component/EditPost'
import SinglePost from '../Component/SinglePost'
import Creator from '../Component/Creator'
import SingleCreatorDetails from '../Component/SingleCreatorDetails'



export default function Allroutes() {
  return (
    <div>
    <Routes>
        <Route path="/" element={<Home/>  }/>
        <Route path='/checkout' element={<Checkout/>}></Route>
        {/* <Route path='/login' element={<Login/>}></Route> */}
        <Route path='/signup' element={<Signup/>   }></Route>
        <Route path='/allproduct' element={<AllProducts/>   }></Route>
        <Route path="/post/:id" element={
          <PrivateRoute>
            <SinglePost/> 
          </PrivateRoute>
        
        
        } ></Route>
        <Route path='/login' element={<Login2/>  }></Route>
        <Route path='/addpost' element={
          <PrivateRoute>
               <AddPost/> 
         </PrivateRoute>
         }>

      </Route>

      <Route path='/userpost' element={
          <PrivateRoute>
               <Mypost/> 
         </PrivateRoute>
         }>

      </Route>

      <Route path='/product' element={
          <PrivateRoute>
               <AllProducts/>
         </PrivateRoute>
         }>

      </Route>

      <Route path='/editpost/:id' element={
          <PrivateRoute>
               <EditPost/>
         </PrivateRoute>
         }>

      </Route>

      <Route path='/creators' element={ <Creator/> }> </Route>
      <Route path='/creators/:id' element={ <SingleCreatorDetails/> }> </Route>

    </Routes>

    </div>
  )
}
