import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

function Stream() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages(); // Fetch messages initially

    // Fetch messages every 1 second
    const interval = setInterval(() => {
      fetchMessages();
    }, 1000);

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []);

  const fetchMessages = () => {
    axios
      .get('/api/messages')
      .then(response => {
        if (Array.isArray(response.data)) {
          setMessages(response.data);
        } else {
          console.error('Invalid response data:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  };

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const context = chartRef.current.getContext('2d');
      if (chartInstanceRef.current) {
        // Update the existing Chart instance
        updateChart(context);
      } else {
        // Create a new Chart instance
        createChart(context);
      }
    }
  }, [messages]);

  const createChart = (context) => {
    chartInstanceRef.current = new Chart(context, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Data',
            data: [],
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            tension: 0.1,
            borderWidth: 1,
            pointRadius: 0,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            title: {
              display: true,
              text: 'X',
            },
          },
          y: {
            suggestedMin: 0, // Exclude negative values on y-axis
            title: {
              display: true,
              text: 'Y',
            },
          },
        },
      },
    });
  };

  const updateChart = (context) => {
    const chartData = messages
      .map(message => {
        const values = message.split(',');
        const x = parseFloat(values[0]);
        const y = parseFloat(values[1]);
        return { x, y };
      })
      .filter(dataPoint => dataPoint.y >= 0); // Exclude negative y values

    chartInstanceRef.current.data.datasets[0].data = chartData;
    chartInstanceRef.current.update();
  };

  return (
    <div className="content">
      <h1>Received Messages</h1>
      <canvas ref={chartRef} id="chart"></canvas>
    </div>
  );
}

export default Stream;
