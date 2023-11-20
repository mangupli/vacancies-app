import React from 'react';

type Props = {
  closeModal: () => void;
};
function ModalWarning({ closeModal }: Props): JSX.Element {
  return (
    <div
      className="overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.2) '}}
    >
      <div className="relative p-4 top-1/3 left-1/4 w-full max-w-xl max-h-full">
        <div className="relative bg-white rounded-lg shadow p-4 text-center">
          <div>Чтобы добавить в избранное, нужно зарегистрироваться</div>
          <button
            type="button"
            onClick={closeModal}
            className="text-gray-400 bg-transparent p-2 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm justify-center items-center"
          >
            Хорошо
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ModalWarning);
