import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Step3 = () => {
  const [text, setText] = useState('');
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [isFormSuccess, setFormSuccess] = useState(false);
  const [isFormError, setFormError] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedText = localStorage.getItem('aboutText');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  const handleChange = (event) => {
    const inputText = event.target.value.slice(0, 200);
    setText(inputText);
    localStorage.setItem('aboutText', inputText);
  };

  const handleSubmit = () => {
    const formData = {
      nickname: localStorage.getItem('nickname'),
      name: localStorage.getItem('name'),
      surname: localStorage.getItem('surname'), // Corrected typo: sername -> surname
      phone: localStorage.getItem('phone'),
      email: localStorage.getItem('email'),
      gender: localStorage.getItem('gender'),
      advantages: localStorage.getItem('advantages'), // Corrected typo: advanteges -> advantages
      checkbox: localStorage.getItem('checkboxValues'),
      radio: localStorage.getItem('radioValue'),
      about: text,
    };

    axios.post('https://api.sbercloud.ru/content/v1/bootcamp/frontend', formData)
      .then(() => {
        setFormSuccess(true);
        setFormError(false);
        localStorage.clear(); // Clear all stored data
      })
      .catch((error) => {
        console.error('Error:', error);
        setFormSuccess(false);
        setFormError(true);
      })
      .finally(() => {
        setFormSubmitted(true);
        setModalOpen(true);
      });
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setFormSuccess(false);
    setFormError(false);
    localStorage.clear(); // Clear all stored data
    navigate('/');
  };

  const countNonSpaceCharacters = () => {
    return text.replace(/\s/g, '').length;
  };

  return (
    <div className="bg-[#f4f4f5] min-h-screen flex items-start justify-center">
      <div className="bg-white w-3/5 h-[80vh] p-8 mt-8 ">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#3883f6]">
            <div className="w-4 h-4 rounded-full text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-black py-2 ml-1 font-bold text-xs">1</p>
            </div>
          </div>
          <hr className="flex-grow border-[3px] border-[#3883f6]" />
          <div className="w-5 h-5 rounded-full border bg-[#c1c4c9]">
            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#3883f6]">
              <div className="w-4 h-4 rounded-full text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-black py-2 ml-1 font-bold text-xs">2</p>
              </div>
            </div>
          </div>
          <hr className="flex-grow border-[3px] border-[#3883f6]" />
          <div className="w-5 h-5 rounded-full border items-center flex justify-center bg-[#3883f6]">
            <div className="w-1 h-1 rounded-full bg-white">
              <p className="text-black py-5 font-bold text-xs">3</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h1 className="text-2xl font-semibold">Расскажите о себе</h1>
          <p className="text-sm text-gray-500 mt-2">
            Напишите немного о себе, своих интересах, хобби и т. д. (максимум 200 символов)
          </p>
          <textarea
            className="w-full h-32 mt-4 p-2 border-2 border-gray-300"
            value={text}
            onChange={handleChange}
            placeholder="Расскажите о себе..."
          />
          <div className="flex justify-between mt-4">
            <p className="text-sm text-gray-500">
              Осталось символов: {200 - countNonSpaceCharacters()}
            </p>
            {isFormSubmitted && isFormSuccess && (
              <p className="text-sm text-green-500">Форма успешно отправлена!</p>
            )}
            {isFormSubmitted && isFormError && (
              <p className="text-sm text-red-500">
                Ошибка отправки формы. Пожалуйста, попробуйте еще раз.
              </p>
            )}
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded mr-4"
              onClick={handleReset}
            >
              Назад
            </button>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Отправить
            </button>
          </div>
          <Link to="/" className="text-sm text-blue-500 underline mt-4 block">
            Вернуться на первый шаг
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white w-64 p-8 rounded">
            {isFormSuccess ? (
              <>
                <div className="flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-12 h-12 text-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-center text-green-500 font-semibold">Успешно!</p>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-12 h-12 text-red-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <p className="text-center text-red-500 font-semibold">Ошибка!</p>
              </>
            )}
            <div className="flex justify-end mt-6">
              <Link
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={() => setModalOpen(false)} to="/"
              >
                На главную
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step3;