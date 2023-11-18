type User = {
  id: number;
  login: string;
  name: string;
  photo?: string;
  description?: string;
};

export type UserWithoutId = Omit<User, 'id'>;

export default User;
