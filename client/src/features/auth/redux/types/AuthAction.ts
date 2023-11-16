import type User from './User';

type AuthAction =
  | {
      type: 'user/login';
      payload: User;
    }
  | {
      type: 'user/logout';
    };

export default AuthAction;
