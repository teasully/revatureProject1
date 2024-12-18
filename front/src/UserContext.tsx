import { createContext, Dispatch, useReducer } from "react";
import { User, UserType } from "./Entities/User";

// Reducer actions
export enum UserAction {
  NONE,

  LOGIN,
  LOGOUT,
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

        username: reducerData.payload?.username,
        role: UserType.MANAGER,

        authenticated: true
      }

    case UserAction.LOGOUT:
      return new User();

    default:

      if (reducerData.payload) {
        console.log(reducerData.payload);
      }

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