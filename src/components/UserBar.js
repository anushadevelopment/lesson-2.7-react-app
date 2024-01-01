import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import styles from "./UserBar.module.css";

function UserBar() {
  const userCtx = useContext(UserContext);

  const {
    credentials,
    handlerChangeCredentials,
    handleSubmit,
    isLoggedIn,
    handleLogout,
  } = userCtx;
  // const [credentials, setCredentials] = useState({
  //   username: "",
  //   password: "",
  // });
  // console.log(credentials);
  // const handlerChangeCredentials = (e) => {
  //   setCredentials((prevCredentials) => {
  //     return {
  //       ...prevCredentials,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Login succcess!");
  // };

  return (
    <div className={styles.userBarContainer}>
      {!isLoggedIn ? (
        <form className={styles.userBarForm} onSubmit={handleSubmit}>
          <label className={styles.input}>username</label>
          <input
            className={styles.input}
            name="username"
            value={credentials.username}
            onChange={handlerChangeCredentials}
            style={{ padding: 5, borderRadius: 5, border: "1px solid #888" }}
          />
          <label>password</label>
          <input
            name="password"
            value={credentials.password}
            onChange={handlerChangeCredentials}
            style={{ padding: 5, borderRadius: 5, border: "1px solid #888" }}
            type="password"
          />
          <button style={{ width: 100, height: 30, fontSize: 12 }}>
            Login
          </button>
        </form>
      ) : (<p> Welcome {credentials.username} <span> <button onClick={handleLogout}> Logout</button></span></p>)}
    </div>
  );
}

export default UserBar;
