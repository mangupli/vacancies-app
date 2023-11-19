import React from 'react';
import { useSelector } from 'react-redux';

import { type RootState } from '../../store';
import NotLoggedIn from './NotLoggedIn';
import ProfileInfo from './ProfileInfo';

export default function ProfilePage(): JSX.Element {
  const user = useSelector((store: RootState) => store.userReducer.user);
  const isLoggedIn = useSelector((store: RootState) => store.userReducer.isLoggedIn);

  if (!isLoggedIn || !user) {
    return <NotLoggedIn />;
  }

  return (
    <div className="flex">
      <div className="">
        <ProfileInfo user={user} />
      </div>

      <div className="">Избранные вакансии</div>
    </div>
  );
}
