import React, { useState, useEffect } from 'react';
import SidebarComponent from './components/sidebarComponent';
import CircularProgress from '@mui/material/CircularProgress';
import makeApiCall from './utils/axios';
import RepairDataTable from './components/tableComponent.tsx';

const About = ({ onLogout }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState([]);

  const fetchData = async () => {
    try {
        const data = await makeApiCall('GET', 'https://9ffoua37l6.execute-api.us-east-2.amazonaws.com/getTickets');
        setTickets(data);
    } catch (error) {
        console.error(error);
    }
};

useEffect(() => {
    fetchData().finally(() => setIsLoading(false));
}, []);

  return (
    <div style={{ display: 'flex' }}>
      <SidebarComponent onLogout={onLogout} />
      <div style={{ marginLeft: '220px', padding: '20px', flex: 1, backgroundColor: '#EEEEEF', height: '100vh' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0px 0px 0px 20px' }}>
          {isLoading ? (
             <CircularProgress size="3rem" color='#132246'/>
          ) : (
            <RepairDataTable data={tickets}/>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
