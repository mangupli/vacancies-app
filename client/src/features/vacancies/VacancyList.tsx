import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import VacancyCard from './VacancyCard';
import { useAppDispatch, type RootState } from '../../store';

function VacancyList(): JSX.Element {
  const vacanciesList = useSelector((store: RootState) => store.vacanciesReducer.vacanciesList);

  const dispatch = useAppDispatch(); 

  useEffect(() => {
    fetch('/api/vacancies')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch({ type: 'vacancies/load', payload: data });
      })
      .catch((e) => console.log(e));
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
