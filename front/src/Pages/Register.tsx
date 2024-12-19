import { useContext, useEffect } from "react";
import { UserDispatch, UserAction, UserContext } from "../UserContext";
import { Link, useNavigate } from "react-router-dom";

// Attempt to register user
async function fetchRegister(username: string, password: string, dispatchFunction: any, onSuccess: Function, onFail: Function) {
  try {
    const response = await fetch('http://localhost:8080/user/register', {
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
      onFail("Failed to create user account");
      return;
    }

    const json = await response.json();

    // If got json response, set context
    if (json == true) {
      onSuccess();

      dispatchFunction?.({
        action: UserAction.LOGIN, payload: {
          username: username,
          userId: json.userId
        }
      });
    } else {
      onFail("Failed to create user account");
    }
  } catch (e) {
    console.log(e);

    onFail("Internal server error");
  }
}

export default function Register() {

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
      <h1>Register page</h1>
      <p>Your password must be at least 8 chatacters long.</p>

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

      <input type="submit" value="Register" onClick={(e) => {
        e.preventDefault();
        var currentTarget = e.currentTarget;
        currentTarget.disabled = true;

        let username = (document.getElementById("username") as HTMLInputElement).value;
        let password = (document.getElementById("password") as HTMLInputElement).value;

        fetchRegister(username, password, userDispatch,
          () => {

          },
          (errorMessage: string) => {
            currentTarget.disabled = false;
            (document.getElementById("fail-message") as HTMLElement).innerHTML = errorMessage;
          });
      }}></input>

      <br /><Link to="/login">Login to existing account</Link>

      <p id="fail-message" style={{ color: "red" }}></p>
    </>
  );
}