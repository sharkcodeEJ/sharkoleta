import React from 'react';
import Routes from './routes/routes';
import './reset.css';
import './styles/form_style.css'

function App() {
  return (
      <div className="App">
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');
          </style>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins&family=Ubuntu&display=swap');
          </style>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins&family=Roboto&family=Ubuntu&display=swap');
          </style>
          <Routes/>
      </div>
  );
}

export default App;
