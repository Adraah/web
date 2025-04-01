import React, { useState } from 'react';
import SidebarComponent from './components/sidebarComponent';
import EnhancedTable from './components/tableComponent';
import CircularProgress from '@mui/material/CircularProgress';
import makeApiCall from './utils/axios';

const About = ({ onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      const data = await makeApiCall('GET', 'https://example.com/api/users');
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent onLogout={onLogout} />
      <div style={{ marginLeft: '220px', padding: '20px', flex: 1, backgroundColor: '#EEEEEF', height: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0px 0px 0px 20px' }}>
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
