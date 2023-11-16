import React from 'react';
import { Outlet } from 'react-router';
import Header from './Header';

export default function Layout(): JSX.Element {
  return (
    <>
      <Header />
      {/* динамически будет подставляться компонент из вложеннного Route */}
      <Outlet />
    </>
  );
}
