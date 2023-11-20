import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { type RootState } from '../../store';
import * as api from './api';

export default function LoginPage(): JSX.Element {
  const { isRegistered, user } = useSelector((store: RootState) => store.userReducer);

  const [login, setLogin] = useState(() => {
    if (isRegistered && user) return user.login;
    return '';
  });
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    setError(null);
    event.preventDefault();

    if (login === '' || password === '') {
      setError('Заполните все поля');
      return;
    }

    api
      .login({ login, password })
      .then((userData) => {
        setError(null);
        // если все успешно, кладем юзера в стор
        dispatch({ type: 'user/login', payload: userData });
        // и отправляем на главную страницу
        navigate('/');
      })
      .catch((e: Error) => {
        console.error(e);
        setError(e.message);
      });
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-5">
      {isRegistered && user && <div className="mb-3"> Пользователь успешно зарегистрирован</div>}

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login">
            Login
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="login"
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <p className="text-red-500 text-xs italic">Введите пароль</p> */}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Войти
          </button>
        </div>
        {error && <div className="text-red-700">{error}</div>}
      </form>
    </div>
  );
}
