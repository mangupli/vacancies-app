import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../store';
import type User from './redux/types/User';

export default function LoginPage(): JSX.Element {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        login,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        // нужно положить пользователя в стейт
        const userData: User = data.user;

        // если все успешно, кладем юзера в стор
        dispatch({ type: 'user/login', payload: userData });
        // и отправляем на главную страницу
        navigate('/')
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-5">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="login">
            Login
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="login"
            type="text"
            placeholder="Login"
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
            placeholder="******************"
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
      </form>
    </div>
  );
}
