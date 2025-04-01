import React from 'react';
import SidebarComponent from './components/sidebarComponent';

const Home = ({ onLogout }) => {
    return (
        <div style={{ display: 'flex' }}>
            <SidebarComponent onLogout={onLogout} />
            <div style={{ marginLeft: '220px', flex: 1, backgroundColor: '#EEEEEF', height: '100vh'}}>
                <h1>Welcome to the Home Page</h1>
                <p>This is your main screen after logging in!</p>
            </div>
        </div>
    );
};

export default Home;
