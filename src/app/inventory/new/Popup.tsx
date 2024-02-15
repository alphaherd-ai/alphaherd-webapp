// components/Popup.tsx
import React from 'react';

type PopupProps = {
    onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <p>This is a popup!</p>
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
            </div>
        </div>
    );
}

export default Popup;
