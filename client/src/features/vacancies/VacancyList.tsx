import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import VacancyCard from './VacancyCard';
import { type RootState } from '../../store';
import { loadVacancies } from './api';

function VacancyList(): JSX.Element {
  const vacanciesList = useSelector((store: RootState) => store.vacanciesReducer.vacanciesList);

  const dispatch = useDispatch();

  useEffect(() => {
    loadVacancies()
      .then((data) => {
        dispatch({ type: 'vacancies/load', payload: data });
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="max-w-screen-sm mx-auto mt-2">
      {vacanciesList.map((vacancy) => {
        <VacancyCard vacancy={vacancy} key={vacancy.id} />;
      })}
    </div>
  );
}

export default VacancyList;
