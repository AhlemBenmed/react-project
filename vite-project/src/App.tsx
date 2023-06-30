import React, { useState } from 'react';
import SignInForm from './pages/signIn';
import SignUpForm from './pages/signUp';
import MainPage from './pages/mainpage';
import"./style/App.css"
import user from './images/user.png';

function App() {
  const [showSignIn, setShowSignIn] = useState(true);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <React.Fragment>
      {!isLoggedIn &&
      <div className="container">
        <img src={user}/>
         {showSignIn ? <SignInForm /> : <SignUpForm />}
        {!showSignIn &&
        <button onClick={() => setShowSignIn(true)}>Sign In</button>}
        {showSignIn &&
        <button onClick={() => setShowSignIn(false)}>Sign Up</button>}
      </div>
      }
      {isLoggedIn && <MainPage/>}
      
    </React.Fragment>
  );
}

export default App;
