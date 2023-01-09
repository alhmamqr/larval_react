import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";


function Singup() {
    const [error,setError] = useState(null);
    const [error1,setError1] = useState('23');
const emailRef =useRef();
const nameRef =useRef();
const passwordRef =useRef();
const confirmRef =useRef();
const {setuser,settoken}=useStateContext()
    const onSubmit = (ev)=>{
     ev.preventDefault();
     const payload ={
        name:emailRef.current.value,
        email:nameRef.current.value,
        password:passwordRef.current.value,
        password_confirmation:confirmRef.current.value
     }   
      axiosClient.post('/signup',payload)
      .then(({data})=>{
        settoken(data.token);
        setuser(data.user)
      }).catch(err=>{
        const response =err.response;
        if(response && response.status == 422){
            console.log(response.data.errors)
            setError(response.data.errors)
        }
      })
    }
   return (
     <div className="login-signup-form animated fadeInDown">
         <div className="form">
             <form onSubmit={onSubmit}>
                 <h1 className="title">
                     Sign up free 
                     
                 </h1>
                 {error &&<div className="alert">
                    {Object.keys(error).map(key=>(
                        
                        <h4 key={key}>{error[key][0]}</h4>
                    ))} 
                 </div>}
                 <input  ref={emailRef}  type="text" placeholder="Full Name" />
                 <input  ref={nameRef} type="text" placeholder="Email Address " />
                 <input  ref={passwordRef} type="password" placeholder="Password" />
                 <input  ref={confirmRef}  type="password" placeholder="Password Confirmation" />
                 <button className="btn btn-block">sign up</button>
                 <p className="message">
                     Allredy Registered? <Link to={'/login'}>Sign in </Link>
                 </p>
             </form>      
         </div>
       
     </div>
   )
 }

export default Singup
