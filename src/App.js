// src/App.js
import React from 'react';
import AddItem from './components/AddItem';
import ItemList from './components/ItemList';

function App() {
    return (
        <div className="App">
            <h1>React Firebase CRUD</h1>
            <AddItem />
            <ItemList />
        </div>
    );
}

export default App;
