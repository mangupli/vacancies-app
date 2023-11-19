import React, { useState } from 'react';
import type User from './redux/types/User';
import { useAppDispatch } from '../../store';
import * as api from './api';

export default function UserProfile({ user }: { user: User }): JSX.Element {
  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userDescription, setUserDescription] = useState<string>(user?.description || '');

  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [showDescForm, setShowDescForm] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handlePhotoUpload = async (): Promise<void> => {
    if (selectedFile) {
      try {
        const updatedUser = await api.updatePhoto(selectedFile);
        dispatch({ type: 'user/updateInfo', payload: updatedUser });
        setShowPhotoForm(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDescriptionUpdate: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ): Promise<void> => {
    try {
      e.preventDefault();
      await api.updateProfile(userDescription);
      dispatch({ type: 'user/updateInfo', payload: { ...user, description: userDescription } });
      setShowDescForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className="underline decoration-wavy font-bold">Привет, {user.name}!</h1>
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

      {showDescForm ? (
        <form onSubmit={handleDescriptionUpdate}>
          <label htmlFor="description">
            Описание профиля:
            <input
              id="description"
              value={userDescription}
              onChange={(e) => setUserDescription(e.target.value)}
            />
          </label>
          <button type="submit">Обновить описание</button>
        </form>
      ) : (
        <>
          <div>
            {user.description ??
              'Здесь можно добавить описание к своему профилю: ваш опыт, стэк или идеи для проектов.'}
          </div>
          <button onClick={() => setShowDescForm(true)} type="button">
            Обновить описание
          </button>
        </>
      )}
    </>
  );
}
