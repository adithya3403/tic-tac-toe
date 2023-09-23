import { useState } from 'react';
import './App.css';

export default function Head() {
    const [currentTheme, setCurrentTheme] = useState('default-light');
    
    const handleThemeChange = (theme) => {
        document.documentElement.setAttribute('color-scheme', theme);
        setCurrentTheme(theme);
    };

    return (
        <header>
            <h3>Tic Tac Toe</h3>
            <div className="themes-container">
                <button
                    className="theme-button"
                    onClick={() => handleThemeChange('default-light')}
                    style={{ backgroundColor: '#D45757' }}
                ></button>
                <button
                    className="theme-button"
                    onClick={() => handleThemeChange('default-dark')}
                    style={{ backgroundColor: '#262D3C' }}
                ></button>
                <button
                    className="theme-button"
                    onClick={() => handleThemeChange('mono-light')}
                    style={{ backgroundColor: 'white' }}
                ></button>
                <button
                    className="theme-button"
                    onClick={() => handleThemeChange('mono-dark')}
                    style={{ backgroundColor: 'black' }}
                ></button>
                <button
                    className="theme-button"
                    onClick={() => handleThemeChange('solarized-light')}
                    style={{ backgroundColor: '#FDF6E3' }}
                ></button>
                <button
                    className="theme-button"
                    onClick={() => handleThemeChange('solarized-dark')}
                    style={{ backgroundColor: '#073642' }}
                ></button>
            </div>
        </header>
    )
}