import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EllipsisHorizontalCircleIcon, HeartIcon as Heart } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';

import styles from './vacancies.module.css';
import { type RootState } from '../../store';

import * as api from './api';
import type Vacancy from './redux/types/Vacancy';
import ModalWarning from './ModalWarning';

type VacancyPropsType = {
  vacancy: Vacancy;
};

function VacancyCard({ vacancy }: VacancyPropsType): JSX.Element {
  const dispatch = useDispatch();

  const favorites = useSelector((store: RootState) => store.userReducer.favorites);
  const user = useSelector((store: RootState) => store.userReducer.user);

  const isFavorite = useMemo(() => favorites.find((v) => v.id === vacancy.id), [favorites]);

  const [showWarning, setShowWarning] = useState(false);

  const handleRemoveFromFavorites = async (id: Vacancy['id']): Promise<void> => {
    try {
      await api.removeFromFavorites(id);
      dispatch({ type: 'user/favorites/remove', payload: id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToFavorites = async (id: Vacancy['id']): Promise<void> => {
    if (user) {
      try {
        await api.saveToFavorites(id);
        dispatch({ type: 'user/favorites/add', payload: vacancy });
      } catch (error) {
        console.error(error);
      }
    } else {
      setShowWarning(true);
    }
  };

  const closeModal = useCallback(() => setShowWarning(false), []);

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

      {isFavorite ? (
        <HeartSolid onClick={handleRemoveFromFavorites} className="w-8 ml-2 cursor-pointer" />
      ) : (
        <Heart
          className="w-8 ml-2 cursor-pointer"
          onClick={() => handleAddToFavorites(vacancy.id)}
        />
      )}
      {showWarning && <ModalWarning  />}
    </div>
  );
}

export default VacancyCard;
