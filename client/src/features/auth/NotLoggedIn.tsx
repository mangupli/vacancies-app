import React from 'react';
import { Link } from 'react-router-dom';

export default function NotLoggedIn(): JSX.Element {
  return (
    <div className="text-center p-4">
      Упс! Эта страница доступна только зарегистрированным пользователям
    </div>
  );
}
