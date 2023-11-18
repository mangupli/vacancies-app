import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import type { RootState } from '../store';

export default function ProtectedRoute({
  redirectPath = '/',
}: {
  redirectPath: string;
}): JSX.Element {
  const user = useSelector((store: RootState) => store.userReducer.user);

  if (!user) {
    // перенаправляет на страницу по нужному адресу, если пользователя нет
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}
