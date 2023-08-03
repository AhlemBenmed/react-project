import React, { useState } from "react";
import "../style/profile.css";
function Profilepage() {
  const [pass, setPass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confpass, setConfpass] = useState("");
  const email = localStorage.getItem("email");
  const handlechangepassword = () => {
    console.log(email, newpass, pass);
    if (newpass == "" || confpass == "" || pass == "") {
      alert("Please enter all of your passwords");
    } else if (newpass != confpass) {
      alert("the confirm password is incorrect");
    } else {
      fetch("http://localhost:5173/users/pass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, nPassword: newpass, password: pass }),
      })
        .then((response) => response.text())
        .then((data) => {
          if (data != "true") {
            alert(data);
          } else {
            alert("Password changed ! :)");
            setPass("")
            setConfpass("")
            setNewpass("")
          }
        });
    }
  };
  return (
    <React.Fragment>
      <form className="container">
        <h1>&#128272;</h1>
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="current password"
          required
        />
        <br />
        <input
          type="password"
          value={newpass}
          onChange={(e) => setNewpass(e.target.value)}
          placeholder="new password"
          required
        />
        <br />
        <input
          type="password"
          value={confpass}
          onChange={(e) => setConfpass(e.target.value)}
          placeholder="confirm password"
          required
        />
        <br />
        <button type="button" onClick={handlechangepassword}>
          Change password
        </button>
      </form>
    </React.Fragment>
  );
}
export default Profilepage;
