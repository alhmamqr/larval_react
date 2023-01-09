import {createBrowserRouter, Navigate} from 'react-router-dom'
import DefaultLayout from './Comonents/DefaultLayout';
import GusetLayout from './Comonents/GusetLayout';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Notfound from './views/Notfound';
import Singup from './views/Singup';
import UserForm from './views/UserForm';
import Users from './views/Users';

const router  =createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to={'/Users'}/>
            },
            {
                path:'/Users',
                element:<Users/>
            },
            {
                path:'/Users/New',
                element:<UserForm key={'UserCreate'}/>
            },
            {
                path:'/Users/:id',
                element:<UserForm key={'UserUpdate'}/>
            },
            {
                path:'/Dashboard',
                element:<Dashboard/>
            },
        ]
    },   
    {
        path:'/',
        element:<GusetLayout/>,
        children:[
            {
                path:'/Login',
                element:<Login/>
            },
            {
                path:'/Singup',
                element:<Singup/>
            },
        ]
    },
    {
        path:'*',
        element:<Notfound/>
    },



])

export default router;













