import React, { useState } from 'react';
import SidebarComponent from './components/sidebarComponent';
import EnhancedTable from './components/tableComponent';
import CircularProgress from '@mui/material/CircularProgress';

const About = ({ onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent onLogout={onLogout} />
      <div style={{ marginLeft: '220px', padding: '20px', flex: 1, backgroundColor: '#c7c7c7', height: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
          {isLoading ? (
             <CircularProgress size="3rem" color='#132246'/>
          ) : (
            <EnhancedTable />
          )}
          
        </div>
      </div>
    </div>
  );
};

export default About;
