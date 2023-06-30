import React, { useEffect, useState } from 'react';

export default function MyCustomWidget() {
  const [timerListData, setTimerListData] = useState({
    time: 0,
    isRunning: false,
  });

  const tidyTime = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = time - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return hours + ':' + minutes + ':' + seconds;
  };

  useEffect(() => {
    let interval = null;
    if (timerListData.isRunning) {
      interval = setInterval(() => {
        setTimerListData((prevData) => ({
          ...prevData,
          time: parseInt(prevData.time) + 1,
        }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerListData.isRunning]);

  return (
    <div style={{ minWidth: 300 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'row' }}>
        <p>Stopwatch</p>
      </div>
      <div className='timer-container'>
        <div className='timer-display'>
          <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>{tidyTime(timerListData.time)}</p>
        </div>
        <div
          className='timer-controls'
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '15px',
              cursor: 'pointer',
            }}
            onClick={() => {
              setTimerListData({
                ...timerListData,
                isRunning: !timerListData.isRunning,
              });
            }}
          >
            {timerListData.isRunning ? 'Stop' : 'Start'}
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '15px',
              cursor: 'pointer',
            }}
            onClick={() => {
              setTimerListData({
                ...timerListData,
                time: 0,
              });
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
