import type User from './User';

type AuthState = {
  user: User | undefined;
  isRegistered: boolean;
  isLoggedIn: boolean;
};

export default AuthState;
