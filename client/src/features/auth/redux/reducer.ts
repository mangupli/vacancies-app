import type AuthAction from './types/AuthAction';
import type AuthState from './types/AuthState';

export const initState: AuthState = {
  user: undefined,
  isRegistered: false,
  isLoggedIn: false,
};

// eslint-disable-next-line @typescript-eslint/default-param-last
function reducer(state: AuthState = initState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'user/login':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'user/logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      };
    case 'user/register':
      return {
        ...state,
        isRegistered: true,
        user: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
