import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

import React from 'react';

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div>
      <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />

      <div>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => handleThumbnailClick(index)}
            style={{ border: index === currentImageIndex ? '2px solid blue' : 'none', cursor: 'pointer' }}
          />
        ))}
      </div>

      <button onClick={goToPreviousImage}>Previous</button>
      <button onClick={goToNextImage}>Next</button>
    </div>
  );
};

const Thumbnails = ({ images, current, onChange }) => {
  return (
    <div>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Thumbnail ${index + 1}`}
          onClick={() => onChange(index)}
          style={{ border: index === current ? '2px solid blue' : 'none', cursor: 'pointer' }}
        />
      ))}
    </div>
  );
};

export { Carousel, Thumbnails };


const Spoiler = ({ header = "+", open, children }) => {
  const [isOpen, setIsOpen] = useState(open);

  const toggleSpoiler = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div style={{ marginBottom: '10px' }}>
      <div
        onClick={toggleSpoiler}
        style={{
          cursor: 'pointer',
          backgroundColor: 'blue',
          padding: '5px',
          borderRadius: '5px',
          marginBottom: '5px',
        }}
      >
        {header}
      </div>
      {isOpen && <div>{children}</div>}
    </div>
  );
};
const RangeInput = ({ min, max, ...rest }) => {
  const [text, setText] = useState("test")
  const [value, setValue] = useState('')
  const onChange = (e) => {
    const { value } = e.target;
    setValue(value);
  };
  const inputStyle = {
    border: (value.length < min || value.length > max) ? '4px solid red' : '2px solid black'
  }
  return (
    <input
      type="text"
      style={inputStyle}
      onChange={onChange}
      value={value}
      {...rest}
    />)

}
const LoginForm = ({ onLogin }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const loginButton = () => {
    if (login && password) {
      onLogin(login, password)
    }
  }
  return (
    <div>
      <input type="text"
        placeholder='Логін'
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input type="text"
        placeholder='Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginButton} disabled={!login || !password}> Увійти</button>
    </div>
  )
}

const PasswordConfirm =({min})=>{
  const [password, setPassword] =useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const onChangePassword = (e) => {
    const  value  = e.target.value;
    setPassword(value);
  };
  const onChangePasswordConfirm = (e) => {
    const  value  = e.target.value;
    setPasswordConfirm(value);
  };
  const passButton = () => {
    if (
      password.length < min ||
      password !== passwordConfirm ||
      /\d/.test(password) === false
    )  {
      alert('Паролі повинні співпадати і містити цифри ' );
    } else {
      alert('Паролі успішно введено');
    }
  };
  const inputStyle = {
    border:
      (password.length < min ||
      passwordConfirm.length < min ||
      password !== passwordConfirm ||
      /\d/.test(password) === false) ? '10px solid red' : '2px solid black',
  };
  console.log('inputStyle:', inputStyle);
  return(
    <div>
      <input type="text"
        placeholder='Пароль'
        value={password}
        onChange={onChangePassword}
      />
      <input type="text"
        placeholder='Підтвердіть пароль'
        value={passwordConfirm}
        onChange={onChangePasswordConfirm}
      />
      <button onClick={passButton} disabled={!password || !passwordConfirm}> 
      Ввести
      </button>
    </div>
  )
}

function App() {
  const loginButton = (login, password) => {
    alert('Логін:' + login + ' \n' + 'Пароль:' + password);

  }
  return (
    <div className="App">
      <header className="App-header">

        <Spoiler header={<h1>Заголовок 1</h1>} open>
          Параграф 1
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        </Spoiler>
        <Spoiler header={<h2>Заголовок 2</h2>}>
          Параграф 2
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        </Spoiler>

      </header>
      <RangeInput min={2} max={10} />
      <LoginForm onLogin={loginButton}></LoginForm>
      <PasswordConfirm min={2} />
    </div>

  );
}

export default App;


