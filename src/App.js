// src/App.js
import React from 'react';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-item" element={<AddItem />} />
                <Route path="/item-list" element={<ItemList />} />
            </Routes>
        </Router>
    );
}

export default App;
