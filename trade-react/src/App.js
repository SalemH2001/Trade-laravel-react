import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import CreateTrade from './components/CreateTrade';
import ShowTrade from './components/ShowTrade';
import React from 'react';

function App() {
  return (
    <div className="App text-center">
      <h1 className="page-header ">Trade Management</h1>

      <BrowserRouter> 
        <nav >
          <ul >
              <li className='h3 shadow-sm p-3 mb-5 bg-body rounded ms-5' >
                <Link to="/">Search for trade</Link>
              </li>
              <li className='h3 shadow-sm p-3 mb-5 bg-body rounded ms-5'>
                <Link to="trade/create">Create a new trade</Link>
              </li>
          </ul>
        </nav>    
        <Routes>
          <Route index element={<ShowTrade/>}/>
          <Route path="trade/create" element={<CreateTrade/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
