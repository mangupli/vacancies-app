import type Vacancy from './Vacancy';

type Action =
  | {
      type: 'vacancies/load';
      payload: Vacancy[];
    }
  | {
      type: 'vacancies/remove';
      payload: Vacancy['id']; // number
    }
  | {
      type: 'vacancies/add';
      payload: Vacancy;
    }
  | {
      type: 'vacancies/update';
      payload: Vacancy;
    };

export default Action;
