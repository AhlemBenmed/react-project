import React, { useState } from 'react';
function SignUpForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if(name=='' || email==''|| password==''){
        alert('Please enter the name and email and password')
    }
    else{
    fetch('http://localhost:5173/merchants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then(response => response.text())
      .then(data => {
        if (data!='true'){
            alert('this email already exists')
          }else{
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('email', email);
            window.location.reload()
          }
      });}
  };

  return (
    <React.Fragment>
    <form>
      <input
        type="text"
        onChange={e => setName(e.target.value)}
        placeholder="Name"
        required/>
      <br />
      <input
        type="email"
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required/>
      <br />
      <input
        type="password"
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required/>
      <br />
      <button type="button" onClick={handleSignUp}>
        Sign Up
      </button>
    </form>
    </React.Fragment>
  );
}

export default SignUpForm;
