import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate } from "react-router-dom";

interface AuthenticatedRouteProps {
  children: React.ReactNode
}
export default function AuthenticatedRoute(props: AuthenticatedRouteProps) {

  const userContext = useContext(UserContext);

  return userContext.authenticated ? props.children : <Navigate to="/" replace />;
}