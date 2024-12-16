import { createContext, Dispatch, useReducer } from "react";
import { User } from "./User";

//
function UserReducer(userState: User, action: string) {
  switch (action) {

    default:
      return userState;
  }
}

// Create user context, pass context and dispatch for reducer
export const UserContext = createContext(new User());
export const UserDispatch = createContext<Dispatch<string> | undefined>(undefined);

interface UserProviderProps{
  children: React.ReactNode
}
export function UserProvider(props : UserProviderProps) {
  const [userState, userDispatch] = useReducer(UserReducer, new User());

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