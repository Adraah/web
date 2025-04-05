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
      <div
        style={{
          marginLeft: '12%',
          padding: '20px',
          flex: 1,
          backgroundColor: '#EEEEEF',
          minHeight: '100vh',
          boxSizing: 'border-box',
          overflowX: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '0 20px',
            marginBottom: '50px',
            marginTop: '20px',
          }}
        >
          {isLoading ? (
            <CircularProgress size="3rem" style={{ color: '#132246' }} />
          ) : (
            <div style={{ overflowX: 'auto', width: '100%' }}>
              <RepairDataTable data={tickets} />
            </div>

          )}
        </div>
      </div>
    </div>

  );
};

export default About;
