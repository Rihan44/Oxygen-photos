import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './app/store';

import {MyFavs} from './components/MyFavs';
import {Header} from './components/Header';
import {Home} from './components/Home';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="myFavs" element={<MyFavs/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
);

