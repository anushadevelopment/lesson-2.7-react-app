
import { createContext, useState } from "react";

const UserContext = createContext();

const initialCredentials = {
  username: "",
  password: "",
};

export function UserProvider({ children }) {
  // manage the user credentials state here
  const [credentials, setCredentials] = useState(initialCredentials);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handlerChangeCredentials = (e) => {
    setCredentials((prevCredentials) => {
      return {
        ...prevCredentials,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login succcess!");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials(initialCredentials);
  };

  const context = {
    // ES6 enhanced obj literal
    // credentials: credentials, -> credentials
    credentials: credentials,
    handlerChangeCredentials: handlerChangeCredentials,
    handleSubmit: handleSubmit,
    isLoggedIn: isLoggedIn,
    handleLogout: handleLogout,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
}

export default UserContext;
