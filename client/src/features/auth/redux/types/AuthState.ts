import type Vacancy from '../../../vacancies/redux/types/Vacancy';
import type User from './User';

type AuthState = {
  user: User | undefined;
  isRegistered: boolean;
  isLoggedIn: boolean;
  favorites: Vacancy[]
};

export default AuthState;
