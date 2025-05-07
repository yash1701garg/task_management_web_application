import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Toaster} from 'react-hot-toast'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 
 <BrowserRouter>
 <Provider store ={store}>
    <Toaster/>
     <App />
 </Provider>
</BrowserRouter>

 

  
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an anal 