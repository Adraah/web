import React, { useState, useEffect } from 'react';
import SidebarComponent from './components/sidebarComponent';
import SimpleBarChart from './components/barchartComponent.tsx';
import BasicPie from './components/piechartComponent.tsx';
import './Home.css';
import makeApiCall from './utils/axios/index.js';
import CircularProgress from '@mui/material/CircularProgress';

const mapRepairData = (data) => {
    const failureTypeMap = {};
  
    data.forEach((item) => {
      const key = `${item.failureType}`;
      if (!failureTypeMap[key]) {
        failureTypeMap[key] = {
          label: key,
          value: 0,
          color: "#132246"
        };
      }
      failureTypeMap[key].value += 1;
    });
  
    return Object.entries(failureTypeMap).map(([label, obj], index) => ({
      id: index,
      ...obj
    }));
  };

const Home = ({ onLogout }) => {
    const data = [50, 60, 80, 70, 90, 100, 120];
    const days = [1, 2, 3, 4, 5, 6, 7];
    const [isLoading, setIsLoading] = useState(true);
    const [tickets, setTickets] = useState();
    const dataPie = [{ id: 0, value: 10, label: 'series A', color: "#132246" },
    { id: 1, value: 15, label: 'series B', color: "#132246" },
    { id: 2, value: 20, label: 'series C', color: "#132246" },]

    const fetchData = async () => {
        try {
            const data = await makeApiCall('GET', 'https://9ffoua37l6.execute-api.us-east-2.amazonaws.com/getTickets');
            console.log(data);
            setTickets(mapRepairData(data));
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
            <div style={{ marginLeft: '220px', flex: 1, backgroundColor: '#EEEEEF', height: '100%', justifyItems: 'center', alignContent: 'center' }}>
                {isLoading ? (
                    <CircularProgress size="3rem" color='#132246' />
                ) : (
                    <>
                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-evenly', marginBottom: '50px', marginTop: '50px' }}>
                            <div className='chart-box'>
                                <span style={{ fontSize: '24px', color: '#132246', fontWeight: 700 }}>Tiempo muerto por dia</span>
                                <SimpleBarChart data={data} days={days} />
                            </div>
                            <div className='chart-box'>
                                <span style={{ fontSize: '24px', color: '#132246', fontWeight: 700 }}>Tiempo muerto supervisores</span>
                                <BasicPie data={dataPie} />
                            </div>
                        </div>
                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-evenly', marginBottom: '50px', marginTop: '50px' }}>
                            <div className='chart-box'>
                            <span style={{ fontSize: '24px', color: '#132246', fontWeight: 700 }}>Causas mas frecuentes</span>
                            <BasicPie data={tickets} />
                            </div>
                            <div className='chart-box'>
                                <span style={{ fontSize: '24px', color: '#132246', fontWeight: 700 }}>Tiempo muerto supervisores</span>
                                <BasicPie data={dataPie} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
