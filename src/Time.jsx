import React, { useState, useEffect } from 'react';
import SidebarComponent from './components/sidebarComponent';
import './Register.css';
import makeApiCall from './utils/axios/index.js';

const Time = ({ onLogout }) => {
    const [time, setTime] = useState('');
    const [selectedPress, setSelectedPress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [pressOptions, setPressOptions] = useState([]);

    const fetchData = async () => {
        try {
            const data = await makeApiCall('GET', 'https://mpz96ml60e.execute-api.us-east-2.amazonaws.com/getAllInfo');
            setPressOptions(data.press);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        if (!selectedPress || !time) {
            alert('Por favor, complete todos los campos.');
            return;
        }
        try {
            await makeApiCall('PATCH', 'https://h26cwclbe7.execute-api.us-east-2.amazonaws.com/pressTime', {
                _id: selectedPress,
                expectedTime: time
            });
            alert('Tiempo registrado con éxito.');
            return;
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
            <div style={{ marginLeft: '12%', flex: 1, backgroundColor: '#EEEEEF', height: '100vh', justifyItems: 'center', alignContent: 'center' }}>
                <div style={{ color: 'black', backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', padding: '20px', width: '350px', margin: '0 auto', textAlign: 'center' }}>
                    <span style={{ fontSize: '24px', color: '#132246', fontWeight: 700 }}>Registro de tiempos deseados</span>
                    <form style={{ marginTop: '20px' }}>
                        <div className="input-group">
                            <select id="role" className='input-field-register' value={selectedPress} onChange={(e) => {
                                setSelectedPress(e.target.value)
                                }} style={{ width: '96%' }}>
                                <option value="">Seleccione una herramienta</option>
                                {pressOptions.map((press) => (
                                    <option key={press._id} value={press._id}>
                                        {press.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <input type="text" placeholder="TIEMPO (MINUTOS)" className="input-field-register"
                                id="username"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>
                        <button onClick={() => { handleSubmit() }} className="login-button">Registrar</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Time;
