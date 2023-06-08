import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import TypingBox from './components/visualkeyboard.component';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [value, setValue] = useState('hello world');
  const [accuracy, setAccuracy] = useState(0);
  const [keyCount, setKeyCount] = useState(0);
  const originalStringRef = useRef('');
  const originalStringArrayRef = useRef([]);
  const inputStringArrayRef = useRef([]);
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);


  
  const generateRandomString = useMemo(() => {
    const characters = 'asdfghjkl';
    const charactersLength = characters.length;
    return (length) => {
      let result = '';
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    };
    
  }, []);

  const generate = useCallback(() => {
    let temp = '';
    for (let i = 0; i < 50; i++) {
      temp += generateRandomString(5);
      temp += ' ';
    }
    temp.trim();
    return temp;
  }, [generateRandomString]);

 


  const handleInput = useCallback((e) => {
    const inputValue = e.target.value;
    setInput(inputValue);
    const originalStringArray = originalStringArrayRef.current;
    const inputStringArray = inputStringArrayRef.current;
    const originalString = originalStringRef.current;
    originalStringArray.length = 0;
    inputStringArray.length = 0;
    originalStringArray.push(...originalString);
    inputStringArray.push(...inputValue);
    const valueArray = [];
    for (let i = 0; i < originalStringArray.length; i++) {
      const letter = originalStringArray[i];
      const inputLetter = inputStringArray[i];
      if (inputValue === '') {
        valueArray.push(letter);
      } else if (inputLetter === undefined) {
        valueArray.push(letter);
      } else if (inputLetter === letter) {
        valueArray.push(<span key={i} className='correct'>{letter}</span>);
      } else {
        valueArray.push(<span key={i} className='incorrect'>{letter}</span>);
      }
    }
    setValue(<React.Fragment>{valueArray}</React.Fragment>);
    const accuracyValue = (inputStringArray.filter((letter, index) => letter === originalStringArray[index]).length / originalStringArray.length) * 100;
    setAccuracy(parseInt(accuracyValue));
  }, []);

   


  useEffect(() => {
    const randomString = generate();
    originalStringRef.current = randomString;
    setValue(randomString);
    
  }, [generate]);
  useEffect(() => {
    
    const handleKeyDown = (e) => {
      // if e.key is a letter
      if(e.keyCode >= 65 && e.keyCode <= 90) {
      
      setKeyCount((prevCount) => prevCount + 1);
      
      if(!timerOn){
        setTimerOn(true);
        setTimer(60);
      }
    }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
    
      window.removeEventListener('keydown', handleKeyDown);
      
      
    };
  }, [timerOn]);

  useEffect(() => {
    if(timerOn && timer>0){
      const intervalId=setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };

    }
    else if( timerOn && timer===0 ){
      setTimerOn(false);
      setKeyCount(0);
      alert(`Your typing speed is ${keyCount} keys per minute`);
      window.location.reload(false);
    }
  }, [timer, timerOn, keyCount]);

  return (
    <div>
      <h1>Typing Keys</h1>
      <TypingBox input={input} handleInput={handleInput} />

      <div className='value'>{value}</div>
      <div className='accuracy'>{accuracy}%</div>
      <div className='tryagain'>
        <button onClick={() => window.location.reload(false)}>Try Again</button>
      </div>
      <div className='keycount'>{keyCount}</div>
      <div className='timer'>{timer}</div>
    </div>
  );
}

export default App;
