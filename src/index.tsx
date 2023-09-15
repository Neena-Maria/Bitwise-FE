import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'tailwindcss/tailwind.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <div className='h-screen w-screen'>
    <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
