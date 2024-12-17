export enum UserType {
  NONE,

  EMPLOYEE,
  MANAGER,
}
export class User {
  username?: string;

  authenticated: boolean;

  role: UserType;

  constructor() {
    this.authenticated = false;

    this.role = UserType.NONE;
  }
}