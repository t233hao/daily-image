import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';

const App = () => {
    return (
        <HashRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Footer />
        </HashRouter>
    );
};

const root = document.getElementById('root');
const rootInstance = ReactDOM.createRoot(root);
rootInstance.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
