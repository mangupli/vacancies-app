import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppDispatch, type RootState } from '../store';

export default function Header(): JSX.Element {
  const { user, isLoggedIn } = useSelector((store: RootState) => store.userReducer);

  const dispatch = useAppDispatch();

  const handleLogout: React.MouseEventHandler<HTMLButtonElement> = () => {
    fetch('/api/auth/logout')
      .then((response) => {
        if (response.ok) {
          dispatch({ type: 'user/logout' });
        }
      })
      .catch((error: Error) => console.log(error.message));
  };

  return (
    <nav className="bg-green-200 border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link className="underline" to="/">
          cамые лучшие вакансии в it
        </Link>

        {/* если user есть в сторе - то приветствуем его */}
        {isLoggedIn && user && (
          <div className="underline decoration-wavy">привет, {user.name}!</div>
        )}

        <Link to="/eagle">
          <button type="button" className="outline-dashed p-2 hover:bg-violet-600 hover:text-white">
            гифка
          </button>
        </Link>

        {isLoggedIn && user ? (
          <button
            onClick={handleLogout}
            type="button"
            className="outline-dashed p-2 hover:bg-violet-600 hover:text-white"
          >
            выйти
          </button>
        ) : (
          <div>
            <Link to="/register">
              <button
                type="button"
                className="outline-dashed p-2 hover:bg-violet-600 hover:text-white mr-3"
              >
                регистрация
              </button>
            </Link>
            <Link to="/login">
              <button
                type="button"
                className="outline-dashed p-2 hover:bg-violet-600 hover:text-white"
              >
                войти
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
