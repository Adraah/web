import React, { useState, useEffect } from 'react';
import SidebarComponent from './components/sidebarComponent';
import SimpleBarChart from './components/barchartComponent.tsx';
import BasicPie from './components/piechartComponent.tsx';
import './Home.css';
import makeApiCall from './utils/axios/index.js';
import CircularProgress from '@mui/material/CircularProgress';
import PressCodeChart from './components/barlineComponent.tsx';

const mapRepairData = (data) => {
  if (!data) return [];
    const colors = [
      "#132246", "#0F1A38", "#0B1328", "#1A2E59", "#2C3E6A",
      "#3E5280", "#506798", "#627CAE", "#758FC2", "#89A3D7",
      "#9CB7EB", "#B0C6F0", "#A1ADC0", "#14424C", "#0E3C42",
      "#1C5E67", "#C96E34", "#B8503D", "#D9BFA3", "#F1E4C7"
    ];
  
    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors.splice(randomIndex, 1)[0];
    };
  
    const failureTypeMap = {};
  
    data.forEach((item) => {
      const key = `${item.failureType}`;
      if (!failureTypeMap[key]) {
        failureTypeMap[key] = {
          label: key,
          value: 0,
          color: getRandomColor()
        };
      }
      failureTypeMap[key].value += 1;
    });
  
    return Object.entries(failureTypeMap).map(([label, obj], index) => ({
      id: index,
      ...obj
    }));
  };

  const mapDieWorkerTimeData = (data) => {
    if (!data) return [];
    const colors = [
      "#132246", "#0F1A38", "#0B1328", "#1A2E59", "#2C3E6A",
      "#3E5280", "#506798", "#627CAE", "#758FC2", "#89A3D7",
      "#9CB7EB", "#B0C6F0", "#A1ADC0", "#14424C", "#0E3C42",
      "#1C5E67", "#C96E34", "#B8503D", "#D9BFA3", "#F1E4C7"
    ];
  
    const getRandomColor = () => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      return colors.splice(randomIndex, 1)[0];
    };
  
    const workerMap = {};
  
    data.forEach((item) => {
      if (!item.dieWorker || typeof item.timeElapsed !== 'number') return;
  
      const key = item.dieWorker.trim();
      const minutesElapsed = item.timeElapsed / (1000 * 60);
  
      if (!workerMap[key]) {
        workerMap[key] = {
          label: key,
          value: 0,
          color: getRandomColor(),
        };
      }
  
      workerMap[key].value += minutesElapsed;
    });
  
    return Object.entries(workerMap).map(([_, obj], index) => ({
      id: index,
      ...obj,
    }));
  };
  
  const mapPressCodeChartData = (rawData, pressData) => {
    if (!rawData || !pressData) return {};
    const timeMap = {};
  
    rawData.forEach(item => {
      if (!item.pressCode || typeof item.timeElapsed !== 'number') return;
  
      const key = item.pressCode.trim();
      const minutes = item.timeElapsed / (1000 * 60);
      timeMap[key] = (timeMap[key] || 0) + minutes;
    });
  
    const xLabels = Object.keys(timeMap);
    const barData = xLabels.map(label => Math.round(timeMap[label]));
  
    const expectedMap = {};
    pressData.forEach(press => {
      if (press.name && press.expectedTime) {
        expectedMap[press.name.trim()] = Number(press.expectedTime);
      }
    });
  
    const lineData = xLabels.map(label => Math.round(expectedMap[label] || 0));
  
    return { xLabels, barData, lineData };
  };
  
  
const Home = ({ onLogout }) => {
    const [days, setDays] = useState([]);
    const [data, setData] = useState([]);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [dieWorkers, setDieWorkers] = useState([]);
    const [pressChartData, setPressChartData] = useState({
        xLabels: [],
        barData: [],
        lineData: [],
      });
    const [isLoading, setIsLoading] = useState(true);
    const [tickets, setTickets] = useState();
    const dataPie = [{ id: 0, value: 10, label: 'series A', color: "#132246" },
    { id: 1, value: 15, label: 'series B', color: "#132246" },
    { id: 2, value: 20, label: 'series C', color: "#132246" },]

    const getTimeElapsedByDay = (rawData) => {
        if (!rawData) return;
        const now = new Date();
        const MS_PER_DAY = 24 * 60 * 60 * 1000;
        const timeMap = {};
        let time = 0
      
        rawData.forEach(item => {
          if (!item.endDate || typeof item.timeElapsed !== 'number') return;
      
          const endDate = new Date(item.endDate);
          const daysAgo = Math.floor((now - endDate) / MS_PER_DAY);
      
          if (daysAgo >= 0 && daysAgo < 30) {
            const key = endDate.toISOString().split('T')[0];
            const minutesElapsed = item.timeElapsed / (1000 * 60);
            time += minutesElapsed;
            timeMap[key] = (timeMap[key] || 0) + minutesElapsed;
          }
        });
      
        const last30Days = Array.from({ length: 30 }, (_, i) => {
          const date = new Date(now - MS_PER_DAY * (29 - i));
          return date.toISOString().split('T')[0];
        });
      
        const days = [];
        const data = [];
      
        last30Days.forEach(date => {
          days.push(date);
          data.push(timeMap[date] || 0);
        });
      
        setDays(days);
        setData(data);
        setTimeElapsed(time);
      };

    const fetchData = async () => {
        try {
            const data = await makeApiCall('GET', 'https://9ffoua37l6.execute-api.us-east-2.amazonaws.com/getTickets');
            if (!data) return;
            setTickets(mapRepairData(data));
            getTimeElapsedByDay(data);
            setDieWorkers(mapDieWorkerTimeData(data));
            const response = await makeApiCall('GET', 'https://mpz96ml60e.execute-api.us-east-2.amazonaws.com/getAllInfo');
            setPressChartData(mapPressCodeChartData(data, response.press));
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
            <div style={{ marginLeft: '11%', backgroundColor: '#EEEEEF', height: '100vh', width: '100%', justifyItems: 'center', alignContent: 'center', marginBottom: '20px' }}>
                {isLoading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'transparent' }}>
                  <CircularProgress size="3rem" color='#132246' />
                </div>
                    
                ) : (
                  !tickets ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'transparent' }}>
                      <span style={{ fontSize: '24px', color: '#132246', fontWeight: 700, backgroundColor: 'transparent' }}>No data</span>
                    </div>
                  ) : (
                    <>
                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-evenly',  marginTop: '20px', backgroundColor: '#EEEEEF' }}>
                            <div className='chart-box'>
                                <span style={{ fontSize: '24px', color: '#132246', fontWeight: 700 }}>Tiempo muerto total {timeElapsed.toFixed(2)} minutos</span>
                                <SimpleBarChart data={data} days={days} />
                            </div>
                            <div className='chart-box'>
                                <span style={{ fontSize: '24px', color: '#132246', fontWeight: 700 }}>Tiempo muerto supervisores</span>
                                <BasicPie data={dieWorkers} />
                            </div>
                        </div>
                        <div style={{ flexDirection: 'row', display: 'flex', width: '100%', justifyContent: 'space-evenly', marginTop: '50px', backgroundColor: '#EEEEEF' }}>
                            <div className='chart-box'>
                            <span style={{ fontSize: '24px', color: '#132246', fontWeight: 700 }}>Causas mas frecuentes</span>
                            <BasicPie data={tickets} />
                            </div>
                            <div className='chart-box'>
                                <span style={{ fontSize: '24px', color: '#132246', fontWeight: 700 }}>Tiempo muerto por herramienta</span>
                                <PressCodeChart line={pressChartData.lineData} bar={pressChartData.barData} axis={pressChartData.xLabels} />
                            </div>
                        </div>
                    </>)
                )}
            </div>
        </div>
    );
};

export default Home;
