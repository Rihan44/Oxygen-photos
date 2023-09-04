import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';
import MyFavs from './components/MyFavs';
import Header from './components/Header';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="myFavs" element={<MyFavs/>}/>
          <Route path="myFavs:id" element={<MyFavs/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

