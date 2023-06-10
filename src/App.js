import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import TypingBox from './components/visualkeyboard.component';
import './App.css';
import typingBackground from './images/image2.png';
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
    for (let i = 0; i < 150; i++) {
      temp += generateRandomString(7);
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
    var correct = 0;
    var incorrect = 0;
    for (let i = 0; i < originalStringArray.length; i++) {
      const letter = originalStringArray[i];
      const inputLetter = inputStringArray[i];
      if (inputValue === '') {
        valueArray.push(letter);
      } else if (inputLetter === undefined) {
        valueArray.push(letter);
      } else if (inputLetter === letter) {
        valueArray.push(<span key={i} className='correct'>{letter}</span>);
        correct++;
      } else {
        valueArray.push(<span key={i} className='incorrect'>{letter}</span>);
        incorrect++;
      }
    }
    inputStringArrayRef.current = inputStringArray;
    setValue(<React.Fragment>{valueArray}</React.Fragment>);
    const accuracyValue = (correct / (correct + incorrect)) * 100;
    setAccuracy(parseInt(accuracyValue));
    if(isNaN(accuracyValue)){
      setAccuracy(0);
    }
    if(inputValue.length === originalString.length){
      alert(`Your accuracy is ${parseInt(accuracyValue)}% `);
      window.location.reload(false);
    }
  }, []);




  useEffect(() => {
    const randomString = generate();
    originalStringRef.current = randomString;
    setValue(randomString);

  }, [generate]);
  useEffect(() => {

    const handleKeyDown = (e) => {
      // if e.key is a letter
      if (e.keyCode >= 65 && e.keyCode <= 90) {

        setKeyCount((prevCount) => prevCount + 1);

        if (!timerOn) {
          setTimerOn(true);
          setTimer(60*5);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {

      window.removeEventListener('keydown', handleKeyDown);


    };
  }, [timerOn]);

  useEffect(() => {
    if (timerOn && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => {
        clearInterval(intervalId);
      };

    }
    else if (timerOn && timer === 0) {
      setTimerOn(false);
      setKeyCount(0);
      alert(`Your typing speed is ${keyCount} keys per 5 minutes, or ${parseInt(keyCount / 5)} keys per minute`);
      window.location.reload(false);
    }
  }, [timer, timerOn, keyCount]);

  return (
    <div style={{ backgroundImage: `url(${typingBackground})` ,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    overflow: 'auto',
    position: 'relative',
    
    }}>
      <div class="container2">
        <div class="header">
          <h1 class="title">Typing Test</h1>
        </div>
        <div class="tools">
          <div class="accuracy">Accuracy: {accuracy}%</div>
          <div class="keycount">Key count: {keyCount}</div>
          <div class="timer">Timer: {timer}s</div>
        </div>
      </div>
      <div className='precaution'>
        <p1 >
        This is a typing test where you are given a passage one sentence at a time, 
        and your goal is to accurately reproduce it using primarily the keys 
        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', and 'l'. The timer starts when you begin 
        typing it. Best of luck!

        </p1>
      </div>
      <div className='container'>
        
        <p class="mb-3 text-center text-gray-500 dark:text-gray-400">
          {value}
        </p>
      </div>

      <TypingBox input={input} handleInput={handleInput} />

      <button onClick={() => window.location.reload(false)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      style={{position: "sticky", left: '80%',marginTop: '10px'}}
      >
        Try Again
      </button>
    </div>
  );
}

export default App;
