import React from 'react';

function Header({ changePage }) {
    return (
        <header style={{ background: '#333', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0 }} >Tracker</h2>
            <nav>
                <button onClick={() => changePage('home')} > Home</button>
                <button onClick={() => changePage('about')}>About</button>

<button onClick={() => changePage( 'profile')}> profile</button>
                

            </nav>

        </header>
    );
}
export default Header;

