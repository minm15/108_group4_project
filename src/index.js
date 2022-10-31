import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
// localStorage.clear();
if (localStorage.getItem('product_list') === null) {
  localStorage.setItem('product_list', JSON.stringify(require('./data//product_list.json')))
}
if (localStorage.getItem('storage') === null) {
  localStorage.setItem('storage', JSON.stringify(require('./data/storage.json')));
}
if (localStorage.getItem('company_list') === null) {
  localStorage.setItem('company_list', JSON.stringify(require('./data/company_list.json')));
}
if (localStorage.getItem('user') === null) {
  localStorage.setItem('user', JSON.stringify(
    JSON.parse(localStorage.getItem('company_list'))[0]
  ));
}
if (localStorage.getItem('contract_list') === null) {
  localStorage.setItem('contract_list', JSON.stringify(require('./data/contract_list.json')));
}
if (localStorage.getItem('deliver_list') === null) {
  localStorage.setItem('deliver_list', JSON.stringify(require('./data/deliver_list.json')));
}
if (localStorage.getItem('letter_list') === null) {
  localStorage.setItem('letter_list', JSON.stringify(require('./data/letter_list.json')));
}
if (localStorage.getItem('mf_producing') === null) {
  localStorage.setItem('mf_producing', JSON.stringify(require('./data/mf_producing.json')));
}
if (localStorage.getItem('dm') === null) {
  localStorage.setItem('dm', JSON.stringify(require('./data/dm.json')));
}
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
