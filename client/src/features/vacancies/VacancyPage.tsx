import React from 'react';
// import type Vacancy from './types/Vacancy';
import { useNavigate, useParams } from 'react-router';
import type Vacancy from './redux/types/Vacancy';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function VacancyPage(): JSX.Element {
  // достаем из адресной строки id
  // (название переменной совпадает с параметризированным запросом в компонента Route)
  const { id } = useParams();
  const navigate = useNavigate();

  const vacanciesList = useSelector((store: RootState) => store.vacanciesReducer.vacanciesList);

  let vacancy: Vacancy | undefined;

  if (id) {
    vacancy = vacanciesList.find((v) => v.id === +id);
  }

  const handleClick = (): void => {
    // navigate('/');
    navigate(-1);
  };

  return (
    <div className="container vacancy-card">
      {vacancy ? (
        <>
          <h4>{vacancy.title}</h4>
          <b>{vacancy.salary}</b>
          <p>{vacancy.project}</p>
          {vacancy.description ? <p>{vacancy.description}</p> : ''}
        </>
      ) : (
        <>Такой вакансии нет</>
      )}
      <button type="button" onClick={handleClick}>
        Назад
      </button>
    </div>
  );
}
