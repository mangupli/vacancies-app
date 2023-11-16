import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import Main from './MainPage';
import EaglePage from '../features/fun/EaglePage';
import Layout from './Layout';
import VacancyPage from '../features/vacancies/VacancyPage';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import { useAppDispatch } from '../store';
import type User from '../features/auth/redux/types/User';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch('/api/auth/check')
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'success') {
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
        <Route path="/eagle" element={<EaglePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/vacancies/:id" element={<VacancyPage />} />
      </Route>
    </Routes>
  );
}

export default App;
