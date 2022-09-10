import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddNewPage from './pages/AddNewPage';
import ArchivePage from './pages/ArchivePage';
import NoMatchPage from './pages/NoMatchPage';

function App() {
    return (
        <div className="app-container">
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/notes/:id" element={<DetailPage />} />
                    <Route path="/notes/new" element={<AddNewPage />} />
                    <Route path="/archives" element={<ArchivePage />} />
                    <Route path="*" element={<NoMatchPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
