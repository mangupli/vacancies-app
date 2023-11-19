/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type User from './redux/types/User';
import type { UserWithoutId } from './redux/types/User';

export const login = async (userData: { login: string; password: string }): Promise<User> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (response.ok) {
    const user: User = data.user;
    return user;
  }

  throw new Error(data.message);
};

export const register = async (userData: UserWithoutId & { password: string }): Promise<User> => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (response.ok) {
    const user: User = data.user;
    return user;
  }

  throw new Error(data.message);
};

export async function userCheck(): Promise<
  | {
      isLoggedIn: true;
      user: User;
    }
  | {
      isLoggedIn: false;
    }
> {
  return (await fetch('/api/auth/check')).json();
}

export async function updatePhoto(file: File): Promise<User> {
  const formData = new FormData();
  formData.append('photo', file);
  // Отправка запроса на сервер для обновления фотографии пользователя
  const response = await fetch('/api/profile/upload-photo', {
    method: 'POST',
    body: formData,
  });

  if (response.ok) {
    const updatedUser = await response.json();
    return updatedUser as User;
  }
  throw new Error('Ошибка при обновлении фотографии пользователя');
}

export async function updateProfile(description: string): Promise<User> {
  const response = await fetch('/api/profile/update-profile', {
    method: 'PUT',
    body: JSON.stringify({ description }),
    headers: {
      'Content-type': 'application/json',
    },
  });

  if (response.ok) {
    const updatedUser = await response.json();
    return updatedUser as User;
  }
  throw new Error('Ошибка при обновлении фотографии пользователя');
}
