import type Vacancy from '../../../vacancies/redux/types/Vacancy';
import type User from './User';

type AuthAction =
  | {
      type: 'user/login';
      payload: User;
    }
  | {
      type: 'user/check';
      payload: User;
    }
  | {
      type: 'user/logout';
    }
  | {
      type: 'user/register';
      payload: User;
    }
  | {
      type: 'user/favorites/load';
      payload: Vacancy[];
    }
  | {
      type: 'user/favorites/add';
      payload: Vacancy;
    }
  | {
      type: 'user/favorites/remove';
      payload: Vacancy['id'];
    }
  | {
      type: 'user/updateInfo';
      payload: User;
    };

export default AuthAction;
