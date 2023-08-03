import React, { useState } from "react";
function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (email == "" || password == "") {
      alert("Please enter the email and password");
    } else {
      fetch("http://localhost:5173/users/signin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.text())
        .then((data) => {
          if (data != "true") {
            alert(data);
          } else {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("email", email);
            window.location.reload();
          }
        });
    }
  };

  return (
    <React.Fragment>
      <form>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <br />
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
      </form>
    </React.Fragment>
  );
}

export default SignInForm;
