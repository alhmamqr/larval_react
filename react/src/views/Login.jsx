import { useRef, useState } from "react";
import { createRoutesFromChildren, Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

// createRoutesFromChildren
 

function Login() {
    const [error,setError] = useState(null); 
    const [messageErorr,setmessageErorr] = useState(null); 
const emailRef =useRef(); 
const passwordRef1 =useRef(); 
const {setuser,settoken}=useStateContext()
    const onSubmit = (ev)=>{
     ev.preventDefault();
     const payload ={ 
        email:emailRef.current.value,
        password:passwordRef1.current.value
     }   
     setError(null);
     setmessageErorr(null);
      axiosClient.post('/login',payload)
      .then(({data})=>{
        settoken(data.token);
        setuser(data.user)
      }).catch(err=>{
        const response =err.response;
        if(response && response.status == 422){
            if(response.data.errors){
                console.log(response.data.errors)
                setError(response.data.errors)

            }else{
                console.log(response.data.message) ;
                setmessageErorr(response.data.message) ;
            }
        }
      })
    }
  return (
    <div className="login-signup-form animated fadeInDown">
        <div className="form">
            <form onSubmit={onSubmit}>
                <h1 className="title">
                    login in your account
                </h1>
                {error &&<div className="alert">
                    {Object.keys(error).map(key=>(
                        
                        <h4 key={key}>{error[key][0]}</h4>
                    ))} 
                 </div>}
                 {messageErorr && 
                    <h4 className="alert">{messageErorr}</h4>
                 }
                <input ref={emailRef}  type="text" placeholder="Email" />
                <input ref={passwordRef1} type="password" placeholder="Password" />
                <button className="btn btn-block">login</button>
                <p className="message">
                    NOT Registered? <Link to={'/singup'}>Create an account</Link>
                </p>
            </form>      
        </div>
      
    </div>
  )
}

export default Login
