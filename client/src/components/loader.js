import React from 'react';
import TurnPage from './svg/turnPage';
import RotateDevice from './svg/rotateDevice';
import '../assets/stylesheets/loader.css';

const Loader = () => {

    return (
        <div className="loader-container">
            <TurnPage />
            <div className="details">
                <div className="book-title">
                    Book Title
                </div>
                <div className="author">
                    Author's name
                </div>
            </div>
            <div>
                <RotateDevice /> 
            </div> 
        </div>
    )
}

export default Loader;