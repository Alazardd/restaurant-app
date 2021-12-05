import React, {useState} from 'react';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import {showErrorMsg, showSuccessMsg} from '../helpers/message';
import { showLoading } from '../helpers/loading';
import {Link} from 'react-router-dom';
import { signup } from '../api/auth';
 
const Signup = () => {
  const[formData, setFormData] = useState({
    username: 'Alazar Dinberu',
    email: 'alazardinberu64@gmail.com',
    password: '123456',
    successMsg: false,
    errorMsg: false,
    loading: false,
  });
  const {
    username,
    email,
    password,
    successMsg,
    errorMsg,
    loading,
  }  = formData;

  const handleChange = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      successMsg: '',
      errorMsg: '',
    });
  };
            // event handlers
  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (isEmpty(username) || isEmpty(email) || isEmpty(password)) {
      setFormData({
        ...formData, errorMsg: 'All fields are required',
      });
      } else if (!isEmail(email)) {
      setFormData({
        ...formData,errorMsg: 'Invalid email',
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,errorMsg: 'Invalid email',
      });
    } else {
      const { username, email, password} = formData;
      const data = { username, email, password };

      setFormData({ ... formData, loading:true});
      
      signup(data)
         .then(response => {
           console.log('Axios signup success: ',response);
           setFormData({
             username: '',
             email: '',
             password: '',
             loading: false,
             successMsg: response.data.successMessage,

           })

         })
         .catch(err => {
           console.log('Axios signup error: ',err);
           setFormData({...formData, loading: false, errorMsg: err.response.data.errorMessage});

         });
    }
    

    
  };

    const showSignupForm = () => (
<form className='signup-form' onSubmit={handleSubmit}>
    {/*usernamr*/}
    <div className="form-group">
    <label for="exampleInputUsename">Username</label>
    <input name='username' value={username} type="text" className="form-control" id="exampleInputUsername" aria-describedby="emailHelp" placeholder="Enter username" onChange={handleChange}/>
    
  </div>
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
  <button type="submit" className="btn btn-primary">Signup</button>
  <p className='text-center text-white'>
       Already have an account?   <Link to='/signin'>Log In</Link>
  </p>
</form>
    );
    return (
        <div className='signup-container'>
          <div className='row px-3 vh-100'>
            <div className='col-md-5 mx-auto align-self-center '>
            {successMsg && showSuccessMsg(successMsg)}
            {errorMsg && showErrorMsg(errorMsg)}
            {loading && (
              <div className='text-center pb-4'>{showLoading()}</div>
            )}
            {showSignupForm()}
            {/* <p style={{color: 'white'}}>{JSON.stringify(formData)} </p> */}

            </div>
            
            </div> 
            
        </div>

    )
};

export default Signup;