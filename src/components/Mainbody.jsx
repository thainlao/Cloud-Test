import React, { useState, useEffect } from "react";
import folder from '../assets/folder.png';
import telegram from '../assets/tg.png';
import github from '../assets/github.png';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';

function Mainbody () {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedPhone = localStorage.getItem('phone');
    const savedEmail = localStorage.getItem('email');
    
    if (savedPhone) {
      setPhone(savedPhone);
    }
    
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleStart = () => {
    if (phone.trim() === '') {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  
    if (email.trim() === '') {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  
    if (phone.trim() !== '' && email.trim() !== '') {
      localStorage.setItem('phone', phone);
      localStorage.setItem('email', email);

      navigate('/create');
    }
  };

    return (
        <div className="bg-[#f4f4f5] min-h-screen flex items-start justify-center">
        <div className="bg-white w-4/5 h-[70vh] p-8 mt-8">
          <div className="flex items-center">
            <div className="rounded-full bg-[#d5e4f7] hover:bg-[#c4d2e4] w-24 h-24 flex justify-center items-center mr-4 transition duration-400">
              <span style={{ letterSpacing: "1px" }}
               className="text-black text-3xl font-medium">NA</span>
            </div>
            <div>
              <div className="text-xl font-bold">Nosko Aleksandr</div>
              <div className="flex gap-1 mt-4 items-center">
                <img src={telegram} alt="telegram"
                className="w-5 h-5"></img><a 
                href="https://t.me/thainlaoo" className="mr-2
                text-[blue]">Telegram</a>
                <img src={github} alt="github"
                className="w-5 h-5"></img><a
                href="https://github.com/thainlao" className="mr-2
                text-[blue]">GitHub</a>
                <img src={folder} alt="resume"
                className="w-5 h-5"></img><a 
                href="https://hh.ru/applicant/resumes/view?resume=e36657c0ff0c0963660039ed1f6f354d496153" className="mr-2
                text-[blue]">Resume</a>
              </div>
            </div>
          </div>
          <div className="separator mx-auto mt-4"></div>
          <div className="">
          <p className="mt-4">Номер Телефона</p>
        <InputMask
          mask="+ 9 999 999-99-99"
          maskChar=" "
          className={`border border-[#ada7a7] rounded w-1/4 bg-[#f5f5f5] px-4 py-2 mt-2 ${
            phoneError ? 'shake' : ''
          }`}
          placeholder="+ 7 999 999-99-99"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {phoneError && <p className="text-red-500 mt-2">необходимо заполнить</p>}
        <p className="mt-4">Email</p>
        <input
          type="text"
          className={`border border-[#ada7a7] rounded w-1/4 bg-[#f5f5f5] px-4 py-2 mt-2 ${
            emailError ? 'shake' : ''
          }`}
          placeholder="tim.jennings@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <p className="text-red-500 mt-2">необходимо заполнить</p>}
      </div>
          <div className="py-14">
          <button className="buttonstyle" onClick={handleStart}>Начать</button>
          </div>
        </div>
      </div>
    )
}

export default Mainbody;