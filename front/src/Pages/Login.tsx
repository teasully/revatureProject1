import { useContext, useEffect } from "react";
import { UserDispatch, UserAction, UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  // Check successful login; redirect to home page
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userContext.authenticated) {
      navigate("/");
    }
  });

  // Login form; call user dispatch on submit
  const userDispatch = useContext(UserDispatch);
  return (
    <>
      <h1>Login page</h1>

      <form>
        <label>Username: </label><input id="username" type="text"></input>
        <br />
        <label>Password: </label><input id="username" type="text"></input>
        <br />
        <input type="submit" value="Login" onClick={(e) => {
          e.preventDefault();

          userDispatch?.({ action: UserAction.LOGIN, payload: { username: "testUsername", password: "testPassword" } });
        }}></input>
      </form>
    </>
  );
}