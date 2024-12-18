import { useContext, useEffect } from "react";
import { UserDispatch, UserAction, UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

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
    const json = await response.json();

    // If authenticated, dispatch user context
    if (json == true) {
      onSuccess();

      dispatchFunction?.({
        action: UserAction.LOGIN, payload: {
          username: username
        }
      });
    } else {
      onFail();
    }
  } catch (e) {
    console.log(e);
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

        fetchAuthenticate(username, password, userDispatch, () => {

        }, () => {
          currentTarget.disabled = false;
          (document.getElementById("fail-message") as HTMLElement).innerHTML = "Invalid user account.";
        });
      }}></input>

      <p id="fail-message" style={{ color: "red" }}></p>
    </>
  );
}