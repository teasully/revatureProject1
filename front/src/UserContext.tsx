import { createContext, Dispatch, useReducer } from "react";
import { User, UserRole } from "./Entities/User";

// Reducer actions
export enum UserAction {
  NONE,

  LOGIN,
  LOGOUT,

  ASSIGN_MANAGER
}

// Handle user context actions
interface UserReducerData {
  action: UserAction,

  payload?: any
}
function userReducer(userState: User, reducerData: UserReducerData) {
  switch (reducerData.action) {

    case UserAction.LOGIN:
      return {
        ...userState,

        userId: reducerData.payload?.userId,
        username: reducerData.payload?.username,
        authenticated: true,

        role: UserRole.EMPLOYEE
      }

    case UserAction.LOGOUT:
      return new User();

    case UserAction.ASSIGN_MANAGER:
      return {
        ...userState,

        role: UserRole.MANAGER
      }

    default:
      return userState;
  }
}

// Create user provider, pass context and dispatch to children
export const UserContext = createContext(new User());
export const UserDispatch = createContext<Dispatch<UserReducerData> | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode
}
export function UserProvider(props: UserProviderProps) {
  const [userState, userDispatch] = useReducer(userReducer, new User());

  return (
    <>
      <UserContext.Provider value={userState}>
        <UserDispatch.Provider value={userDispatch}>
          {props.children}
        </UserDispatch.Provider>
      </UserContext.Provider>
    </>
  );
}