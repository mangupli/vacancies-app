import type User from './User';

type AuthAction =
  | {
      type: 'user/login';
      payload: User;
    }
  | {
      type: 'user/logout';
    }
  | {
      type: 'user/register';
      payload: User;
    };

export default AuthAction;
