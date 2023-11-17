import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Main from './MainPage';
import GifPage from '../features/fun/GifPage';
import Layout from './Layout';
import VacancyPage from '../features/vacancies/VacancyPage';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import { useAppDispatch } from '../store';
import type User from '../features/auth/redux/types/User';
import * as authApi from '../features/auth/api';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    authApi.userCheck()
      .then((data) => {
        if (data.isLoggedIn) {
          const userData: User = data.user;
          dispatch({ type: 'user/login', payload: userData });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/eagle" element={<GifPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vacancies/:id" element={<VacancyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
