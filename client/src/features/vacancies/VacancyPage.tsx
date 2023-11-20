import React from 'react';
// import type Vacancy from './types/Vacancy';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import type Vacancy from './redux/types/Vacancy';
import type { RootState } from '../../store';

export default function VacancyPage(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();

  const vacanciesList = useSelector((store) => store.vacanciesReducer);

  let vacancy: Vacancy | undefined;

  if (id) {
    vacancy = vacanciesList.find((v) => v.id === +id);
  }

  const handleClick = (): void => {
    // navigate('/');
    navigate(-1);
  };

  return (
    <div className="max-w-screen-sm mx-auto mt-2">
      {vacancy ? (
        <>
          <h4 className="font-bold">{vacancy.title}</h4>
          <p>
            Зарплата: <span className="font-bold">{vacancy.salary}</span>
          </p>
          <p>Компания: {vacancy.company}</p>
          {vacancy.description ? <p>{vacancy.description}</p> : ''}
        </>
      ) : (
        <>Такой вакансии нет</>
      )}
      <button type="button" className="py-2 px-4 bg-green-400 mt-4" onClick={handleClick}>
        Назад
      </button>
    </div>
  );
}
