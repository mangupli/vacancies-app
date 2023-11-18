import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserInfo } from 'путь_к_вашему_действию_обновления_информации_о_пользователе';
import NotLoggedIn from 'путь_к_вашему_компоненту_не_авторизованного_пользователя';
import { RootState } from 'путь_к_вашему_корневому_редюсеру';
import { useSelector } from 'react-redux';

export default function ProfilePage(): JSX.Element {
  const user = useSelector((store: RootState) => store.userReducer.user);
  const isLoggedIn = useSelector((store: RootState) => store.userReducer.isLoggedIn);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userDescription, setUserDescription] = useState<string>(user?.description || '');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handlePhotoUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('photo', selectedFile);

      // Вызовите функцию для отправки формы на сервер
      sendFormDataToServer(formData);
    }
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserDescription(event.target.value);
  };

  const handleDescriptionUpdate = () => {
    // Вызовите действие для обновления описания пользователя
    dispatch(updateUserInfo({ ...user, description: userDescription }));
  };

  const sendFormDataToServer = async (formData: FormData) => {
    try {
      // Отправка запроса на сервер для обновления фотографии пользователя
      const response = await fetch('путь_к_вашему_серверному_маршруту_обновления_фото', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Если запрос успешен, обновите информацию о пользователе в Redux
        const updatedUser = await response.json();
        dispatch(updateUserInfo(updatedUser));
      } else {
        // Обработка ошибок при неудачном запросе
        console.error('Ошибка при обновлении фотографии пользователя');
      }
    } catch (error) {
      console.error('Ошибка при отправке запроса:', error);
    }
  };

  // ... (остальной код для описания профиля)

  return (
    <>
      <div>
        <h1 className="underline decoration-wavy">Здравствуйте, {user.name}!</h1>
        <img src="/cat-anonymous.jpeg" alt="" srcSet="" />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button onClick={handlePhotoUpload}>Загрузить фото</button>

        {/* Описание профиля */}
      </div>
    </>
  );
}
