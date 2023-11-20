import React from 'react';
import { useSelector } from 'react-redux';

import { type RootState } from '../../store';
import NotLoggedIn from './NotLoggedIn';
import ProfileInfo from './ProfileInfo';
import VacancyCard from '../vacancies/VacancyCard';

export default function ProfilePage(): JSX.Element {
  const user = useSelector((store: RootState) => store.userReducer.user);
  const isLoggedIn = useSelector((store: RootState) => store.userReducer.isLoggedIn);
  const favorites = useSelector((store: RootState) => store.userReducer.favorites);

  if (!isLoggedIn || !user) {
    return <NotLoggedIn />;
  }

  return (
    <div className="max-w-screen-lg mx-auto my-6 grid grid-cols-2 gap-3 place-items-start">
      <div className="w-4/5 text-left">
        <ProfileInfo user={user} />
      </div>

      <div className="w-4/5">
        <h2 className="mb-4 font-bold text-xl">Избранные вакансии</h2>
        <div>
          {favorites.length ? (
            favorites.map((vacancy) => <VacancyCard vacancy={vacancy} />)
          ) : (
            <i>У вас нет вакансий в избранном</i>
          )}
        </div>
      </div>
    </div>
  );
}
