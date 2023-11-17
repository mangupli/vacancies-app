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