import React from 'react';
import { BrowserRouter as Router,Routes, Route  } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Home from './Home';
import Signup from './Signup';
import Signin from './Signin';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
import NotFound from './NotFound';


const App = () => (
    <Router>
    
       <Header/>
      
         <Routes>
           <Route exact path="/"  element={<Home/>} />
           <Route exact path='/signup'  element={<Signup/>} />
           <Route exact path='/signin'  element={<Signin/>} />
           <Route exact path='/user/dashboard'  element={<UserDashboard/>} />
           <Route exact path='/admin/dashboard'  element={<AdminDashboard/>} />
           <Route element={<NotFound/>} />
</Routes>     
    
    </Router>
    
);


export default App;
