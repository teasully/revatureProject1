import { useContext } from "react";
import { UserContext } from "../UserContext";

function Home() {

  const userContext = useContext(UserContext);

  return (
    <>
      <h1>Welcome to Project 1</h1>
      <p>
        This project is a full-stack single-page web application that consists of a React/TypeScript frontend and a Java Spring backend utilizing AWS RDS.
      </p>
      <p>
        This web application is meant to represent a ticketing reimbursement system for a business. It features the ability to login or register as a user. Once logged in, depending on user role, you will be given different features. For the employee role, you can submit a reimbursement ticket to be processed or view your current and past tickets. For the manager role, you can view pending tickets and then process them.
      </p>

      {userContext.authenticated ? <></> : <p>Use the nav-bar at the top to login or register if you do not have an account.</p>}

      <img src="https://github.com/brianAray/2126-Java-Full-Stack-PEP/raw/main/projects/project_1/images/Activity-Diagram.png"/>
    </>
  );
}

export default Home;