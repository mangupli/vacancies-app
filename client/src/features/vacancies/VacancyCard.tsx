import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { EllipsisHorizontalCircleIcon, HeartIcon as Heart } from '@heroicons/react/24/outline';
import { HeartIcon } from '@heroicons/react/24/solid';

import styles from './vacancies.module.css';
import { type RootState, useAppDispatch } from '../../store';

import * as api from './api';
import type Vacancy from './redux/types/Vacancy';

type VacancyPropsType = {
  vacancy: Vacancy;
};

function VacancyCard({ vacancy }: VacancyPropsType): JSX.Element {
  const dispatch = useAppDispatch();

  const favorites = useSelector((store: RootState) => store.userReducer.favorites);

  const isFavorite = useMemo(() => favorites.find((v) => v.id === vacancy.id), [favorites]);

  const handleRemoveFromFavorites = async (id: Vacancy['id']): Promise<void> => {
    try {
      await api.removeFromFavorites(id);
      dispatch({ type: 'user/favorites/remove', payload: id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToFavorites = async (id: Vacancy['id']): Promise<void> => {
    try {
      await api.saveToFavorites(id);
      dispatch({ type: 'user/favorites/add', payload: vacancy });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.vacancyCard} key={vacancy.id}>
      <div className="flex items-center">
        <h4>{vacancy.title}</h4>
        <Link to={`/vacancies/${vacancy.id}`}>
          <EllipsisHorizontalCircleIcon className="w-8 ml-2" />
        </Link>
      </div>

      <b>{vacancy.salary}</b>
      <p>{vacancy.project}</p>
      <Heart className="w-8 ml-2"/> 
      <HeartIcon className="w-8 ml-2" />
      {isFavorite ? (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full"
          type="button"
          onClick={() => handleRemoveFromFavorites(vacancy.id)}
        >
          Удалить
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full"
          type="button"
          onClick={() => handleAddToFavorites(vacancy.id)}
        >
          Добавить в избранное
        </button>
      )}
    </div>
  );
}

export default VacancyCard;
