type Vacancy = {
  id: number;
  title: string;
  project: string;
  salary: string;
  description?: string;
};

// Omit убирает id из Vacancy
export type VacancyWithoutId = Omit<Vacancy, 'id'>;

export default Vacancy;
