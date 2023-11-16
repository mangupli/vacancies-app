import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import type Vacancy from './redux/types/Vacancy';
import VacancyCard from './VacancyCard';
import { useAppDispatch, type RootState } from '../../store';

function VacancyList(): JSX.Element {
  // useSelector достаёт частичку глобального стора в компонент, чтобы отрисовать карточки
  const vacanciesList = useSelector((store: RootState) => store.vacanciesReducer.vacanciesList);

  // dispatch нам нужен, чтобы менять стор(стейт)
  // const dispatch = useDispatch(); 
  const dispatch = useAppDispatch(); // это наш типизированный useDispatch

  useEffect(() => {
    fetch('/api/vacancies')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const newVacancies: Vacancy[] = data.vacancies;
        // меняем стейт (чтобы перерисовалось на страничке)
        dispatch({ type: 'vacancies/load', payload: newVacancies });
      })
      .catch((e) => console.log(e));

    return () => console.log('Очистка эффекта'); // сработает при размонтировании
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto mt-2">
      {vacanciesList.map((vacancy) => (
        <VacancyCard vacancy={vacancy} />
      ))}
    </div>
  );
}

export default VacancyList;

// Порядок срабатывания:
// 1. монтирование (срабатывает return, возвращается верстка)
// 2. useEffect
// 3. dispatch(action) -> reducer -> поменялся объект state
// 4. внутри контекста тоже поменялся (это одна и та же переменная)
// 5. re-render


