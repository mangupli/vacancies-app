import React, { useState } from 'react';

export default function AddVacancyForm(): JSX.Element {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [salary, setSalary] = useState('');


  return (
    <div className="container">
      <form>
        <h4>Опубликовать вакансию</h4>
        <div className="form-group">
          <label>
            название вакансии:
            <input
              type="text"
              className="form-control"
              placeholder="супер-мега программист"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            зарплата:
            <input
              type="text"
              className="form-control"
              placeholder="от 10000$"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Проект:
            <input
              type="text"
              className="form-control"
              placeholder="эльбрус буктэмп"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>
          Добавить
        </button>
      </form>
    </div>
  );
}
