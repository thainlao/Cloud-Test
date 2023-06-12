import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';

function Create() {
    const [selectGender, setSelectGender] = useState(localStorage.getItem('gender') || '');
    const nicknameRef = useRef(null);
    const nameRef = useRef(null);
    const sernameRef = useRef(null);
    const navigate = useNavigate();
    const [nicknameError, setNicknameError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [sernameError, setSernameError] = useState(false);

    useEffect(() => {
        const savedNickname = localStorage.getItem('nickname');
        const savedName = localStorage.getItem('name');
        const savedSername = localStorage.getItem('sername');

        if (savedNickname) {
          nicknameRef.current.value = savedNickname;
        }
        
        if (savedName) {
          nameRef.current.value = savedName;
        }

        if (savedSername) {
            sernameRef.current.value = savedSername;
        }
    }, []);

    const handleStart = () => {
        const nicknameValue = nicknameRef.current.value.trim();
        const sernameValue = sernameRef.current.value.trim();
        const nameValue = nameRef.current.value.trim();
    
        let isError = false;
    
        if (nicknameValue === '' || !/^[a-zA-Z0-9]{1,30}$/.test(nicknameValue)) {
            setNicknameError(true);
            isError = true;
        } else {
            setNicknameError(false);
        }
      
        if (sernameValue === '' || !/^[a-zA-Z]{1,50}$/.test(sernameValue)) {
            setSernameError(true);
            isError = true;
        } else {
            setSernameError(false);
        }
    
        if (nameValue === '' || !/^[a-zA-Z]{1,50}$/.test(nameValue)) {
            setNameError(true);
            isError = true;
        } else {
            setNameError(false);
        }
      
        if (!isError) {
            localStorage.setItem('nickname', nicknameValue);
            localStorage.setItem('name', nameValue);
            localStorage.setItem('sername', sernameValue);
            navigate('/step2');
        }
    }

    const handleGenderChange = (event) => {
        const selectedGender = event.target.value;
        setSelectGender(selectedGender);
        localStorage.setItem('gender', selectedGender);
      };

    

    return (
<div className="bg-[#f4f4f5] min-h-screen flex items-start justify-center">
  <div className="bg-white w-3/5 h-[95vh] p-8 mt-8 ">
    {/* Индикаторы шагов */}
    <div className="flex items-center">
      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#3883f6]">
        <div className="w-1 h-1 rounded-full bg-white">
          <p className="text-black py-5 font-bold text-xs">1</p>
        </div>
      </div>
      <hr className="flex-grow border-[3px] border-[#dad0d0]" />
      <div className="w-5 h-5 rounded-full border bg-[#c1c4c9]">
        <p className="text-black py-6 ml-1 font-bold text-xs">2</p>
      </div>
      <hr className="flex-grow border-[3px] border-[#dad0d0]" />
      <div className="w-5 h-5 rounded-full border bg-[#c1c4c9]">
        <p className="text-black py-6 ml-1 font-bold text-xs">3</p>
      </div>
    </div>
    {/* Форма */}
    <div className="flex flex-col justify-start py-10">
      {/* Никнейм */}
      <div className="py-4">
        <p>Nickname</p>
        <input
          type="text"
          className={`border border-[#ada7a7] rounded w-1/4 bg-[#f5f5f5] px-4 py-2 mt-2 ${
            nicknameError ? 'shake' : ''
          }`}
          placeholder="Your Name"
          ref={nicknameRef}
        />
        {nicknameError && (
          <p className="text-red-500 mt-2">
            Необходимо заполнить и использовать только буквы и цифры (макс. 30 символов).
          </p>
        )}
      </div>
      {/* Имя */}
      <div className="py-4">
        <p>Name</p>
        <input
          type="text"
          className={`border border-[#ada7a7] rounded w-1/4 bg-[#f5f5f5] px-4 py-2 mt-2 ${
            nameError ? 'shake' : ''
          }`}
          placeholder="Your name"
          ref={nameRef}
        />
        {nameError && (
          <p className="text-red-500 mt-2">
            Необходимо заполнить и использовать только буквы (макс. 50 символов).
          </p>
        )}
      </div>
      {/* Фамилия */}
      <div className="py-4">
        <p>Surname</p>
        <input
          type="text"
          className={`border border-[#ada7a7] rounded w-1/4 bg-[#f5f5f5] px-4 py-2 mt-2 ${
            sernameError ? 'shake' : ''
          }`}
          placeholder="Your surname"
          ref={sernameRef}
        />
        {sernameError && (
          <p className="text-red-500 mt-2">
            Необходимо заполнить и использовать только буквы (макс. 50 символов).
          </p>
        )}
      </div>
      {/* Пол */}
      <label htmlFor="gender">Не выбрано</label>
      <select
        id="gender"
        value={selectGender}
        onChange={handleGenderChange}
        className="block w-1/4 px-4 py-2 mt-2 border border-[#ada7a7] rounded-md bg-[#f5f5f5]"
      >
        <option value="">Не выбрано</option>
        <option value="female">Женский</option>
        <option value="male">Мужской</option>
      </select>
      {/* Кнопки */}
      <div className="flex justify-between py-12">
        <Link to="/" className="buttonstyle bg-[white] rounded border border-blue-400 text-[#3883f6]">
          Назад
        </Link>
        <button className="buttonstyle" onClick={handleStart}>
          Далее
        </button>
      </div>
    </div>
  </div>
</div>
    )
}

export default Create;