import type Vacancy from './redux/types/Vacancy';

export const loadVacancies = async (): Promise<Vacancy[]> => {
  const response = await fetch('/api/vacancies');
  if (response.ok) {
    const data = await response.json();
    return data.vacancies;
  }
  const data: { message: string } = await response.json();
  throw new Error(data.message);
};

export const loadFavorites = async (): Promise<Vacancy[]> => {
  const response = await fetch('/api/favorites');
  if (response.ok) {
    const data: Vacancy[] = await response.json();
    return data;
  }
  const data: { message: string } = await response.json();
  throw new Error(data.message);
};

export const saveToFavorites = async (id: Vacancy['id']): Promise<void> => {
  const response = await fetch('/api/favorites', {
    method: 'POST',
    body: JSON.stringify({ id }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (response.ok) {
    return;
  }
  const data: { message: string } = await response.json();
  throw new Error(data.message);
};

export const removeFromFavorites = async (id: Vacancy['id']): Promise<void> => {
  const response = await fetch(`/api/favorites/${id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    return;
  }
  const data: { message: string } = await response.json();
  throw new Error(data.message);
};
