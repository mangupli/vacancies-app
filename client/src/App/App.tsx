import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Main from './MainPage';
import GifPage from '../features/fun/GifPage';
import Layout from './Layout';
import VacancyPage from '../features/vacancies/VacancyPage';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import { useAppDispatch } from '../store';
import type User from '../features/auth/redux/types/User';
import { userCheck } from '../features/auth/api';
import { loadFavorites } from '../features/vacancies/api';
import ProfilePage from '../features/auth/ProfilePage';
import './App.css'

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    userCheck()
      .then((data) => {
        if (data.isLoggedIn) {
          const userData: User = data.user;
          dispatch({ type: 'user/check', payload: userData });
          return loadFavorites();
        }
      })
      .then((vacancies) => {
        if (vacancies) {
          dispatch({ type: 'user/favorites/load', payload: vacancies });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/gif" element={<GifPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vacancies/:id" element={<VacancyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
}

export default App;
