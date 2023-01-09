import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider'
import Login from '../views/Login';

function DefaultLayout() {
  const {user,token,setuser,settoken,notification} = useStateContext();
  const onlogout=(ev)=>{
    ev.preventDefault();

    axiosClient.post('/logout')
    .then(()=>{
      setuser({});
      settoken(null);
    })


  }
    if(!token){
        return <Navigate to={"/Login"}/>
    }

    useEffect(()=>
    {
      axiosClient.get('/user')
      .then(({data})=>{
        console.log(data)
        setuser(data);
      })
    }
    ,[])
  return (
    <div id='defaultLayout'>
      <aside>
        <Link to={'/dashboard'}>Dashboard</Link>
        <Link to={'/Users'}>Users</Link>
      </aside>


      <div className="content">
        <header>
          <div className="">Header</div>
          <div className="">{user.name}
          <a  onClick={onlogout} className='btn-logout'>Log out</a>
          </div>
        </header>
        <main>

      <Outlet/>
        </main>
      </div>
      

      {notification && 
      <div className="notification">
        {notification}
      </div>

      }
    </div>
    
  )
}

export default DefaultLayout