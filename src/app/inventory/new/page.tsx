"use client"
// pages/index.tsx
import React, { useState } from 'react';
import Popup from './Popup';

const Home: React.FC = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="border border-gray-400 p-4 cursor-pointer" onClick={togglePopup}>
                Click me to open popup
            </div>
            {showPopup && <Popup onClose={togglePopup} />}
        </div>
    );
}

export default Home;