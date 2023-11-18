import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import * as api from './api';
import { type RootState, useAppDispatch } from '../../store';
import NotLoggedIn from './NotLoggedIn';

export default function ProfilePage(): JSX.Element {
  const user = useSelector((store: RootState) => store.userReducer.user);
  const isLoggedIn = useSelector((store: RootState) => store.userReducer.isLoggedIn);

  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userDescription, setUserDescription] = useState<string>(user?.description || '');
  const [showPhotoForm, setShowPhotoForm] = useState(false);

  if (!isLoggedIn || !user) {
    return <NotLoggedIn />;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handlePhotoUpload = async (): Promise<void> => {
    if (selectedFile) {
      try {
        const updatedUser = await api.sendPhoto(selectedFile);
        dispatch({ type: 'user/updateInfo', payload: updatedUser });
        setShowPhotoForm(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserDescription(event.target.value);
  };

  const handleDescriptionUpdate = () => {
    // Вызовите действие для обновления описания пользователя
    // dispatch(updateUserInfo({ ...user, description: userDescription }));
  };

  return (
    <>
      <div>
        <h1 className="underline decoration-wavy">Здравствуйте, {user.name}!</h1>
        <img src={user.photo ?? '/cat-anonymous.jpeg'} className="w-48" alt="" srcSet="" />
        {!showPhotoForm ? (
          <button type="button" onClick={() => setShowPhotoForm(true)}>
            Изменить фото
          </button>
        ) : (
          <>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button onClick={handlePhotoUpload} type="button">
              Загрузить фото
            </button>
          </>
        )}

        <div>
          {user.description ? (
            <>
              <label htmlFor="description">Описание профиля:</label>
              <textarea
                id="description"
                value={userDescription}
                onChange={handleDescriptionChange}
              />
              <button onClick={handleDescriptionUpdate} type="button">
                Обновить описание
              </button>
            </>
          ) : (
            <>
              Здесь можно добавить описание к своему профилю: ваш опыт, стэк или идеи для проектов.
            </>
          )}
        </div>
      </div>
      <div className="">Избранные вакансии</div>
    </>
  );
}
