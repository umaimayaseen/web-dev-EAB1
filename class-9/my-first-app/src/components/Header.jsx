import React from 'react';

function Header({ setPage }) {
    <header style={{ background: '#333', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }} >Tracker</h2>
        <nav>
            <button onClick={() => setPage('home')} > Home</button>

        </nav>

    </header>

}
export default Header;