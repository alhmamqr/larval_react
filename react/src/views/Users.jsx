import { useEffect } from "react";
import { useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";


function Users() {
  const [users,setUsers] =useState([{}]);
  const [loading,setLoding] =useState(null);

  const {setNotification} =useStateContext()
  const onDelete =(user)=>{
    if(!window.confirm('are you sure want to delete this user')){
      return
    }
    axiosClient.delete(`/users/${user.id}`)
    .then(()=>{
      //TODO  show notification

      setNotification('suceess to delete that user')
      getUsers();
    })

  }


  useEffect(()=>{
    getUsers();
  },[])
  const getUsers = ()=>{
    setLoding(true);
axiosClient.get("/users")
.then(({data})=>{
  setLoding(false);
  setUsers(data.data)
  console.log(data);
}).catch((e)=>{
  console.error(e);
  setLoding(true);
})

  }
  return (
    <div>

      <div style={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
        <h1 className="">Users</h1>
        <Link to='/users/new' className="btn-add">Add New User</Link>
      </div>

      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Created Date</th>
              <th>Control</th>
            </tr>
          </thead>
          {loading && 
          
          <tbody>
            <tr >
                <td colSpan='5' className="text-center">Loading...</td>
            </tr>
          </tbody>
          }
          {!loading &&
          <tbody>
            {users.map(e=>(
            <tr>
              <td>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.email}</td>
              <td>{e.created_at}</td>
              <td>
                <Link  className="btn-edit" to={'/users/'+e.id}>Edit</Link>
                &nbsp;
                <button onClick={ev => onDelete(e)}  className="btn-delete">Delete</button>
              </td>
            </tr>

            ))}
          </tbody>
          }
        </table>
      </div>


    </div>
  )
}

export default Users
