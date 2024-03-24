import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import ClockFace from './ClockFace.png';
import ClockFace_H from './ClockFace_H.png';
import ClockFace_M from './ClockFace_M.png';
import ClockFace_S from './ClockFace_S.png';

const Timer = ({ seconds }) => {
  const [time, setTime] = useState(seconds);
const[paused,setPaused] =useState(false)
  useEffect(() => {
    let timerId;

    if (!paused && time > 0) {
      timerId = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [time, paused]);

  const formatTime = () => {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const sec = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${sec}`;
  };

  return (
    <div>
      <div>{formatTime()}</div>
      <button onClick={() => setPaused(prevPaused => !prevPaused)}>
        {paused ? 'Продовжити' : 'Пауза'}
      </button>
    </div>
  );
};

const TimerControl = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const handleStartPause = () => {
    if (timerStarted) {
      setPaused(prevPaused => !prevPaused);
    } else {
      const totalSeconds =
        parseInt(hours, 10) * 3600 +
        parseInt(minutes, 10) * 60 +
        parseInt(seconds, 10);
      if (!isNaN(totalSeconds) && totalSeconds > 0) {
        setTimerStarted(true);
      }
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Години"
        value={hours}
        onChange={e => setHours(e.target.value)}
      />
      <input
        type="number"
        placeholder="Хвилини"
        value={minutes}
        onChange={e => setMinutes(e.target.value)}
      />
      <input
        type="number"
        placeholder="Секунди"
        value={seconds}
        onChange={e => setSeconds(e.target.value)}
      />
      <button onClick={handleStartPause}>
        {timerStarted && !paused ? 'Пауза' : 'Старт'}
      </button>
      {timerStarted && (
        <Timer seconds={parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10)} paused={paused} />
      )}
    </div>
  );
};

const SecondsTimer = ({ seconds }) => <h2>{seconds}</h2>;

const TimerContainer = ({ seconds, refresh, render: Render }) => {
  const [currentTime, setCurrentTime] = useState(seconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(prevTime => prevTime - 1);
    }, refresh);

    return () => clearInterval(intervalId);
  }, [refresh]);

  return <Render seconds={currentTime} />;
};


const LCD = ({ seconds }) => {
  const formatTime = () => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${sec}`;
  };

  return (
    <>
      <div>{formatTime()}</div>
    </>
  );
};

const Watch = ({ seconds }) => {
  const formatTime = () => {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const sec = (seconds % 60).toString().padStart(2, '0');
    return { hours, minutes, sec };
  };

  const { hours, minutes, sec } = formatTime();

  const hourRotation = (hours % 12) * 30 + minutes / 2;
  const minuteRotation = minutes * 6 + seconds / 10;
  const secondRotation = sec * 6;

  return (
    <div className='clock'>
      <img className='watch' src={ClockFace} alt="Clock Face"/>
      <img style={{ transform: `rotate(${hourRotation}deg)` }} className='watch_H' src={ClockFace_H} alt="Hour Hand"/>
      <img style={{ transform: `rotate(${minuteRotation}deg)` }} className='watch_M' src={ClockFace_M} alt="Minute Hand"/>
      <img style={{ transform: `rotate(${secondRotation}deg)` }} className='watch_S' src={ClockFace_S} alt="Second Hand"/>
    </div>
  );
};

const TimerCombain = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [paused, setPaused] = useState(false);

  const handleStartPause = () => {
    if (timerStarted) {
      setPaused(prevPaused => !prevPaused);
    } else {
      const totalSeconds =
        parseInt(hours, 10) * 3600 +
        parseInt(minutes, 10) * 60 +
        parseInt(seconds, 10);
      if (!isNaN(totalSeconds) && totalSeconds > 0) {
        setTimerStarted(true);
      }
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Години"
        value={hours}
        onChange={e => setHours(e.target.value)}
      />
      <input
        type="number"
        placeholder="Хвилини"
        value={minutes}
        onChange={e => setMinutes(e.target.value)}
      />
      <input
        type="number"
        placeholder="Секунди"
        value={seconds}
        onChange={e => setSeconds(e.target.value)}
      />
      <button onClick={handleStartPause}>
        {timerStarted && !paused ? 'Пауза' : 'Старт'}
      </button>
      {timerStarted && (
        <TimerContainer seconds={parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(seconds, 10)} refresh={1000} render={SecondsTimer} />
      )}
    </div>
  );
};

const Phonebook = ({ contacts }) => {
  const [contactList, setContactList] = useState(contacts || ['']);

   const addContact = () => {
    setContactList([...contactList, '']);
  };

  const deleteContact = (index) => {
    const newContacts = [...contactList];
    newContacts.splice(index, 1);
    setContactList(newContacts);
  };

  
  const handleChange = (index, value) => {
    const newContacts = [...contactList];
    newContacts[index] = value;
    setContactList(newContacts);
  };

  const moveContactUp = (index) => {
    if (index > 0) {
      const newContacts = [...contactList];
      const temp = newContacts[index];
      newContacts[index] = newContacts[index - 1];
      newContacts[index - 1] = temp;
      setContactList(newContacts);
    }
  };

  const moveContactDown = (index) => {
    if (index < contactList.length - 1) {
      const newContacts = [...contactList];
      const temp = newContacts[index];
      newContacts[index] = newContacts[index + 1];
      newContacts[index + 1] = temp;
      setContactList(newContacts);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {contactList.map((contact, index) => (
        <div key={index}>
          <input
            type="text"
            value={contact}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          <button onClick={() => deleteContact(index)}>Delete</button>
          <button onClick={() => moveContactUp(index)} disabled={index === 0}>&#9650;</button>
          <button onClick={() => moveContactDown(index)} disabled={index === contactList.length - 1}>&#9660;</button>
        </div>
      ))}
      <button onClick={addContact}>Add Contact</button>
    </div>
  );
};









function App() {
  return (
    <div className="App">
      <h1>Timer</h1>
      <Timer seconds={1000} />
      <h1>TimerControl</h1>
      <TimerControl />
      <h1>TimerContainer</h1>
      <TimerContainer seconds={1800} refresh={1000} render={SecondsTimer} />
      <h1>LCD</h1>
      <TimerContainer seconds={1800} refresh={1000} render={LCD} />
      <h1>Watch</h1>
      <TimerContainer seconds={1800} refresh={1000} render={Watch} />

      <h1 className='combain'>TimerControl + TimerContainer</h1>
      <TimerCombain/>
          
      <Phonebook />
    </div>
  );
}

export default App;
