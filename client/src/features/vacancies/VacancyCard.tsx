import React from 'react';
import { Link } from 'react-router-dom';
import type Vacancy from './redux/types/Vacancy';

import styles from './vacancies.module.css';
import { useAppDispatch } from '../../store';

type VacancyPropsType = {
  vacancy: Vacancy;
};

function VacancyCard({ vacancy }: VacancyPropsType): JSX.Element {
  const dispatch = useAppDispatch();

  const handleRemove = async (id: Vacancy['id']): Promise<void> => {
    // кинула запрос на сервер (тот удалит из бд)
    const response = await fetch(`/api/vacancies/${id}`, {
      method: 'DELETE',
    });
    // дожидаюсь ответа  - от сервера пришла айди удеаленной вакансии
    const data: string = await response.json();
    //  меняю стейт
    dispatch({ type: 'vacancies/remove', payload: +data });
  };

  return (
    <div className={styles.vacancyCard} key={vacancy.id}>
      <Link to={`/vacancies/${vacancy.id}`}>
        {' '}
        <h4>{vacancy.title}</h4>
      </Link>
      <b>{vacancy.salary}</b>
      <p>{vacancy.project}</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full"
        type="button"
        onClick={() => handleRemove(vacancy.id)}
      >
        Удалить
      </button>
    </div>
  );
}

export default VacancyCard;
