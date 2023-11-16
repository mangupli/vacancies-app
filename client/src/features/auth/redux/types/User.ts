type User = {
  id: number;
  login: string;
  name: string;
};

export type UserWithoutId = Omit<User, 'id'>;

export default User;
