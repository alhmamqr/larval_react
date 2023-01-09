import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

function UserForm() {
    const {id} =useParams(); 
    const navgate =useNavigate();
    const [error,setError] = useState(null);
    const [Loading,setLoding]= useState(false);
    const {setNotification} =useStateContext()
const [user,setUser] =useState(
    {
        id:null,
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
        
    }
);

if(id){
    useEffect(()=>{
        setLoding(true);
        axiosClient.get(`/users/${id}`)
        .then(({data})=>{
            setLoding(false); 
            setUser(data.data); 
            console.log("data",user)
        }).catch((E)=>{
            setLoding(false)
        })
    },[])
} 
const onSubmit = (ev)=>{
    ev.preventDefault();
    if(user.id){
        axiosClient.put(`/users/${id}`,user)
        .then(()=>{
            setNotification('user was successfully updated')
            navgate('/users');
        }).catch(err=>{
            const response =err.response;
            if(response && response.status == 422){
                console.log(response.data.errors)
                setError(response.data.errors)
            }
          })
    }else{
        axiosClient.post('/users',user)
      .then(({data})=>{ 
        setNotification('user was successfully created')
        navgate('/users');
      }).catch(err=>{
        const response =err.response;
        if(response && response.status == 422){
            console.log(response.data.errors)
            setError(response.data.errors)
        }
      })
    }
    
}





  return (
    <>
        {!user.id && <h1>Add New User</h1> }
        {user.id &&<h1>Edit the : {user.name}</h1> }
        <form onSubmit={onSubmit}> 
                 {error &&<div className="alert">
                    {Object.keys(error).map(key=>(
                        
                        <h4 key={key}>{error[key][0]}</h4>
                    ))} 
                 </div>}
                 <input  value={user.name} onChange={e=>setUser({...user,name:e.target.value})} type="text" placeholder="Full Name" />
                 <input value={user.email} onChange={e=>setUser({...user,email:e.target.value})} type="text" placeholder="Email Address " />
                 <input   onChange={e=>setUser({...user,password:e.target.value})}   type="password" placeholder="Password" />
                 <input  onChange={e=>setUser({...user,password_confirmation:e.target.value})}  type="password" placeholder="Password Confirmation" />
                 <button className="btn btn-block"  >save</button> 
             </form>
    </>
  )
}

export default UserForm
