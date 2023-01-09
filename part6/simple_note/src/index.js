import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'

import noteReducer from './reducers/noteReducer';
import filterReducer from './reducers/filterReducer';

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = configureStore({reducer: reducer})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
/* A component that makes the store available to all components in the application. */
  <Provider store={store}>
    <App />
  </Provider>
);

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
