import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import urn from '../assets/delete.png';
import { useNavigate } from 'react-router-dom';

const Step2 = () => {
  const [advantages, setAdvantages] = useState(['', '', '']);
  const [checkboxValues, setCheckboxValues] = useState({});
  const [radioValue, setRadioValue] = useState('');
  const navigate = useNavigate();

  const advantagesRef = useRef(advantages);
  const checkboxValuesRef = useRef(checkboxValues);
  useEffect(() => {
    advantagesRef.current = advantages;
    checkboxValuesRef.current = checkboxValues;
  }, [advantages, checkboxValues]);

  const handleChange = (index, value) => {
    const updatedAdvantages = [...advantages];
    updatedAdvantages[index] = value;
    setAdvantages(updatedAdvantages);
  };

  const removeAdvantage = (index) => {
    const updatedAdvantages = [...advantages];
    updatedAdvantages.splice(index, 1);
    setAdvantages(updatedAdvantages);
  };

  const addAdvantage = () => {
    if (advantages.length < 6) {
      const updatedAdvantages = [...advantages, ''];
      setAdvantages(updatedAdvantages);
    }
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [id]: checked,
    }));
  };

  const handleRadioChange = (e) => {
    const radioValue = e.target.id;
    setRadioValue(radioValue);
  };

  const handleNext = () => {
    navigate('/step3');
  };

  useEffect(() => {
    const storedAdvantages = localStorage.getItem('advantages');
    const storedCheckboxValues = localStorage.getItem('checkboxValues');
    const storedRadioValue = localStorage.getItem('radioValue');

    if (storedAdvantages) {
      setAdvantages(storedAdvantages.split(','));
    }

    if (storedCheckboxValues) {
      setCheckboxValues(JSON.parse(storedCheckboxValues));
    }

    if (storedRadioValue) {
      setRadioValue(storedRadioValue);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('advantages', advantages.join(','));
  }, [advantages]);

  useEffect(() => {
    localStorage.setItem('checkboxValues', JSON.stringify(checkboxValues));
  }, [checkboxValues]);

  useEffect(() => {
    localStorage.setItem('radioValue', radioValue);
  }, [radioValue]);

  return (
    <div className="bg-[#f4f4f5] min-h-screen flex items-start justify-center">
      <div className="bg-white w-3/5 h-[90vh] p-8 mt-8">
        <div className="flex items-center">
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#3883f6]">
            <div className="w-4 h-4 rounded-full text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-black py-3 ml-1 font-bold text-xs">1</p>
            </div>
          </div>
          <hr className="flex-grow border-[3px] border-[#3883f6]" />
          <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#3883f6]">
            <div className="w-1 h-1 rounded-full bg-white">
              <p className="text-black py-5 mr-1 font-bold text-xs">2</p>
            </div>
          </div>
          <hr className="flex-grow border-[3px] border-[#dad0d0]" />
          <div className="w-5 h-5 rounded-full border bg-[#c1c4c9]">
            <p className="text-black py-6 ml-1 font-bold text-xs">3</p>
          </div>
        </div>
        <div className="flex flex-col justify-start py-10">
        <p>Advantages</p>
          {advantages.map((advantage, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                className="border border-[#ada7a7] rounded w-1/4 bg-[#f5f5f5] px-4 py-2 mt-2"
                placeholder="Your advantage"
                value={advantage}
                onChange={(e) => handleChange(index, e.target.value)}
              />
              <button
                className="flex justify-center rounded w-4 h-4 items-center ml-2"
                onClick={() => removeAdvantage(index)}
              >
                <img src={urn} alt="Delete" />
              </button>
            </div>
          ))}
          {advantages.length < 6 && (
            <div className="py-2">
              <button
                className="flex justify-center rounded w-12 h-12 bg-white border-[2px] border-[#3883f6] items-center text-[#3883f6]"
                onClick={addAdvantage}
              >
                +
              </button>
            </div>
          )}
      <p className="mt-8">Checkbox group</p>
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          id="option1"
          className="checkbox mr-2"
          onChange={handleCheckboxChange}
          checked={checkboxValues['option1']}
        />
        <label htmlFor="option1">1</label>
      </div>
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          id="option2"
          className="checkbox mr-2"
          onChange={handleCheckboxChange}
          checked={checkboxValues['option2']}
        />
        <label htmlFor="option2">2</label>
      </div>
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          id="option3"
          className="checkbox mr-2"
          onChange={handleCheckboxChange}
          checked={checkboxValues['option3']}
        />
        <label htmlFor="option3">3</label>
      </div>
          <p className="mt-8">Radio group</p>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="radio1"
              className="radio mr-2"
              onChange={handleRadioChange}
              checked={radioValue === 'radio1'}
            />
            <label htmlFor="radio1">1</label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="radio2"
              className="radio mr-2"
              onChange={handleRadioChange}
              checked={radioValue === 'radio2'}
            />
            <label htmlFor="radio2">2</label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              id="radio3"
              className="radio mr-2"
              onChange={handleRadioChange}
              checked={radioValue === 'radio3'}
            />
            <label htmlFor="radio3">3</label>
          </div>
          <div className="flex justify-between py-10">
            <Link
              to="/Create"
              className="buttonstyle bg-[white] rounded border border-blue-400 text-[#3883f6]"
            >
              Назад
            </Link>
            <button onClick={handleNext} className="buttonstyle">
              Далее
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;