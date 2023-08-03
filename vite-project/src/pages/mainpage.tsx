import React, { useEffect, useState } from "react";
import "../style/mainpage.css";
import Profilepage from "./profile";
function MainPage() {
  const [searchQuery, setSearchQuery] = useState({
    id: "",
    name: "",
    type: "",
    address: "",
  });
  const [profile, setProfile] = useState(true);
  const [users, setusers] = useState("");
  let data: any = [];
  if (users != "") {
    data = JSON.parse(users);
  }
  useEffect(() => {
    getuser();
  }, []);
  function getuser() {
    fetch("http://localhost:5173/mainpage")
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        setusers(data);
      });
  }
  const handleSearch = () => {
    function filterBy(item: any) {
      const { id, name, type, address } = item;
      return (
        (searchQuery.id.toLowerCase().length > 0
          ? id.toString().includes(searchQuery.id.toLowerCase())
          : true) &&
        (searchQuery.name.toLowerCase().length > 0
          ? name.toLowerCase().includes(searchQuery.name.toLowerCase())
          : true) &&
        (searchQuery.type.toLowerCase().length > 0
          ? type.toLowerCase().includes(searchQuery.type.toLowerCase())
          : true) &&
        (searchQuery.address.toLowerCase().length > 0
          ? address.toLowerCase().includes(searchQuery.address.toLowerCase())
          : true) &&
        (searchQuery.id.toLowerCase().length > 0 ||
          searchQuery.name.toLowerCase().length > 0 ||
          searchQuery.type.toLowerCase().length > 0 ||
          searchQuery.address.toLowerCase().length > 0)
      );
    }
    const filteredData = data.filter(filterBy);
    setusers(JSON.stringify(filteredData));
  };
  const handleunSearch = () => {
    setSearchQuery({ id: "", name: "", type: "", address: "" });
    getuser();
  };
  const handleSignOut = () => {
    localStorage.setItem("isLoggedIn", "false");
    window.location.reload();
  };

  return (
    <React.Fragment>
      {profile && (
        <div>
          <div className="header">
            <button onClick={() => setProfile(false)}>&#128100;Profile</button>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
          <h1>Never get Lost</h1>
          <form id="inputs">
            <input
              type="text"
              value={searchQuery.id}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, id: e.target.value })
              }
              placeholder="Search by ID"
            />
            <input
              type="text"
              value={searchQuery.name}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, name: e.target.value })
              }
              placeholder="Search by Name"
            />
            <input
              type="text"
              value={searchQuery.type}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, type: e.target.value })
              }
              placeholder="Search by Type"
            />
            <input
              type="text"
              value={searchQuery.address}
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, address: e.target.value })
              }
              placeholder="Search by Address"
            />

            <button type="button" onClick={handleSearch}>
              Search
            </button>
            <button type="button" onClick={handleunSearch}>
              UnSearch
            </button>
          </form>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Type</th>
                <th>Address</th>
              </tr>
            </thead>
            {data.length > 0 && (
              <tbody>
                {data.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.address}</td>
                  </tr>
                ))}
              </tbody>
            )}
            {data.length <= 0 && (
              <tbody>
                <tr>
                  <td>data is not available</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      )}
      {!profile && (
        <React.Fragment>
          <div className="header">
            <button onClick={() => setProfile(true)}>Main Page</button>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
          <Profilepage />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default MainPage;
