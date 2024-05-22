// src/App.js
import React from 'react';
import SearchBar from './SearchBar';
import './index.css'; // Ensure you have imported Tailwind CSS

function App() {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <SearchBar />
            </div>
        </div>
    );
}

export default App;
