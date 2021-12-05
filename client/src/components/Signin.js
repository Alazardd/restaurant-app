import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {showErrorMsg} from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { setAuthentication, isAuthenticated } from '../helpers/auth';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import {signin} from '../api/auth';

const Signin = () => {
  let navigate = useNavigate();

    const[formData, setFormData] = useState({
        email: 'alazardinberu64@gmail.com',
        password: '123456',
        errorMsg: false,
        loading: false,
    
});

const {
    email,
    password,
    errorMsg,
    loading,
  }  = formData;


  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      errorMsg: '',
    });
  };


  
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if ( isEmpty(email) || isEmpty(password)) {
        setFormData({
          ...formData, errorMsg: 'All fields are required',
        });
        } else if (!isEmail(email)) {
        setFormData({
          ...formData,errorMsg: 'Invalid email',
        });
      
      } else {
        const { email, password} = formData;
        const data = { email, password };
  
        setFormData({ ... formData, loading:true});
        
        signin(data)
        .then((response) => {
          setAuthentication(response.data.token, response.data.user);

          if ( isAuthenticated() && isAuthenticated().role === 1) {
            navigate.push('/admin/dashboard');
            console.log('Redirecting to admin dashboard');

          } else {
            navigate.push('/user/dashboard');
            console.log('Redirecting to user Dashboard');
         
          }
          

        })
        .catch((err) => {
          console.log('signin api function error: ', err);
        });
      

    }
  };



  const showSigninForm = () => (
    <form className='signin-form' onSubmit={handleSubmit}>
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input name='email' value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={handleChange}/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input name='password' value={password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={handleChange}/>
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" className="btn btn-primary">Signin</button>
      <p className='text-center text-white'>
           Don't have an account?   <Link to='/signup'>Register here</Link>
      </p>
    </form>
  );

  return (
    <div className='signin-container'>
      <div className='row px-3 vh-100'>
        <div className='col-md-5 mx-auto align-self-center '>
        {errorMsg && showErrorMsg(errorMsg)}
        {loading && (
          <div className='text-center pb-4'>{showLoading()}</div>
        )}
        {showSigninForm()}

        </div>
        
        </div> 
        
    </div>

);

};



export default Signin;
