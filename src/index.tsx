import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './app/components/ProtectedRoute';
import { store } from './app/store';
import CharacterDetail from './features/characters/CharacterDetail';
import CharacterList from './features/characters/CharacterList';
import Login from './features/login/Login';
import NotFoundPage from './features/notFoundPage/notFoundPage';
import Register from './features/register/Register';
import './index.css';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  // this makes components render twice
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/characters' element={<ProtectedRoute outlet={<CharacterList />} redirectPath={'/'} />} />
          <Route path='/characters/:id' element={<ProtectedRoute outlet={<CharacterDetail />} redirectPath={'/'} />} />
          <Route path="*" element={<NotFoundPage />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
