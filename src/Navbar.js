import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container"
                style={{ justifyContent: 'center' }}
            >
                <Link className="navbar-brand" to="/board">
                    Tic Tac Toe
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
