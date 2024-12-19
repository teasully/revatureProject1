import { useContext, useEffect } from "react";
import { UserDispatch, UserAction, UserContext } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";

// Attempt to login user
async function fetchAuthenticate(username: string, password: string, dispatchFunction: any, onSuccess: Function, onFail: Function) {
  try {
    const response = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });
    if (!response.ok) {
      onFail("Invalid user credentials");
      return;
    }

    const json = await response.json();

    // If got json response, set context
    if (json) {
      onSuccess();

      dispatchFunction?.({
        action: UserAction.LOGIN, payload: {
          username: username,
          userId: json.userId
        }
      });

      if (json.role === "manager")
        dispatchFunction?.({ action: UserAction.ASSIGN_MANAGER });
    } else {
      onFail("Invalid user account");
    }
  } catch (e) {
    console.log(e);

    onFail("Internal server error");
  }
}

export default function Login() {

  // Check successful login; redirect to home page
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userContext.authenticated) {
      navigate("/");
    }
  }, [userContext]);

  // Login form; call user dispatch on submit
  const userDispatch = useContext(UserDispatch);
  return (
    <>
      <h1>Login page</h1>
      <p>Login to an existing account.</p>

      <table>
        <tbody>
          <tr>
            <td><label>Username: </label></td>
            <td><input id="username" type="text"></input></td>
          </tr>
          <tr>
            <td><label>Password: </label></td>
            <td><input type="password" id="password"></input></td>
          </tr>
        </tbody>
      </table>

      <input type="submit" value="Login" onClick={(e) => {
        e.preventDefault();
        var currentTarget = e.currentTarget;
        currentTarget.disabled = true;

        let username = (document.getElementById("username") as HTMLInputElement).value;
        let password = (document.getElementById("password") as HTMLInputElement).value;

        fetchAuthenticate(username, password, userDispatch,
          () => { },
          (errorMessage: string) => {
            currentTarget.disabled = false;
            (document.getElementById("fail-message") as HTMLElement).innerHTML = errorMessage;
          });
      }}></input>

      <br /><Link to="/register">Create new account</Link>

      <p id="fail-message" style={{ color: "red" }}></p>
    </>
  );
}