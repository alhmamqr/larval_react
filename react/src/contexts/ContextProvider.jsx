import { useState } from "react";
import { createContext,useContext } from "react";

const StateContext = createContext({
    user:null,
    token:null,
    notification:null,
    setNotification:()=>{},
    setuser:()=>{},
    settoken:()=>{}
});


export const ContextProvider =({children})=>{
    
    const [user,setuser] =useState({ });
    const [notification,_setNotification] =useState('');

    const [token,_settoken] =useState(localStorage.getItem('ACCESS_TOKEN'));
    const settoken = (token)=>{
        _settoken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    const setNotification=(message)=>{
        _setNotification(message);
        setTimeout(() => {
            _setNotification('')
        }, 5000);

    }


    
    return (
        <StateContext.Provider value={{
            user,
            token,
            setuser,
            settoken,
            notification,
            setNotification
        }}>
        {children}
        </StateContext.Provider>
    )
}

export const useStateContext =()=>useContext(StateContext)
