export enum UserRole {
  NONE,

  EMPLOYEE,
  MANAGER,
}
export class User {
  userId: number;
  username?: string;

  authenticated: boolean;

  role: UserRole;

  constructor() {
    this.userId = -1;
    this.authenticated = false;

    this.role = UserRole.NONE;
  }
}