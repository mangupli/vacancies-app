import type Action from './types/Action';
import type State from './types/State';

export const initState: State = {
  vacanciesList: []
};

// для каждого раздела сайта - свой редьюсер
function reducer(state: State = initState, action: Action): State {
  switch (action.type) {
    case 'vacancies/load':
      return {
        ...state,
        vacanciesList: action.payload,
      };
    case 'vacancies/remove':
      return {
        ...state,
        vacanciesList: state.vacanciesList.filter((v) => v.id !== action.payload),
      };
    case 'vacancies/add':
      return {
        ...state,
        // вот так добавляяется новый элемент в массив
        vacanciesList: [...state.vacanciesList, action.payload],
      };
    case 'vacancies/update':
      return {
        ...state,
        // вот примерно так выглядит update
        vacanciesList: state.vacanciesList.map((v) => {
          if (v.id === action.payload.id) {
            return action.payload;
          }
          return v;
        }),
      };

    default:
      return state;
  }
}

export default reducer;
